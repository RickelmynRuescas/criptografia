function PasswordStrength({ senha }) {
  let nivel = "Fraca"
  let cor = "#ef4444"
  let largura = "25%"

  const temNumero = /\d/.test(senha)
  const temMaiuscula = /[A-Z]/.test(senha)
  const temMinuscula = /[a-z]/.test(senha)
  const temSimbolo = /[^A-Za-z0-9]/.test(senha)

  let pontos = 0

  if (senha.length >= 6) pontos++
  if (senha.length >= 8) pontos++
  if (temNumero) pontos++
  if (temMaiuscula && temMinuscula) pontos++
  if (temSimbolo) pontos++

  if (pontos >= 2) {
    nivel = "Média"
    cor = "#f59e0b"
    largura = "60%"
  }

  if (pontos >= 4) {
    nivel = "Forte"
    cor = "#22c55e"
    largura = "100%"
  }

  return (
    <div className="strengthWrapper">
      <div className="strengthText" style={{ color: cor }}>
        Força da senha: {senha ? nivel : "—"}
      </div>

      <div className="strengthBar">
        <div
          className="strengthFill"
          style={{
            width: senha ? largura : "0%",
            background: cor
          }}
        ></div>
      </div>
    </div>
  )
}

export default PasswordStrength