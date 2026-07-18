import "./Hero.css";

function Hero({ onCtaClick }) {
  return (
    <section id="inicio" className="hero">
      <div className="container">
        <h1 className="hero__title">Bem-vindo à Mega Store</h1>
        <p className="hero__slogan">
          Qualidade, preço justo e entrega rápida. Descubra produtos incríveis
          para o seu dia a dia.
        </p>
        <div className="hero__actions">
          <button type="button" className="btn btn-primary" onClick={onCtaClick}>
            Saiba Mais
          </button>
          <a href="#produtos" className="btn btn-outline">
            Ver Produtos
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
