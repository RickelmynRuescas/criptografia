import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Home
      </NavLink>

      <NavLink
        to="/criptografar"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Criptografar
      </NavLink>

      <NavLink
        to="/descriptografar"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Descriptografar
      </NavLink>

      <NavLink
        to="/informacoes"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Informações
      </NavLink>
    </div>
  )
}

export default Navbar