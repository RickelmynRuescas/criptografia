import { useState } from "react"
import Navbar from "../components/Navbar"

function Descriptografar(){

const [texto,setTexto] = useState("")
const [senha,setSenha] = useState("")
const [resultado,setResultado] = useState("")
const [status,setStatus] = useState("")

async function descriptografar(){

if(!texto || !senha){
alert("Preencha os campos")
return
}

try{

const response = await fetch("https://criptografia-3.onrender.com/descriptografar",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
cript: texto,
chave: senha
})
})

const data = await response.json()

if(data.resultado){
setResultado(data.resultado)
setStatus("ok")
}else{
setResultado("")
setStatus("fail")
}

}catch{
setStatus("fail")
}

}

return(

<div className="container">

<Navbar/>

<h1 data-text="Descriptografar">Descriptografar</h1>

<textarea
placeholder="Cole a mensagem criptografada"
value={texto}
onChange={(e)=>setTexto(e.target.value)}
/>

<input
type="password"
placeholder="Digite a senha secreta..."
value={senha}
onChange={(e)=>setSenha(e.target.value)}
/>

<button onClick={descriptografar}>
Descriptografar
</button>

{status === "ok" && (
<div className="access ok">✔ ACESSO CONCEDIDO</div>
)}

{status === "fail" && (
<div className="access fail">✖ ACESSO NEGADO</div>
)}

<textarea
value={resultado}
readOnly
placeholder="Resultado"
/>

</div>

)

}

export default Descriptografar
