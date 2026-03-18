import Navbar from "../components/Navbar"
import TypeWriter from "../components/TypeWriter"

function Home(){

return(

<div className="container">

<Navbar/>
<h1 data-text="Sistema Seguro">Sistema Seguro</h1>

<TypeWriter text="Sistema de criptografia segura iniciado..." />

</div>

)

}

export default Home