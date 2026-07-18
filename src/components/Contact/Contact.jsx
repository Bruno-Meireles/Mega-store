import { useState } from "react";
import { fetchAddressByCep } from "../../services/api";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", cep: "", message: "" });
  const [address, setAddress] = useState(null);
  const [cepError, setCepError] = useState(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepSearch = async () => {
    setCepLoading(true);
    setCepError(null);
    setAddress(null);

    try {
      const data = await fetchAddressByCep(form.cep);
      setAddress(data);
    } catch (err) {
      setCepError(err.message);
    } finally {
      setCepLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage(
      `Obrigado, ${form.name}! Recebemos sua mensagem e entraremos em contato em ${form.email}.`
    );
    setForm({ name: "", email: "", cep: "", message: "" });
    setAddress(null);
  };

  return (
    <section id="contato" className="section contact">
      <div className="container">
        <h2 className="section-title">Sobre & Contato</h2>
        <p className="section-subtitle">
          Fale conosco ou consulte seu CEP com a API ViaCEP
        </p>

        <div className="contact__grid">
          <div className="contact__info">
            <h3>Quem somos</h3>
            <p>
              A Mega Store nasceu com a missão de oferecer produtos de qualidade
              com a melhor experiência de compra online.
            </p>
            <p>
              Atendemos todo o Brasil com entregas rápidas e suporte dedicado.
            </p>
            <p><strong>E-mail:</strong> contato@megastore.com.br</p>
            <p><strong>Telefone:</strong> (11) 99999-0000</p>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="contact__cep-row">
              <div className="form-group">
                <label htmlFor="cep">CEP</label>
                <input
                  id="cep"
                  name="cep"
                  type="text"
                  value={form.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  maxLength={9}
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCepSearch}
                disabled={cepLoading}
              >
                {cepLoading ? "Buscando..." : "Buscar CEP"}
              </button>
            </div>

            {cepError && <p className="alert alert-error">{cepError}</p>}

            {address && (
              <div className="contact__address">
                {address.logradouro}, {address.bairro} — {address.localidade}/{address.uf}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Como podemos ajudar?"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar Mensagem
            </button>

            {submitMessage && (
              <p className="alert alert-success">{submitMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
