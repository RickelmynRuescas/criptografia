import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import TerminalInput from "../components/TerminalInput"

function Mensagem(){

const { id } = useParams()

const [senha,setSenha] = useState("")
const [mensagem,setMensagem] = useState("")
const [erro,setErro] = useState("")
const [loading,setLoading] = useState(false)
const [status,setStatus] = useState("idle")
const [tempo,setTempo] = useState(10)

/* 🔓 DESBLOQUEAR */
async function desbloquear(){

if(!senha){
setErro("Digite a senha")
return
}

setLoading(true)
setErro("")
setStatus("acessando")

try{

const res = await fetch("https://criptografia-3.onrender.com/mensagem/" + id)

if(!res.ok){

if(res.status === 404){
setErro("💀 Mensagem não existe")
}
else if(res.status === 410){
setErro("⏳ Mensagem expirada")
}
else if(res.status === 403){
setErro("⚠️ Mensagem já foi visualizada")
}
else{
setErro("❌ Erro no servidor")
}

setStatus("erro")
setLoading(false)
return
}

const data = await res.json()

const response = await fetch("https://criptografia-3.onrender.com/descriptografar",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
cript: data.mensagem,
chave: senha
})
})

if(!response.ok){

if(response.status === 400){
setErro("❌ Senha incorreta")
}
else{
setErro("❌ Erro no servidor")
}

setStatus("erro")
setLoading(false)
return
}

const result = await response.json()

if(result && result.resultado){

setMensagem(result.resultado)
setStatus("liberado")

}else{
setErro("❌ Falha ao descriptografar")
setStatus("erro")
}

}catch(err){

console.error("ERRO REAL:", err)
setErro("❌ Erro ao conectar com servidor")
setStatus("erro")

}

setLoading(false)
}

/* 💣 CONTAGEM REAL */
useEffect(()=>{

if(status === "liberado"){

setTempo(10)

const interval = setInterval(()=>{

setTempo((t)=>{

if(t <= 1){

clearInterval(interval)

fetch("https://criptografia-3.onrender.com/destruir/" + id,{
method:"DELETE"
})

document.body.classList.add("flash")
setTimeout(()=>document.body.classList.remove("flash"),500)

setMensagem("")
setStatus("destruido")

return 0
}

return t - 1

})

},1000)

return ()=>clearInterval(interval)

}

},[status, id])

return(

<div className="container">

<h1 data-text="ACESSO RESTRITO">ACESSO RESTRITO</h1>

{status === "idle" && (
<>
<TerminalInput
type="password"
value={senha}
setValue={setSenha}
placeholder="Digite a senha..."
/>

<button onClick={desbloquear}>
{loading ? "Invadindo..." : "Desbloquear"}
</button>
</>
)}

{status === "acessando" && (
<div className="countdown">
🔓 Quebrando criptografia...
</div>
)}

{status === "liberado" && (
<>
<div className="countdown">
💣 Autodestruição em {tempo}s
</div>

<textarea value={mensagem} readOnly/>
</>
)}

{status === "destruido" && (
<div className="erro">
💀 Mensagem destruída permanentemente
</div>
)}

{erro && status !== "destruido" && (
<div className="erro">{erro}</div>
)}

</div>

)

}

export default Mensagem
