import React from 'react';
import { Item, GameState } from '../types';

interface ShopProps {
    gameState: GameState;
    onBuyItem: (item: Item) => void;
    onEquipItem: (item: Item) => void;
}

export const Shop: React.FC<ShopProps> = ({ gameState, onBuyItem, onEquipItem }) => {
    const { character, shopItems } = gameState;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Tienda del Héroe</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {shopItems.map(item => {
                    const isOwned = character.inventory.includes(item.id);
                    const isEquipped = character.equippedItems[item.type]?.id === item.id;
                    const canAfford = character.coins >= item.price;

                    return (
                        <div key={item.id} className={`p-4 rounded-lg border-2 flex flex-col items-center text-center transition-all ${isOwned ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
                            <i className={`${item.icon} text-4xl mb-2 ${isOwned ? 'text-green-500' : 'text-gray-500'}`}></i>
                            <p className="font-bold text-gray-700">{item.name}</p>
                            
                            {isEquipped ? (
                                <p className="mt-2 text-sm font-bold text-blue-600">Equipado</p>
                            ) : isOwned ? (
                                <button onClick={() => onEquipItem(item)} className="mt-2 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-600">Equipar</button>
                            ) : (
                                <>
                                    <div className="flex items-center my-2 text-yellow-600 font-semibold">
                                        <i className="fas fa-coins mr-1"></i>
                                        <span>{item.price}</span>
                                    </div>
                                    <button
                                        onClick={() => onBuyItem(item)}
                                        disabled={!canAfford}
                                        className={`w-full text-white text-sm font-semibold px-3 py-1 rounded-full ${canAfford ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 cursor-not-allowed'}`}
                                    >
                                        Comprar
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};