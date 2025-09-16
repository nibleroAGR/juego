import { GameState, Habit, HabitCategory, HabitRating, Item } from './types';

export const INITIAL_HABITS: Habit[] = [
    { id: 'desayuno', name: 'Desayuno', category: HabitCategory.COMIDA, icon: 'fas fa-mug-saucer', description: '¡La comida más importante para empezar el día con energía!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'almuerzo', name: 'Almuerzo', category: HabitCategory.COMIDA, icon: 'fas fa-apple-whole', description: 'Un bocado a media mañana para seguir fuerte.', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'comida', name: 'Comida Principal', category: HabitCategory.COMIDA, icon: 'fas fa-drumstick-bite', description: '¡A comer para reponer fuerzas!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'merienda', name: 'Merienda', category: HabitCategory.COMIDA, icon: 'fas fa-cookie', description: 'Algo rico para la tarde.', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'cena', name: 'Cena', category: HabitCategory.COMIDA, icon: 'fas fa-bowl-rice', description: 'La última comida para descansar bien.', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'dientes', name: 'Lavar Dientes', category: HabitCategory.HIGIENE, icon: 'fas fa-tooth', description: '¡Derrota al Monstruo de la Caries!', timesPerDay: 3, ratings: [HabitRating.SIN_PUNTUAR, HabitRating.SIN_PUNTUAR, HabitRating.SIN_PUNTUAR] },
    { id: 'manos', name: 'Lavar Manos', category: HabitCategory.HIGIENE, icon: 'fas fa-hands-bubbles', description: '¡Fuera gérmenes!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'ducha', name: 'Ducha/Baño', category: HabitCategory.HIGIENE, icon: 'fas fa-shower', description: '¡Para estar limpio y fresco!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'juguetes', name: 'Recoger Juguetes', category: HabitCategory.ORDEN, icon: 'fas fa-cubes-stacked', description: '¡Vence al Dragón del Desorden!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'ayudar', name: 'Ayudar en Casa', category: HabitCategory.ORDEN, icon: 'fas fa-broom', description: '¡Un verdadero héroe ayuda a su equipo!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'deberes', name: 'Hacer Deberes', category: HabitCategory.ESTUDIO, icon: 'fas fa-book-open', description: '¡El conocimiento es poder!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'lectura', name: 'Leer un Rato', category: HabitCategory.ESTUDIO, icon: 'fas fa-book', description: '¡Viaja a otros mundos con la lectura!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'dormir', name: 'Dormir Bien', category: HabitCategory.SUEÑO, icon: 'fas fa-bed', description: '¡Un buen descanso te hace más fuerte!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
    { id: 'ejercicio', name: 'Ejercicio / Jugar Fuera', category: HabitCategory.EJERCICIO, icon: 'fas fa-person-running', description: '¡Mueve el esqueleto y explora el mundo!', timesPerDay: 1, ratings: [HabitRating.SIN_PUNTUAR] },
];

export const SHOP_ITEMS: Item[] = [
    { id: 'casco1', name: 'Casco de Aprendiz', type: 'casco', icon: 'fas fa-helmet-safety', price: 10 },
    { id: 'casco2', name: 'Yelmo de Caballero', type: 'casco', icon: 'fas fa-helmet-safety', price: 50 },
    { id: 'armadura1', name: 'Peto de Cuero', type: 'armadura', icon: 'fas fa-shirt', price: 15 },
    { id: 'armadura2', name: 'Coraza de Héroe', type: 'armadura', icon: 'fas fa-shirt', price: 75 },
    { id: 'arma1', name: 'Espada de Madera', type: 'arma', icon: 'fas fa-wand-magic-sparkles', price: 20 },
    { id: 'arma2', name: 'Espada Legendaria', type: 'arma', icon: 'fas fa-wand-magic-sparkles', price: 100 },
    { id: 'accesorio1', name: 'Capa de Iniciado', type: 'accesorio', icon: 'fas fa-user-ninja', price: 25 },
    { id: 'accesorio2', name: 'Capa de Campeón', type: 'accesorio', icon: 'fas fa-user-ninja', price: 120 },
];

export const getInitialGameState = (characterName: string): GameState => ({
    character: {
        name: characterName,
        level: 1,
        xp: 0,
        xpToNextLevel: 10,
        health: 100,
        maxHealth: 100,
        coins: 0,
        avatar: "https://picsum.photos/seed/kid/200",
        equippedItems: { armadura: null, casco: null, arma: null, accesorio: null },
        inventory: [],
        achievements: [],
    },
    pet: {
        name: 'Dragi',
        level: 1,
        xp: 0,
        xpToNextLevel: 20,
        icon: 'fas fa-dragon'
    },
    habits: INITIAL_HABITS,
    shopItems: SHOP_ITEMS,
    lastUpdate: new Date().toISOString().split('T')[0],
    daysPlayed: 1,
});

export const LEVEL_TIERS: { [key: number]: string } = {
    1: "Básico",
    5: "Aprendiz",
    10: "Héroe",
    15: "Maestro",
    20: "Leyenda"
};