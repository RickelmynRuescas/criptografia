import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import TypeWriter from "../components/TypeWriter"

function Home() {
  return (
    <div className="container">
      <Navbar />

      <h1 data-text="Sistema Seguro">Sistema Seguro</h1>

      <TypeWriter text="Sistema de criptografia segura iniciado..." />

      <p className="homeSubtitle">
        Proteja mensagens com criptografia, gere links secretos e compartilhe dados
        com mais segurança.
      </p>

      <div className="homeActions">
        <Link to="/criptografar" className="homePrimaryButton">
          Começar agora
        </Link>
      </div>

      <div className="homeGrid">
        <div className="infoCard">
          <h3>Criptografar</h3>
          <p>
            Transforme sua mensagem em texto protegido usando uma senha secreta.
          </p>
        </div>

        <div className="infoCard">
          <h3>Descriptografar</h3>
          <p>
            Recupere a mensagem original com a senha correta de forma simples.
          </p>
        </div>

        <div className="infoCard">
          <h3>Link secreto</h3>
          <p>
            Gere um link temporário para compartilhar mensagens com acesso restrito.
          </p>
        </div>
      </div>

      <div className="stepsSection">
        <h2>Como funciona</h2>

        <div className="stepsGrid">
          <div className="stepCard">
            <span>1</span>
            <p>Digite sua mensagem e escolha uma senha.</p>
          </div>

          <div className="stepCard">
            <span>2</span>
            <p>Criptografe ou gere um link secreto temporário.</p>
          </div>

          <div className="stepCard">
            <span>3</span>
            <p>Compartilhe com segurança e use a senha para abrir.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home