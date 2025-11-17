import { useState, useEffect } from "react";
import { fetchGameDetails } from "../data/gamesHandler";

export interface GameDetails {
    id: number;
    name: string;
    description_raw: string;
    background_image: string;
    rating: number;
    metacritic: number;
    released: string;
    genres: Array<{ id: number; name: string }>;
    platforms: Array<{ platform: { id: number; name: string } }>;
    developers: Array<{ id: number; name: string }>;
    publishers: Array<{ id: number; name: string }>;
    playtime: number;
    website: string;
}

export function useGameDetails(id: string | undefined) {
    const [game, setGame] = useState<GameDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGameDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchGameDetails(Number(id));
                setGame(data as GameDetails);
            } catch (error) {
                console.error("Error fetching game details:", error);
            } finally {
                setLoading(false);
            }
        };
        
        if (id) loadGameDetails();
    }, [id]);

    return { game, loading };
}
