import { Box, Text, NativeSelectRoot, NativeSelectField } from "@chakra-ui/react";

interface GameOrderProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GameOrder({ value, onChange }: GameOrderProps) {
    return (
        <Box>
        <Text mb={2} fontWeight="medium">Order By</Text>
        <NativeSelectRoot size="md" width="250px">
            <NativeSelectField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            >
            <option value="relevance">Relevance</option>
            <option value="-rating">Rating (Highest)</option>
            <option value="rating">Rating (Lowest)</option>
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
            <option value="-released">Release Date (Newest)</option>
            <option value="released">Release Date (Oldest)</option>
            <option value="-metacritic">Metacritic (Highest)</option>
            <option value="metacritic">Metacritic (Lowest)</option>
            </NativeSelectField>
        </NativeSelectRoot>
        </Box>
    );
}

