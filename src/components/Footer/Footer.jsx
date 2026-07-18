import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} <strong>Mega Store</strong>. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
