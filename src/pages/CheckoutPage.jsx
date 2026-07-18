import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, useCart } from "../context/CartContext";
import { fetchAddressByCep } from "../services/api";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", cep: "" });
  const [address, setAddress] = useState(null);
  const [cepError, setCepError] = useState(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

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

    if (!address) {
      setCepError("Busque um CEP válido antes de finalizar.");
      return;
    }

    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <section className="checkout checkout--success">
        <div className="container">
          <h1>Pedido confirmado!</h1>
          <p>
            Obrigado, {form.name}! Enviaremos a confirmação para{" "}
            <strong>{form.email}</strong>.
          </p>
          <p>
            Entrega em: {address.logradouro}, {address.bairro} —{" "}
            {address.localidade}/{address.uf} (CEP {address.cep})
          </p>
          <Link to="/" className="btn btn-primary">
            Voltar à loja
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="checkout checkout--empty">
        <div className="container">
          <h1 className="section-title">Carrinho vazio</h1>
          <p>Adicione produtos antes de finalizar a compra.</p>
          <Link to="/" state={{ scrollTo: "produtos" }} className="btn btn-primary">
            Ver produtos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout">
      <div className="container">
        <Link to="/" className="checkout__back">
          ← Voltar à loja
        </Link>

        <h1 className="section-title">Finalizar compra</h1>
        <p className="section-subtitle">
          Preencha seus dados e confirme o endereço de entrega
        </p>

        <div className="checkout__grid">
          <div className="checkout__form-card">
            <h2>Dados de entrega</h2>
            <p className="checkout__subtitle">
              Informe nome, e-mail e CEP para buscar o endereço via ViaCEP
            </p>

            <form className="checkout__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="checkout-name">Nome</label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkout-email">E-mail</label>
                <input
                  id="checkout-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div className="checkout__cep-row">
                <div className="form-group">
                  <label htmlFor="checkout-cep">CEP</label>
                  <input
                    id="checkout-cep"
                    name="cep"
                    type="text"
                    value={form.cep}
                    onChange={handleChange}
                    required
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
                <div className="checkout__address">
                  <strong>Endereço encontrado:</strong>
                  <br />
                  {address.logradouro}, {address.bairro}
                  <br />
                  {address.localidade} — {address.uf}
                  <br />
                  CEP {address.cep}
                </div>
              )}

              <button type="submit" className="btn btn-primary">
                Confirmar pedido
              </button>
            </form>
          </div>

          <aside className="checkout__summary">
            <h2>Resumo do pedido</h2>
            <p className="checkout__subtitle">{items.length} item(ns) no carrinho</p>

            <ul className="checkout__summary-list">
              {items.map((item) => (
                <li key={item.id} className="checkout__summary-item">
                  <div className="checkout__summary-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="checkout__summary-info">
                    <p className="checkout__summary-title">{item.title}</p>
                    <span className="checkout__summary-qty">Qtd: {item.quantity}</span>
                  </div>
                  <span className="checkout__summary-price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="checkout__total">
              <span>Total</span>
              <span className="checkout__total-value">{formatPrice(totalPrice)}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
