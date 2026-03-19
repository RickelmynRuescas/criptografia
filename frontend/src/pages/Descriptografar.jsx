import { useState } from "react"
import Navbar from "../components/Navbar"
import TerminalInput from "../components/TerminalInput"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

function Descriptografar() {
  const [texto, setTexto] = useState("")
  const [senha, setSenha] = useState("")
  const [resultado, setResultado] = useState("")
  const [status, setStatus] = useState("")
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")
  const [loading, setLoading] = useState(false)

  function limparCampos() {
    setTexto("")
    setSenha("")
    setResultado("")
    setStatus("")
    setErro("")
    setSucesso("")
  }

  async function copiarResultado() {
    if (!resultado) return

    try {
      await navigator.clipboard.writeText(resultado)
      setSucesso("✅ Resultado copiado com sucesso")
      setErro("")
    } catch {
      setErro("❌ Não foi possível copiar o resultado")
      setSucesso("")
    }
  }

  async function colarConteudo() {
    try {
      const textoCopiado = await navigator.clipboard.readText()
      setTexto(textoCopiado)
      setSucesso("✅ Conteúdo colado da área de transferência")
      setErro("")
    } catch {
      setErro("❌ Não foi possível colar o conteúdo")
      setSucesso("")
    }
  }

  async function descriptografarTexto() {
    setErro("")
    setSucesso("")
    setStatus("")

    if (!texto || !senha) {
      setErro("⚠️ Preencha os campos")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/descriptografar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cript: texto,
          chave: senha
        })
      })

      const data = await response.json()

      if (response.ok && data?.resultado) {
        setResultado(data.resultado)
        setStatus("ok")
        setSucesso("✅ Mensagem descriptografada com sucesso")
      } else {
        setResultado("")
        setStatus("fail")
        setErro("❌ Senha incorreta ou conteúdo inválido")
      }
    } catch (err) {
      console.error("ERRO REAL:", err)
      setResultado("")
      setStatus("fail")
      setErro("❌ Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <Navbar />

      <h1 data-text="Descriptografar">Descriptografar</h1>

      <p className="terminalLine">&gt; Validando chave e restaurando conteúdo...</p>

      <div className="buttonGroup topButtons">
        <button className="secondaryButton" onClick={colarConteudo}>
          📥 Colar conteúdo
        </button>

        <button className="secondaryButton" onClick={limparCampos}>
          Limpar campos
        </button>
      </div>

      <textarea
        placeholder="Cole a mensagem criptografada"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <TerminalInput
        type="password"
        value={senha}
        setValue={setSenha}
        placeholder="Digite a senha secreta..."
      />

      <button onClick={descriptografarTexto} disabled={loading}>
        {loading ? "🔓 Descriptografando..." : "Descriptografar"}
      </button>

      {loading && (
        <div className="loadingBar">
          <div className="loadingFill"></div>
        </div>
      )}

      {status === "ok" && <div className="access ok">✔ ACESSO CONCEDIDO</div>}
      {status === "fail" && <div className="access fail">✖ ACESSO NEGADO</div>}

      <textarea value={resultado} readOnly placeholder="Resultado..." />

      {resultado && (
        <button onClick={copiarResultado}>📋 Copiar mensagem descriptografada</button>
      )}

      {sucesso && <div className="sucesso">{sucesso}</div>}
      {erro && <div className="erro">{erro}</div>}
    </div>
  )
}

export default Descriptografar