import { Character, Pet } from '../types';

interface ShareableData {
    name: string;
    level: number;
    xp: number;
    health: number;
    coins: number;
    achievements: string[];
    petLevel: number;
    items: string[];
    avatar: string;
}

// Helper function to convert base64 to base64url
const base64ToUrl = (b64: string): string => {
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// Helper function to convert base64url to base64
const urlToBase64 = (b64url: string): string => {
    let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) {
        b64 += '=';
    }
    return b64;
};


export const encodeData = (character: Character, pet: Pet): string => {
    const data: ShareableData = {
        name: character.name,
        level: character.level,
        xp: character.xp,
        health: character.health,
        coins: character.coins,
        achievements: character.achievements,
        petLevel: pet.level,
        items: Object.values(character.equippedItems).filter(item => item !== null).map(item => item!.name),
        avatar: character.avatar
    };
    try {
        const jsonString = JSON.stringify(data);
        const base64String = btoa(unescape(encodeURIComponent(jsonString)));
        return base64ToUrl(base64String);
    } catch (error) {
        console.error("Error encoding data:", error);
        return "";
    }
};

export const decodeData = (key: string): ShareableData | null => {
    try {
        const base64String = urlToBase64(key);
        const jsonString = decodeURIComponent(escape(atob(base64String)));
        return JSON.parse(jsonString) as ShareableData;
    } catch (error) {
        console.error("Error decoding key:", error);
        return null;
    }
};