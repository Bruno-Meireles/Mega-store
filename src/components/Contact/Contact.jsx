import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage(
      `Obrigado, ${form.name}! Recebemos sua mensagem e entraremos em contato em ${form.email}.`
    );
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contato" className="section contact">
      <div className="container">


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
              <h3>Fale conosco</h3>
              <p>
                Fale conosco — tire dúvidas ou envie sugestões
              </p>
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
