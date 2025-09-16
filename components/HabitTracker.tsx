import React from 'react';
import { Habit, HabitCategory, HabitRating } from '../types';

interface HabitTrackerProps {
    habits: Habit[];
}

const getRatingColor = (rating: HabitRating) => {
    switch (rating) {
        case HabitRating.BIEN:
            return "bg-green-100 text-green-800 border-green-300";
        case HabitRating.NORMAL:
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
        case HabitRating.MAL:
            return "bg-red-100 text-red-800 border-red-300";
        default:
            return "bg-gray-100 text-gray-500 border-gray-300";
    }
}

const HabitItem: React.FC<{ habit: Habit }> = ({ habit }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-start space-x-3 sm:space-x-4 transition-transform hover:scale-105">
        <div className="flex-shrink-0 text-2xl sm:text-3xl text-white bg-blue-500 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center">
            <i className={habit.icon}></i>
        </div>
        <div className="flex-grow">
            <h3 className="text-md sm:text-lg font-bold text-gray-800">{habit.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{habit.description}</p>
            <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
                {habit.ratings.map((rating, index) => (
                    <span key={index} className={`px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold rounded-full border ${getRatingColor(rating)}`}>
                        {rating === HabitRating.SIN_PUNTUAR ? `Vez ${index + 1}` : rating}
                    </span>
                ))}
            </div>
        </div>
    </div>
);


export const HabitTracker: React.FC<HabitTrackerProps> = ({ habits }) => {
    const groupedHabits = habits.reduce((acc, habit) => {
        if (!acc[habit.category]) {
            acc[habit.category] = [];
        }
        acc[habit.category].push(habit);
        return acc;
    }, {} as Record<HabitCategory, Habit[]>);

    return (
        <div className="space-y-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">Misiones de Hoy</h1>
                <p className="text-gray-600 mt-2">¡Completa tus hábitos para fortalecer a tu héroe y a tu mascota!</p>
            </div>
            {/* FIX: Add a type assertion to Object.entries to ensure `habitList` is correctly typed as an array. */}
            {(Object.entries(groupedHabits) as [HabitCategory, Habit[]][]).map(([category, habitList]) => (
                <div key={category}>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4 ml-2">{category}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {habitList.map(habit => <HabitItem key={habit.id} habit={habit} />)}
                    </div>
                </div>
            ))}
        </div>
    );
};