import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import App from './App.tsx'
import GameDetail from './pages/GameDetail.tsx'

createRoot(document.getElementById('root')!).render(
  <ChakraProvider value={defaultSystem}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game/:id" element={<GameDetail />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
