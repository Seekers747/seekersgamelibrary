import { Container, SimpleGrid, Heading, Button, HStack } from "@chakra-ui/react"
import GameCard from "./components/GameCard"
import { useState } from "react"
import { useGames } from "./hooks/useGames"

export default function App() {
    const [page, setPage] = useState<number>(1)
    const { games, loading, hasNext } = useGames(page)
    
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