import './index.css'
import "./sass/index.scss";
import HomePage from './pages/Home'
import Admin from './pages/Admin';
import scrollreveal from "scrollreveal";
import {ROUTES} from './entities/routes';
import Navbar from "./components/Navbar";
import {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {revealSelectors, scrollRevealConfig, scrollRevealOptions} from "./entities/scroll-reveal";

export default function App () {
  const [theme, setTheme] = useState("dark");
  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
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
      <Navbar changeTheme={changeTheme} currentTheme={theme} />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ADMIN} element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}