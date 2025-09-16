import React from 'react';
// FIX: Import the `Item` type to be used in type assertions.
import { Character, Pet, Item } from '../types';
import { LEVEL_TIERS } from '../constants';

interface CharacterSheetProps {
    character: Character;
    pet: Pet;
    daysPlayed: number;
}

const StatBar: React.FC<{ value: number; maxValue: number; color: string; label: string; icon: string }> = ({ value, maxValue, color, label, icon }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
        <div className="w-full">
            <div className="flex justify-between items-center text-sm font-semibold mb-1">
                <span className="text-gray-600"><i className={`${icon} mr-2`}></i>{label}</span>
                <span className="text-gray-800">{value} / {maxValue}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div className={`${color} h-4 rounded-full transition-all duration-500 ease-out`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

const getCharacterTier = (level: number) => {
    let currentTier = "Básico";
    for (const lvl in LEVEL_TIERS) {
        if (level >= parseInt(lvl)) {
            currentTier = LEVEL_TIERS[lvl];
        }
    }
    return currentTier;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, pet, daysPlayed }) => {
    const characterTier = getCharacterTier(character.level);
    
    const healthPercentage = character.health / character.maxHealth;
    let avatarFilter = '';
    if (healthPercentage < 0.2) {
        avatarFilter = 'grayscale(80%) brightness(0.8)';
    } else if (healthPercentage < 0.5) {
        avatarFilter = 'saturate(0.7)';
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full sticky top-4">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <img
                        src={character.avatar}
                        alt="Avatar"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-400 shadow-md transition-all duration-500"
                        style={{ filter: avatarFilter }}
                    />
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-blue-500 text-white text-base sm:text-lg font-bold w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 border-white">
                        {character.level}
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4 text-center">{character.name}</h2>
                <p className="text-yellow-500 font-semibold">{characterTier}</p>
                 <div className="text-sm text-gray-500 mt-1 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                    <i className="fas fa-calendar-alt mr-1"></i>
                    Día de Aventura: {daysPlayed}
                </div>
                <div className="flex items-center mt-2 text-xl sm:text-2xl font-bold text-yellow-600 bg-yellow-100 px-3 sm:px-4 py-1 rounded-full">
                    <i className="fas fa-coins mr-2"></i>
                    <span>{character.coins}</span>
                </div>
            </div>
            
            <div className="mt-6 space-y-4">
                <StatBar value={character.health} maxValue={character.maxHealth} color="bg-red-500" label="Vida" icon="fas fa-heart" />
                <StatBar value={character.xp} maxValue={character.xpToNextLevel} color="bg-green-500" label="Experiencia" icon="fas fa-star" />
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Mascota: {pet.name}</h3>
                <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
                    <i className={`${pet.icon} text-3xl sm:text-4xl text-indigo-500 mr-4`}></i>
                    <div className="flex-grow">
                        <p className="font-bold">Nivel {pet.level}</p>
                        <StatBar value={pet.xp} maxValue={pet.xpToNextLevel} color="bg-indigo-400" label="Exp Mascota" icon="fas fa-bone" />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Equipo</h3>
                <div className="grid grid-cols-2 gap-2 text-center">
                    {/* FIX: Add a type assertion to Object.entries to ensure `item` is correctly typed. */}
                    {(Object.entries(character.equippedItems) as [string, Item | null][]).map(([type, item]) => (
                         <div key={type} className="bg-gray-100 p-2 rounded-lg text-sm">
                             <p className="font-semibold capitalize text-gray-500">{type}</p>
                             {item ? (
                                <p className="text-gray-800 truncate"><i className={`${item.icon} mr-1`}></i>{item.name}</p>
                             ) : (
                                <p className="text-gray-400">Vacío</p>
                             )}
                         </div>
                    ))}
                </div>
            </div>
        </div>
    );
};