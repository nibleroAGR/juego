import React, { useState, useEffect } from 'react';
import { Habit, HabitRating } from '../types';

interface ParentalControlProps {
    habits: Habit[];
    onUpdateHabit: (habitId: string, index: number, rating: HabitRating) => void;
    onClose: () => void;
}

const RatingButton: React.FC<{
    rating: HabitRating;
    currentRating: HabitRating;
    onClick: () => void;
    label: string;
    color: string;
}> = ({ rating, currentRating, onClick, label, color }) => (
    <button
        onClick={onClick}
        className={`px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border-2 ${
            currentRating === rating
                ? `${color} text-white`
                : `bg-white hover:bg-gray-50`
        }`}
    >
        {label}
    </button>
);


export const ParentalControl: React.FC<ParentalControlProps> = ({ habits, onUpdateHabit, onClose }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    
    const [storedPin, setStoredPin] = useState<string | null>(null);
    const [isSettingUp, setIsSettingUp] = useState(false);
    const [newPin, setNewPin] = useState('');
    const [confirmNewPin, setConfirmNewPin] = useState('');

    useEffect(() => {
        const pinFromStorage = localStorage.getItem('habitHeroesParentalPin');
        if (pinFromStorage) {
            setStoredPin(pinFromStorage);
        } else {
            setIsSettingUp(true);
        }
    }, []);

    const handleLogin = () => {
        if (pin === storedPin) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('PIN incorrecto. Inténtalo de nuevo.');
            setPin('');
        }
    };

    const handleCreatePin = () => {
        if (newPin.length !== 4) {
            setError('El PIN debe tener 4 dígitos.');
            return;
        }
        if (newPin !== confirmNewPin) {
            setError('Los PINs no coinciden.');
            return;
        }
        localStorage.setItem('habitHeroesParentalPin', newPin);
        setStoredPin(newPin);
        setIsSettingUp(false);
        setIsAuthenticated(true);
        setError('');
    };

    if (!isAuthenticated) {
        if (isSettingUp) {
            return (
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold mb-4 text-gray-700">Crea tu PIN de Padres (4 dígitos)</p>
                    <input
                        type="password"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                        maxLength={4}
                        className="text-center text-2xl tracking-[1rem] w-48 p-2 border-2 rounded-lg mb-4"
                        placeholder="••••"
                    />
                    <p className="text-lg font-semibold mb-4 text-gray-700">Confirma tu PIN</p>
                    <input
                        type="password"
                        value={confirmNewPin}
                        onChange={(e) => setConfirmNewPin(e.target.value.replace(/\D/g, ''))}
                        maxLength={4}
                        className="text-center text-2xl tracking-[1rem] w-48 p-2 border-2 rounded-lg mb-4"
                        placeholder="••••"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button onClick={handleCreatePin} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        Crear PIN y Entrar
                    </button>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center">
                <p className="text-lg font-semibold mb-4 text-gray-700">Introduce el PIN de Padres</p>
                <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    maxLength={4}
                    className="text-center text-2xl tracking-[1rem] w-48 p-2 border-2 rounded-lg mb-4"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button onClick={handleLogin} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Entrar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {habits.map(habit => (
                <div key={habit.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <i className={`${habit.icon} mr-3 text-blue-500 text-xl`}></i>
                        <h3 className="font-bold text-gray-800">{habit.name}</h3>
                    </div>
                    {habit.ratings.map((rating, index) => (
                        <div key={index} className="flex items-center justify-between ml-4 sm:ml-8 my-2 p-2 bg-white rounded flex-wrap">
                            <span className="text-gray-600 mb-2 sm:mb-0">Vez {index + 1}</span>
                            <div className="flex space-x-2">
                               <RatingButton rating={HabitRating.BIEN} currentRating={rating} onClick={() => onUpdateHabit(habit.id, index, HabitRating.BIEN)} label="Bien" color="bg-green-500 border-green-500" />
                               <RatingButton rating={HabitRating.NORMAL} currentRating={rating} onClick={() => onUpdateHabit(habit.id, index, HabitRating.NORMAL)} label="Normal" color="bg-yellow-500 border-yellow-500" />
                               <RatingButton rating={HabitRating.MAL} currentRating={rating} onClick={() => onUpdateHabit(habit.id, index, HabitRating.MAL)} label="Mal" color="bg-red-500 border-red-500" />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
             <button onClick={onClose} className="w-full mt-6 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
                Guardar y Cerrar
            </button>
        </div>
    );
};