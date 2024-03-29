import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "../styleSheets/Navbar.css";
import useAuth from "./Auth/useAuth";

export default function Navbar() {
  const { auth } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        HJEMMEBIBLIOTEK
      </Link>
      {auth.isAuthenticated && (
        <ul>
          <CustomLink to="library">Bibliotek</CustomLink>
          <CustomLink to="alt">Alt</CustomLink>
          <CustomLink to="addAndDelete">Legg til og slett</CustomLink>
          <CustomLink to="mypage">Logg ut</CustomLink>
        </ul>
      )}
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
