import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Header.css";

function Header() {
  const { totalItems, openCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          Mega<span>Store</span>
        </Link>

        <div className="header__actions">
          <nav className="header__nav">
            <ul>
              <li>
                <button type="button" className="header__link" onClick={() => goToSection("inicio")}>
                  Início
                </button>
              </li>
              <li>
                <button type="button" className="header__link" onClick={() => goToSection("produtos")}>
                  Produtos
                </button>
              </li>
              <li>
                <button type="button" className="header__link" onClick={() => goToSection("contato")}>
                  Contato
                </button>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="header__cart"
            onClick={openCart}
            aria-label={`Abrir carrinho${totalItems ? `, ${totalItems} itens` : ""}`}
          >
            <svg
              className="header__cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="header__cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
