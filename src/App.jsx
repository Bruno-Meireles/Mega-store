import { useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import Contact from "./components/Contact/Contact";
import CtaModal from "./components/CtaModal/CtaModal";
import Footer from "./components/Footer/Footer";

function App() {
  const [showCtaModal, setShowCtaModal] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Hero onCtaClick={() => setShowCtaModal(true)} />
        <Products />
        <Contact />
      </main>
      <Footer />
      <CtaModal isOpen={showCtaModal} onClose={() => setShowCtaModal(false)} />
    </>
  );
}

export default App;
