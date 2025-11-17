import { Container, SimpleGrid, Heading } from "@chakra-ui/react"
import GameCard from "./components/GameCard"
import GameModal from "./components/GameModal"
import { useState, useEffect } from "react"
import type { Game } from "./types"
import { fetchGames } from "./data/gamesHandler"

export default function App() {
    const [games, setGames] = useState<Game[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [current, setCurrent] = useState<Game | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        const loadGames = async () => {
            try {
                setLoading(true)
                console.log("API Key exists:", !!import.meta.env.VITE_RAWG_API_KEY)
                console.log("API Key value:", import.meta.env.VITE_RAWG_API_KEY ? "SET" : "NOT SET")
                const response = await fetchGames(1)
                const mappedGames: Game[] = response.results.map(game => ({
                    id: game.id.toString(),
                    title: game.name,
                    thumb: game.background_image,
                    url: `https://rawg.io/games/${game.id}`,
                    tags: game.genres?.map(g => g.name) || [],
                    description: `Released: ${game.released || 'N/A'} | Rating: ${game.rating || 'N/A'}`,
                    rating: game.rating,
                    metacritic: game.metacritic,
                    released: game.released,
                    platforms: game.platforms?.slice(0, 3).map(p => p.platform.name) || [],
                    playtime: game.playtime
                }))
                console.log("Mapped games:", mappedGames.length)
                setGames(mappedGames)
            } catch (error) {
                console.error("Error fetching games:", error)
            } finally {
                setLoading(false)
            }
        }
        loadGames()
    }, [])
    
    const onOpen = (g: Game) => { setCurrent(g); setOpen(true) }
    
    return (
        <Container py={6}>
            <Heading mb={6}>Game Library</Heading>
            {loading ? (
                <Heading size="md">Loading games...</Heading>
            ) : (
                <SimpleGrid columns={5} gap={4}>
                    {games.map(g => <GameCard key={g.id} game={g} onOpen={onOpen} />)}
                </SimpleGrid>
            )}
            <GameModal isOpen={open} onClose={()=>setOpen(false)} game={current ?? undefined} />
        </Container>
    )   
}