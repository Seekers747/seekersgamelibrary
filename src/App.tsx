import { Container, SimpleGrid, Heading, Button, HStack, Flex } from "@chakra-ui/react"
import GameCard from "./components/GameCard"
import GameOrder from "./components/GameOrder"
import { useState } from "react"
import { useGames } from "./hooks/useGames"

export default function App() {
    const [page, setPage] = useState<number>(1)
    const [ordering, setOrdering] = useState<string>("relevance")
    const { games, loading, hasNext } = useGames(page, ordering)
    
    const handleOrderChange = (newOrdering: string) => {
        setOrdering(newOrdering)
        setPage(1) // Reset to page 1 when ordering changes
    }
    
    return (
        <Container py={6}>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Game Library</Heading>
                <GameOrder value={ordering} onChange={handleOrderChange} />
            </Flex>
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