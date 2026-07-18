import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#inicio" className="header__logo">
          Mega<span>Store</span>
        </a>
        <nav className="header__nav">
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
