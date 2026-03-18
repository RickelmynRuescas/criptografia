import { Link } from "react-router-dom"

function Navbar(){

return(

<div className="navbar">

<Link to="/">
<button>Home</button>
</Link>

<Link to="/criptografar">
<button>Criptografar</button>
</Link>

<Link to="/descriptografar">
<button>Descriptografar</button>
</Link>

</div>

)

}

export default Navbar