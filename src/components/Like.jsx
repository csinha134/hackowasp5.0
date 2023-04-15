import React from "react";
import eth1 from "../assets/eth1.png";
import eth2 from "../assets/eth2.png";
import fc from "../assets/filecoin.png"
import lc from "../assets/lock.png";

export default function Like() {
  return (
    <div className="like">
      <div className="container">
        <div className="content">
          <div className="image">
            <img src={eth1} alt="eth1" />
          </div>
          <h2 className="title">A Data monetization partnerships</h2>
          <p className="description">
          The platform could partner with companies who are interested in purchasing access to the datasets created on the platform. By providing a trusted and decentralized source of data, the DAO could become a valuable partner for businesses
          </p>
        </div>
        <div className="content">
          <div className="image">
            <img src={eth2} alt="eth2" />
          </div>
          <h2 className="title">Social impact partnerships</h2>
          <p className="description">
          he platform could partner with organizations focused on social impact or research, such as non- profits, academic institutions, or government agencies. These partners could leverage the unique datasets created on the platform to inform policy decisions or drive social change.
          </p>
        </div>
        <div className="content">
          <div className="image">
            <img src={fc} alt="eth2" width={"80rem"} />
          </div>
          <h2 className="title">Freemium model</h2>
          <p className="description">
          Basic access to the market is free, but users pay for premium features or services. This can help attract a larger user base and create upsell opportunities.
          </p>
        </div>
        <div className="content">
          <div className="image">
            <img src={lc} alt="lc" width={"80rem"}/>
          </div>
          <h2 className="title">Data resale model</h2>
          <p className="description">
          The platform purchases data from the contributors and resells it to interested parties. This could create a new revenue stream but may raise ethical concerns around data privacy and the platform's relationship with its users.
          </p>
        </div>
      </div>
    </div>
  );
}
