import { Link, useLocation } from "react-router";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-title">Frontend Task</h1>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Users
          </Link>
          <Link
            to="/jokes"
            className={`nav-link ${isActive("/jokes") ? "active" : ""}`}
          >
            Jokes
          </Link>
        </div>
      </div>
    </nav>
  );
}
