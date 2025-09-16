export enum HabitCategory {
    COMIDA = "Comida",
    HIGIENE = "Higiene",
    ORDEN = "Orden",
    ESTUDIO = "Estudio",
    SUEÑO = "Sueño",
    EJERCICIO = "Ejercicio",
    EXTRA = "Extra"
}

export enum HabitRating {
    SIN_PUNTUAR = "Sin puntuar",
    BIEN = "Bien",
    NORMAL = "Normal",
    MAL = "Mal"
}

export interface Habit {
    id: string;
    name: string;
    category: HabitCategory;
    icon: string;
    description: string;
    timesPerDay: number;
    ratings: HabitRating[];
}

export interface Item {
    id: string;
    name: string;
    type: 'armadura' | 'casco' | 'arma' | 'accesorio';
    icon: string;
    price: number;
}

export interface Pet {
    name: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    icon: string;
}

export interface Character {
    name: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    health: number;
    maxHealth: number;
    coins: number;
    avatar: string;
    equippedItems: {
        armadura: Item | null;
        casco: Item | null;
        arma: Item | null;
        accesorio: Item | null;
    };
    inventory: string[]; // array of item ids
    achievements: string[]; // array of achievement ids
}

export interface GameState {
    character: Character;
    pet: Pet;
    habits: Habit[];
    shopItems: Item[];
    lastUpdate: string; // YYYY-MM-DD
    daysPlayed: number;
}