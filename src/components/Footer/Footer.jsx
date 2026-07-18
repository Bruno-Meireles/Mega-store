import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="container footer__content">
        <div className="footer__brand">
          <h3>Mega Store</h3>
          <p>Os melhores produtos com qualidade e preço justo.</p>
        </div>

        <div className="footer__links">
          <h4>Links</h4>
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Contato</h4>
          <p>📧 contato@megastore.com</p>
          <p>📞 (11) 99999-9999</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} <strong>Mega Store</strong>. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;