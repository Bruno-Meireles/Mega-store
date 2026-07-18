import { useNavigate } from "react-router-dom";
import { formatPrice, useCart } from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const {
    items,
    isOpen,
    totalPrice,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} role="presentation" />

      <aside className="cart" aria-label="Carrinho de compras">
        <div className="cart__header">
          <h2 className="cart__title">Carrinho</h2>
          <button
            type="button"
            className="cart__close"
            onClick={closeCart}
            aria-label="Fechar carrinho"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart__empty">
            <p>Seu carrinho está vazio.</p>
            <button type="button" className="btn btn-primary" onClick={closeCart}>
              Ver produtos
            </button>
          </div>
        ) : (
          <>
            <ul className="cart__items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-item__info">
                    <p className="cart-item__title">{item.title}</p>
                    <p className="cart-item__price">{formatPrice(item.price)}</p>
                    <div className="cart-item__actions">
                      <button
                        type="button"
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Diminuir quantidade"
                      >
                        −
                      </button>
                      <span className="cart-item__qty">{item.quantity}</span>
                      <button
                        type="button"
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart__footer">
              <div className="cart__total">
                <span>Total</span>
                <span className="cart__total-value">{formatPrice(totalPrice)}</span>
              </div>
              <button
                type="button"
                className="btn btn-primary cart__checkout"
                onClick={handleCheckout}
              >
                Finalizar compra
              </button>
              <button
                type="button"
                className="btn cart__clear"
                onClick={clearCart}
              >
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;
