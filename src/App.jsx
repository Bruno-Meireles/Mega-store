import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import CtaModal from "./components/CtaModal/CtaModal";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const [showCtaModal, setShowCtaModal] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage onCtaClick={() => setShowCtaModal(true)} />}
            />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <Footer />
        <Cart />
        <CtaModal isOpen={showCtaModal} onClose={() => setShowCtaModal(false)} />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
