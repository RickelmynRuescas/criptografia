import { useState } from "react"
import Navbar from "../components/Navbar"
import TerminalInput from "../components/TerminalInput"

function Criptografar(){

const [mensagem,setMensagem] = useState("")
const [senha,setSenha] = useState("")
const [resultado,setResultado] = useState("")
const [loading,setLoading] = useState(false)
const [link,setLink] = useState("")
const [erro,setErro] = useState("")

async function criptografar(){

if(!mensagem || !senha){
alert("Preencha a mensagem e a senha")
return
}

setLoading(true)
setLink("")
setErro("")

try{

const response = await fetch("https://criptografia-3.onrender.com/criptografar",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
mensagem: mensagem,
chave: senha // ✅ PADRÃO
})
})

// 💥 VALIDAÇÃO REAL
if(!response.ok){
throw new Error("Erro no servidor")
}

const data = await response.json()

if(data && data.resultado){
setResultado(data.resultado)
}else{
setErro("Erro ao criptografar")
}

}catch(err){

console.error("ERRO REAL:", err)
setErro("❌ Erro ao conectar com servidor")

}

setLoading(false)

}

async function gerarLink(){

if(!mensagem || !senha){
setErro("⚠️ Preencha a mensagem e senha")
return
}

try{

const response = await fetch("https://criptografia-3.onrender.com/criar-link",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
mensagem: mensagem,
chave: senha // ✅ PADRONIZADO AQUI TAMBÉM
})
})

// 💥 VALIDAÇÃO REAL
if(!response.ok){
throw new Error("Erro no servidor")
}

const data = await response.json()

if(data && data.link){

const linkFinal = window.location.origin + "/mensagem/" + data.link

await navigator.clipboard.writeText(linkFinal)

setLink(linkFinal)

}else{
setErro("Erro ao gerar link")
}

}catch(err){

console.error("ERRO REAL:", err)
setErro("❌ Erro ao conectar com servidor")

}

}

return(

<div className="container">

<Navbar/>

<h1 data-text="Criptografar">Criptografar</h1>

<p className="terminalLine">
&gt; Inicializando sistema de criptografia...
</p>

<textarea
placeholder="Digite sua mensagem..."
value={mensagem}
onChange={(e)=>setMensagem(e.target.value)}
/>

<TerminalInput
type="password"
value={senha}
setValue={setSenha}
placeholder="DDigite uma senha secreta..."
/>

<button onClick={criptografar}>
{loading ? "🔐 Criptografando..." : "Criptografar"}
</button>

{loading && (
<div className="loadingBar">
<div className="loadingFill"></div>
</div>
)}

<textarea
value={resultado}
readOnly
placeholder="Resultado..."
/>

{resultado && (
<button onClick={gerarLink}>
🔗 Gerar link secreto
</button>
)}

{link && (
<div className="linkBox">
📎 Link copiado automaticamente:
<br/>
{link}
</div>
)}

{erro && <div className="erro">{erro}</div>}

</div>

)

}

export default Criptografar
