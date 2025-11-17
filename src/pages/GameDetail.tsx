import { useParams, useNavigate } from "react-router-dom";
import { Container, Heading, Button, Spinner } from "@chakra-ui/react";
import { useGameDetails } from "../hooks/useGameDetails";
import GameHero from "../components/GameHero";
import GameInfo from "../components/GameInfo";

export default function GameDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { game, loading } = useGameDetails(id);

    if (loading) {
        return (
            <Container maxW="container.xl" py={10} centerContent>
                <Spinner size="xl" />
            </Container>
        );
    }

    if (!game) {
        return (
            <Container maxW="container.xl" py={10}>
                <Heading>Game not found</Heading>
                <Button mt={4} onClick={() => navigate("/")}>Back to Library</Button>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" py={6}>
            <Button mb={4} onClick={() => navigate("/")}>← Back to Library</Button>
            <GameHero game={game} />
            <GameInfo game={game} />
        </Container>
    );
}
