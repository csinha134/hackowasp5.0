import React, {useState, useEffect} from "react";
import Clients from "./components/Clients";
import Footer from "./components/Footer";
import Free from "./components/Free";
import Home from "./components/Home";
import Like from "./components/Like";
import Navbar from "./components/Navbar";
import Release from "./components/Release";
import ScrollToTop from "./components/ScrollToTop";
import Signup from "./components/Signup";
import scrollreveal from "scrollreveal";
import "./sass/index.scss";
import {revealSelectors, scrollRevealConfig, scrollRevealOptions} from "./entities/scroll-reveal";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    // function registerAnimations() {
    //   const sr = scrollreveal(scrollRevealConfig);
    //   sr.reveal(revealSelectors, scrollRevealOptions);
    // };
    // registerAnimations();
    const sr = scrollreveal(scrollRevealConfig);
    sr.reveal(revealSelectors, scrollRevealOptions);
  }, []);

  window.setTimeout(() => {
    const home = document.getElementsByClassName("home");
    (home[0] as HTMLDivElement).style.transform = "none";
    const nav = document.getElementsByTagName("nav");
    nav[0].style.transform = "none";
  }, 1500);

  return (
    <div data-theme={theme} className="app-container">
      <ScrollToTop />
      <Navbar changeTheme={changeTheme} currentTheme={theme} />
      <Home />
      <Free />
      <Clients />
      <Release />
      <Like />
      <Signup />
      <Footer />
    </div>
  );
}
