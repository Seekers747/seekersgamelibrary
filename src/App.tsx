import { Container, SimpleGrid, Heading } from "@chakra-ui/react"
import gamesData from "./data/games.json"
import GameCard from "./components/GameCard"
import GameModal from "./components/GameModal"
import { useState } from "react"
import type { Game } from "./types"

export default function App() {
    const [games] = useState<Game[]>(gamesData as Game[])
    const [open, setOpen] = useState<boolean>(false)
    const [current, setCurrent] = useState<Game | undefined>(undefined)
    const onOpen = (g: Game) => { setCurrent(g); setOpen(true) }
    return (
        <Container maxW="container.xl" py={6}>
            <Heading mb={6}>Game Library</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} rowGap={2} columnGap={3}>
                {games.map(g => <GameCard key={g.id} game={g} onOpen={onOpen} />)}
            </SimpleGrid>
            <GameModal isOpen={open} onClose={()=>setOpen(false)} game={current ?? undefined} />
        </Container>
    )   
}