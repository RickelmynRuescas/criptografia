import Matrix from "./components/Matrix"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Criptografar from "./pages/Criptografar"
import Descriptografar from "./pages/Descriptografar"
import Mensagem from "./pages/Mensagem"

function App(){

return(

<>
<Matrix/>

<BrowserRouter>

<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/criptografar" element={<Criptografar/>}/>
<Route path="/descriptografar" element={<Descriptografar/>}/>
<Route path="/mensagem/:id" element={<Mensagem/>}/>
</Routes>

</BrowserRouter>

</>

)

}

export default App