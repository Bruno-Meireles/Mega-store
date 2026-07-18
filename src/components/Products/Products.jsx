import { useEffect, useState } from "react";
import { BRL_RATE, formatPrice, useCart } from "../../context/CartContext";
import { fetchProducts } from "../../services/api";
import "./Products.css";

function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts(16);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="produtos" className="section">
      <div className="container">
        <h2 className="section-title">Nossos Produtos</h2>
        <p className="section-subtitle">
          Catálogo 
        </p>

        {loading && (
          <p className="products__status">Carregando produtos...</p>
        )}

        {error && (
          <div className="products__status products__status--error">
            <p>{error}</p>
            <button type="button" className="btn btn-primary products__retry" onClick={loadProducts}>
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="products__grid">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-card__image">
                  <img src={product.image} alt={product.title} loading="lazy" />
                </div>
                <div className="product-card__body">
                  <span className="product-card__category">{product.category}</span>
                  <h3 className="product-card__title">{product.title}</h3>
                  <p className="product-card__price">
                    {formatPrice(product.price * BRL_RATE)}
                  </p>
                  <button
                    type="button"
                    className={`btn btn-primary product-card__add ${
                      addedId === product.id ? "product-card__add--added" : ""
                    }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedId === product.id ? "Adicionado!" : "Adicionar ao carrinho"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
