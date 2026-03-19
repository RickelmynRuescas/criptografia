import Navbar from "../components/Navbar"
import TypeWriter from "../components/TypeWriter"

function Informacoes() {
  return (
    <div className="container">
      <Navbar />

      <h1 data-text="O que é criptografia?">O que é criptografia?</h1>

      <TypeWriter text="Página informativa carregada com sucesso..." />

      <p className="infoLead">
        Esta área explica, de forma simples, como a criptografia protege
        mensagens, senhas e dados importantes.
      </p>

      <div className="infoGrid">
        <div className="infoCard">
          <h3>O que é criptografia</h3>
          <p>
            Técnica usada para transformar informações legíveis em conteúdo
            protegido.
          </p>
        </div>

        <div className="infoCard">
          <h3>Para que serve</h3>
          <p>
            Ajuda a impedir que pessoas sem autorização leiam dados sensíveis.
          </p>
        </div>

        <div className="infoCard">
          <h3>Senha secreta</h3>
          <p>
            A chave correta é necessária para recuperar a mensagem original.
          </p>
        </div>

        <div className="infoCard">
          <h3>Uso no mundo real</h3>
          <p>
            Está presente em apps de mensagem, bancos, sites e sistemas
            corporativos.
          </p>
        </div>
      </div>

      <div className="infoNotice">
        <strong>⚠️ Dica de segurança:</strong> nunca compartilhe sua senha secreta
        junto da mensagem criptografada.
      </div>

      <div className="stepsSection">
        <h2>Fluxo deste sistema</h2>

        <div className="stepsGrid">
          <div className="stepCard">
            <span>1</span>
            <p>Você digita a mensagem e define uma senha.</p>
          </div>

          <div className="stepCard">
            <span>2</span>
            <p>O sistema protege o conteúdo com criptografia.</p>
          </div>

          <div className="stepCard">
            <span>3</span>
            <p>Somente a senha correta pode revelar a mensagem original.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Informacoes