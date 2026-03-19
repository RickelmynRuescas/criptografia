import { BrowserRouter, Route, Routes } from "react-router-dom"
import Matrix from "./components/Matrix"

import Home from "./pages/Home"
import Criptografar from "./pages/Criptografar"
import Descriptografar from "./pages/Descriptografar"
import Mensagem from "./pages/Mensagem"
import Informacoes from "./pages/Informacoes"

function App() {
  return (
    <>
      <Matrix />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/criptografar" element={<Criptografar />} />
          <Route path="/descriptografar" element={<Descriptografar />} />
          <Route path="/mensagem/:id" element={<Mensagem />} />
          <Route path="/informacoes" element={<Informacoes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App