import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Products from "../components/Products/Products";
import Contact from "../components/Contact/Contact";

function HomePage({ onCtaClick }) {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;

    if (sectionId) {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <Hero onCtaClick={onCtaClick} />
      <Products />
      <Contact />
    </>
  );
}

export default HomePage;
