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
            🛒
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
