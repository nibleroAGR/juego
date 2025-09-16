import React, { useState } from 'react';
import { Character, Pet } from '../types';
import { encodeData, decodeData } from '../services/keyService';

interface KeySystemProps {
    character: Character;
    pet: Pet;
}

const ComparisonStatRow: React.FC<{ label: string; localValue: string | number; remoteValue: string | number; }> = ({ label, localValue, remoteValue }) => (
    <div className="grid grid-cols-3 items-center text-center gap-2 py-2 border-b">
        <div className="text-left font-semibold text-gray-600 text-sm sm:text-base">{label}</div>
        <div className="font-bold text-blue-700 text-md sm:text-lg">{localValue}</div>
        <div className="font-bold text-green-700 text-md sm:text-lg">{remoteValue}</div>
    </div>
);

const ComparisonView: React.FC<{ local: any, remote: any }> = ({ local, remote }) => {
    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">¡Comparación de Héroes!</h3>
            
            <div className="grid grid-cols-3 items-center text-center gap-2 pb-2 border-b-2 border-gray-300">
                <div className="text-left font-bold text-gray-500 text-sm sm:text-base">Estadística</div>
                <div className="font-bold bg-blue-100 text-blue-800 rounded p-1 truncate text-sm sm:text-base">{local.name}</div>
                <div className="font-bold bg-green-100 text-green-800 rounded p-1 truncate text-sm sm:text-base">{remote.name}</div>
            </div>

            <div className="mt-2">
                <ComparisonStatRow label="Nivel" localValue={local.level} remoteValue={remote.level} />
                <ComparisonStatRow label="Monedas" localValue={local.coins} remoteValue={remote.coins} />
                <ComparisonStatRow label="Vida" localValue={local.health} remoteValue={remote.health} />
                <ComparisonStatRow label="Nivel Mascota" localValue={local.petLevel} remoteValue={remote.petLevel} />
            </div>

            <p className="text-center mt-6 font-semibold text-indigo-700 bg-indigo-50 p-3 rounded-lg">¡Ambos héroes están creciendo! ¡Sigan entrenando sus hábitos!</p>
        </div>
    );
};


export const KeySystem: React.FC<KeySystemProps> = ({ character, pet }) => {
    const [generatedKey, setGeneratedKey] = useState('');
    const [inputKey, setInputKey] = useState('');
    const [comparisonData, setComparisonData] = useState<any>(null);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        const key = encodeData(character, pet);
        setGeneratedKey(key);
        setCopied(false);
    };
    
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(generatedKey).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    
    const handleCompare = () => {
        setError('');
        setComparisonData(null);
        const remoteData = decodeData(inputKey);
        if (remoteData) {
            const localData = JSON.parse(atob(encodeData(character, pet)));
            setComparisonData({ local: localData, remote: remoteData });
        } else {
            setError('La clave introducida no es válida.');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold mb-2">Exportar Progreso</h3>
                <p className="text-sm text-gray-600 mb-2">Genera una clave para compartir tu progreso con amigos o familia.</p>
                <button onClick={handleGenerate} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
                    Generar Clave
                </button>
                {generatedKey && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg break-all relative">
                        <code>{generatedKey}</code>
                        <button onClick={handleCopyToClipboard} className="absolute top-2 right-2 bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-300">
                            {copied ? '¡Copiado!' : 'Copiar'}
                        </button>
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-lg font-bold mb-2">Comparar Progreso</h3>
                <p className="text-sm text-gray-600 mb-2">Introduce una clave para comparar tu héroe con otro.</p>
                <textarea
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="w-full p-2 border rounded-lg h-24"
                    placeholder="Pega la clave aquí..."
                />
                <button onClick={handleCompare} className="mt-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                    Comparar
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {comparisonData && <ComparisonView local={comparisonData.local} remote={comparisonData.remote} />}
            </div>
        </div>
    );
};