import { useState, useEffect, useCallback } from 'react';
import { GameState, Habit, HabitRating, Item } from '../types';
import { getInitialGameState, INITIAL_HABITS } from '../constants';

const GAME_STATE_KEY = 'habitHeroesGameState';

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const savedStateJSON = localStorage.getItem(GAME_STATE_KEY);
            if (savedStateJSON) {
                const savedState: GameState = JSON.parse(savedStateJSON);
                
                const today = new Date().toISOString().split('T')[0];
                if (savedState.lastUpdate !== today) {
                    // Reset daily habits
                    savedState.habits = INITIAL_HABITS.map(h => ({ ...h }));
                    savedState.lastUpdate = today;
                    savedState.daysPlayed = (savedState.daysPlayed || 1) + 1;
                }

                setGameState(savedState);
            }
        } catch (error) {
            console.error("Failed to load game state from localStorage", error);
            // In case of error, we don't set any state, forcing character creation.
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveGameState = useCallback((newState: GameState) => {
        try {
            const newStateJSON = JSON.stringify(newState);
            localStorage.setItem(GAME_STATE_KEY, newStateJSON);
            setGameState(newState);
        } catch (error) {
            console.error("Failed to save game state to localStorage", error);
        }
    }, []);

    const createNewGame = (characterName: string) => {
        const newGame = getInitialGameState(characterName);
        saveGameState(newGame);
    };

    const updateHabitRating = (habitId: string, index: number, rating: HabitRating) => {
        if (!gameState) return;

        const newGameState = JSON.parse(JSON.stringify(gameState)) as GameState;
        const habit = newGameState.habits.find(h => h.id === habitId);
        if (habit && habit.ratings[index] !== rating) {
            const oldRating = habit.ratings[index];
            habit.ratings[index] = rating;

            // Calculate changes
            const ratingValues = {
                [HabitRating.SIN_PUNTUAR]: { xp: 0, coins: 0, health: 0 },
                [HabitRating.BIEN]: { xp: 2, coins: 1, health: 5 },
                [HabitRating.NORMAL]: { xp: 1, coins: 0, health: 0 },
                [HabitRating.MAL]: { xp: -1, coins: 0, health: -10 }
            };

            const oldVals = ratingValues[oldRating];
            const newVals = ratingValues[rating];

            newGameState.character.xp += (newVals.xp - oldVals.xp);
            newGameState.character.coins += (newVals.coins - oldVals.coins);
            newGameState.character.health = Math.min(newGameState.character.maxHealth, Math.max(0, newGameState.character.health + (newVals.health - oldVals.health)));
            
            newGameState.pet.xp += (newVals.xp - oldVals.xp);

            // Check for pet level up
            if(newGameState.pet.xp >= newGameState.pet.xpToNextLevel){
                newGameState.pet.level++;
                newGameState.pet.xp -= newGameState.pet.xpToNextLevel;
                newGameState.pet.xpToNextLevel = Math.floor(newGameState.pet.xpToNextLevel * 1.5);
            }

            // Check for character level up
            while (newGameState.character.xp >= newGameState.character.xpToNextLevel) {
                newGameState.character.level++;
                newGameState.character.xp -= newGameState.character.xpToNextLevel;
                newGameState.character.xpToNextLevel = Math.floor(newGameState.character.xpToNextLevel * 1.5);
                newGameState.character.maxHealth += 10;
                newGameState.character.health = newGameState.character.maxHealth; // Full heal on level up
            }

            saveGameState(newGameState);
        }
    };
    
    const buyItem = (item: Item) => {
        if (!gameState || gameState.character.coins < item.price || gameState.character.inventory.includes(item.id)) return;
        
        const newGameState = { ...gameState };
        newGameState.character.coins -= item.price;
        newGameState.character.inventory.push(item.id);
        
        // Auto-equip if slot is empty
        if (!newGameState.character.equippedItems[item.type]) {
             newGameState.character.equippedItems[item.type] = item;
        }

        saveGameState(newGameState);
    }
    
    const equipItem = (item: Item) => {
        if (!gameState || !gameState.character.inventory.includes(item.id)) return;
        
        const newGameState = { ...gameState };
        newGameState.character.equippedItems[item.type] = item;
        saveGameState(newGameState);
    }

    return { gameState, isLoading, createNewGame, updateHabitRating, saveGameState, buyItem, equipItem };
};