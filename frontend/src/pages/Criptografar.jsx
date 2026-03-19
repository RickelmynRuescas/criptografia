import { useMemo, useState } from "react"
import Navbar from "../components/Navbar"
import TerminalInput from "../components/TerminalInput"
import PasswordStrength from "../components/PasswordStrength"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

function Criptografar() {
  const [mensagem, setMensagem] = useState("")
  const [senha, setSenha] = useState("")
  const [resultado, setResultado] = useState("")
  const [loading, setLoading] = useState(false)
  const [link, setLink] = useState("")
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")

  const totalCaracteres = useMemo(() => mensagem.length, [mensagem])

  function limparMensagens() {
    setErro("")
    setSucesso("")
  }

  function limparCampos() {
    setMensagem("")
    setSenha("")
    setResultado("")
    setLink("")
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

  async function criptografarMensagem() {
    limparMensagens()

    if (!mensagem || !senha) {
      setErro("⚠️ Preencha a mensagem e a senha")
      return
    }

    setLoading(true)
    setResultado("")
    setLink("")

    try {
      const response = await fetch(`${API_URL}/criptografar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensagem,
          chave: senha
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.erro || "Erro no servidor")
      }

      const data = await response.json()

      if (data?.resultado) {
        setResultado(data.resultado)
        setSucesso("✅ Mensagem criptografada com sucesso")
      } else {
        setErro("❌ Erro ao criptografar")
      }
    } catch (err) {
      console.error("ERRO REAL:", err)
      setErro("❌ Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  async function gerarLink() {
    limparMensagens()

    if (!mensagem || !senha) {
      setErro("⚠️ Preencha a mensagem e a senha")
      return
    }

    setLoading(true)
    setLink("")

    try {
      const response = await fetch(`${API_URL}/criar-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensagem,
          chave: senha
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.erro || "Erro no servidor")
      }

      const data = await response.json()

      if (data?.link) {
        const linkFinal = `${window.location.origin}/mensagem/${data.link}`
        await navigator.clipboard.writeText(linkFinal)

        setLink(linkFinal)
        setSucesso("✅ Link secreto gerado e copiado automaticamente")
      } else {
        setErro("❌ Erro ao gerar link")
      }
    } catch (err) {
      console.error("ERRO REAL:", err)
      setErro("❌ Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <Navbar />

      <h1 data-text="Criptografar">Criptografar</h1>

      <p className="terminalLine">&gt; Inicializando sistema de criptografia...</p>

      <div className="pageTools">
        <div className="toolChip">Caracteres: {totalCaracteres}</div>
        <div className="toolChip">Modo seguro ativo</div>
      </div>

      <textarea
        placeholder="Digite sua mensagem..."
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
      />

      <TerminalInput
        type="password"
        value={senha}
        setValue={setSenha}
        placeholder="Digite uma senha secreta..."
      />

      <PasswordStrength senha={senha} />

      <div className="buttonGroup">
        <button onClick={criptografarMensagem} disabled={loading}>
          {loading ? "🔐 Criptografando..." : "Criptografar"}
        </button>

        <button className="secondaryButton" onClick={limparCampos} disabled={loading}>
          Limpar campos
        </button>
      </div>

      {loading && (
        <div className="loadingBar">
          <div className="loadingFill"></div>
        </div>
      )}

      <textarea value={resultado} readOnly placeholder="Resultado..." />

      {resultado && (
        <div className="buttonGroup">
          <button onClick={copiarResultado}>📋 Copiar resultado</button>
          <button className="secondaryButton" onClick={gerarLink} disabled={loading}>
            🔗 Gerar link secreto
          </button>
        </div>
      )}

      {link && (
        <div className="linkBox">
          <strong>📎 Link copiado automaticamente:</strong>
          <br />
          {link}
        </div>
      )}

      {sucesso && <div className="sucesso">{sucesso}</div>}
      {erro && <div className="erro">{erro}</div>}
    </div>
  )
}

export default Criptografar