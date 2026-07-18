import "./CtaModal.css";

function CtaModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleExplore = () => {
    onClose();
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal__icon" aria-hidden="true">🎉</div>
        <h2 id="modal-title" className="modal__title">Obrigado pelo interesse!</h2>
        <p className="modal__text">
          Ficamos felizes em ter você aqui. Explore nossos produtos e encontre
          o que precisa com os melhores preços.
        </p>
        <button type="button" className="btn btn-primary" onClick={handleExplore}>
          Ver Produtos
        </button>
      </div>
    </div>
  );
}

export default CtaModal;
