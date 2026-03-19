import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TerminalInput from "../components/TerminalInput"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

function Mensagem() {
  const { id } = useParams()

  const [senha, setSenha] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("idle")
  const [tempo, setTempo] = useState(10)

  async function copiarMensagem() {
    if (!mensagem) return

    try {
      await navigator.clipboard.writeText(mensagem)
      setSucesso("✅ Mensagem copiada antes da autodestruição")
      setErro("")
    } catch {
      setErro("❌ Não foi possível copiar a mensagem")
      setSucesso("")
    }
  }

  async function desbloquear() {
    if (!senha) {
      setErro("⚠️ Digite a senha")
      setSucesso("")
      return
    }

    setLoading(true)
    setErro("")
    setSucesso("")
    setStatus("acessando")

    try {
      const res = await fetch(`${API_URL}/mensagem/${id}`)

      if (!res.ok) {
        if (res.status === 404) {
          setErro("💀 Mensagem não existe")
        } else if (res.status === 410) {
          setErro("⏳ Mensagem expirada")
        } else if (res.status === 403) {
          setErro("⚠️ Mensagem já foi visualizada")
        } else {
          setErro("❌ Erro no servidor")
        }

        setStatus("erro")
        setLoading(false)
        return
      }

      const data = await res.json()

      const response = await fetch(`${API_URL}/descriptografar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cript: data.mensagem,
          chave: senha
        })
      })

      if (!response.ok) {
        if (response.status === 400) {
          setErro("❌ Senha incorreta")
        } else {
          setErro("❌ Erro no servidor")
        }

        setStatus("erro")
        setLoading(false)
        return
      }

      const result = await response.json()

      if (result?.resultado) {
        setMensagem(result.resultado)
        setStatus("liberado")
        setSucesso("✅ Mensagem liberada com sucesso")
      } else {
        setErro("❌ Falha ao descriptografar")
        setStatus("erro")
      }
    } catch (err) {
      console.error("ERRO REAL:", err)
      setErro("❌ Erro ao conectar com o servidor")
      setStatus("erro")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "liberado") {
      setTempo(10)

      const interval = setInterval(() => {
        setTempo((t) => {
          if (t <= 1) {
            clearInterval(interval)

            fetch(`${API_URL}/destruir/${id}`, {
              method: "DELETE"
            }).catch(() => {})

            document.body.classList.add("flash")
            setTimeout(() => document.body.classList.remove("flash"), 500)

            setMensagem("")
            setSucesso("")
            setStatus("destruido")

            return 0
          }

          return t - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [status, id])

  return (
    <div className="container restrictedContainer">
      <h1 data-text="Acesso Restrito">Acesso Restrito</h1>

      <p className="terminalLine">&gt; Link secreto detectado. Autodestruição habilitada...</p>

      {status === "idle" && (
        <>
          <TerminalInput
            type="password"
            value={senha}
            setValue={setSenha}
            placeholder="Digite a senha..."
          />

          <button onClick={desbloquear} disabled={loading}>
            {loading ? "Invadindo..." : "Desbloquear"}
          </button>
        </>
      )}

      {status === "acessando" && (
        <div className="countdown">🔓 Quebrando criptografia...</div>
      )}

      {status === "liberado" && (
        <>
          <div className="countdown">💣 Autodestruição em {tempo}s</div>

          <textarea value={mensagem} readOnly />

          <button className="secondaryButton" onClick={copiarMensagem}>
            📋 Copiar mensagem
          </button>
        </>
      )}

      {status === "destruido" && (
        <div className="erro">💀 Mensagem destruída permanentemente</div>
      )}

      {sucesso && status !== "destruido" && <div className="sucesso">{sucesso}</div>}
      {erro && status !== "destruido" && <div className="erro">{erro}</div>}
    </div>
  )
}

export default Mensagem