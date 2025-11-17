import { Container, SimpleGrid, Heading, Button, HStack } from "@chakra-ui/react"
import GameCard from "./components/GameCard"
import { useState, useEffect } from "react"
import type { Game } from "./types"
import { fetchGames } from "./data/gamesHandler"

export default function App() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [hasNext, setHasNext] = useState<boolean>(false)
    
    useEffect(() => {
        const loadGames = async () => {
            try {
                setLoading(true)
                console.log("API Key exists:", !!import.meta.env.VITE_RAWG_API_KEY)
                console.log("API Key value:", import.meta.env.VITE_RAWG_API_KEY ? "SET" : "NOT SET")
                const response = await fetchGames(page)
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
                setHasNext(!!response.next)
            } catch (error) {
                console.error("Error fetching games:", error)
            } finally {
                setLoading(false)
            }
        }
        loadGames()
    }, [page])
    
    return (
        <Container py={6}>
            <Heading mb={6}>Game Library</Heading>
            {loading ? (
                <Heading size="md">Loading games...</Heading>
            ) : (
                <>
                    <SimpleGrid columns={5} gap={4}>
                        {games.map(g => <GameCard key={g.id} game={g} />)}
                    </SimpleGrid>
                    
                    <HStack justify="center" mt={8} gap={4}>
                        <Button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            size="lg"
                        >
                            ← Previous
                        </Button>
                        <Heading size="md">Page {page}</Heading>
                        <Button
                            onClick={() => setPage(p => p + 1)}
                            disabled={!hasNext}
                            size="lg"
                        >
                            Next →
                        </Button>
                    </HStack>
                </>
            )}
        </Container>
    )   
}