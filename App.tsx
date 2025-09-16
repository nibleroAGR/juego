import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { CharacterSheet } from './components/CharacterSheet';
import { HabitTracker } from './components/HabitTracker';
import { Modal } from './components/Modal';
import { ParentalControl } from './components/ParentalControl';
import { Shop } from './components/Shop';
import { KeySystem } from './components/KeySystem';

const App: React.FC = () => {
    const { gameState, isLoading, createNewGame, updateHabitRating, buyItem, equipItem } = useGameState();
    const [characterName, setCharacterName] = useState('');
    const [isParentalModalOpen, setParentalModalOpen] = useState(false);
    const [isShopModalOpen, setShopModalOpen] = useState(false);
    const [isKeySystemModalOpen, setKeySystemModalOpen] = useState(false);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-2xl font-bold">Cargando...</div>;
    }

    if (!gameState) {
        return (
            <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
                    <i className="fas fa-dragon text-6xl text-blue-500 mb-4"></i>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Bienvenido a Héroes Familiares!</h1>
                    <p className="text-gray-600 mb-6">Crea tu personaje para empezar la aventura de los buenos hábitos.</p>
                    <input
                        type="text"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                        placeholder="Nombre de tu Héroe"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => createNewGame(characterName)}
                        disabled={!characterName.trim()}
                        className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                    >
                        ¡Comenzar Aventura!
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="fixed top-4 right-4 z-30 flex flex-col gap-3">
                 <button onClick={() => setShopModalOpen(true)} title="Tienda" className="w-14 h-14 bg-yellow-400 text-yellow-900 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75">
                    <i className="fas fa-store text-2xl"></i>
                </button>
                <button onClick={() => setParentalModalOpen(true)} title="Panel de Padres" className="w-14 h-14 bg-red-400 text-red-900 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">
                    <i className="fas fa-user-shield text-2xl"></i>
                </button>
                <button onClick={() => setKeySystemModalOpen(true)} title="Compartir Progreso" className="w-14 h-14 bg-purple-400 text-purple-900 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75">
                    <i className="fas fa-key text-2xl"></i>
                </button>
            </div>

            <main className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="md:grid md:grid-cols-3 md:gap-8 lg:grid-cols-4">
                    <div className="md:col-span-1 lg:col-span-1 mb-8 md:mb-0">
                        <CharacterSheet character={gameState.character} pet={gameState.pet} daysPlayed={gameState.daysPlayed} />
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                        <HabitTracker habits={gameState.habits} />
                    </div>
                </div>
            </main>

            <Modal isOpen={isParentalModalOpen} onClose={() => setParentalModalOpen(false)} title="Panel de Padres">
                <ParentalControl habits={gameState.habits} onUpdateHabit={updateHabitRating} onClose={() => setParentalModalOpen(false)} />
            </Modal>
            
            <Modal isOpen={isShopModalOpen} onClose={() => setShopModalOpen(false)} title="Tienda de Equipo">
                <Shop gameState={gameState} onBuyItem={buyItem} onEquipItem={equipItem} />
            </Modal>

            <Modal isOpen={isKeySystemModalOpen} onClose={() => setKeySystemModalOpen(false)} title="Compartir Progreso">
                <KeySystem character={gameState.character} pet={gameState.pet} />
            </Modal>
        </div>
    );
};

export default App;