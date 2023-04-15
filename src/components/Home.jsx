import React from "react";
import home from "../assets/home.png";
export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="content">
          <p className="sub-title"></p>
          <h1 className="title">Decentralize your data, fortify your security.</h1>
          <p className="description">
          Community sourcing, DeFi, and decentralized governance to boost data marketplace value.
          </p>
          <div>
          <button>
           Sign Up</button>
          &nbsp;&nbsp;&nbsp;
          <button>Wallet</button>
          </div>
        </div>
        <div className="image-container">
          <div className="image">
            <img src={home}
            width={"500rem"} alt="home image" />
          </div>
          <div className="ellipse-container">
            <div className="ellipse pink"></div>
            <div className="ellipse orange"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
