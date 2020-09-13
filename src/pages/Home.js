import React, { useState } from "react"
import DefaultTemplate from "../templates/DefaultTemplate";
import MainForm from "../components/MainForm"
const Home = () => {
  const LANGUAGE = 'id';
  const SUPPORT_LINK = LANGUAGE === 'id' ? 'https://saweria.co/dytraio' : 'https://saweria.co/dytraio';
  const SUPPORT_ICON = LANGUAGE === 'id' ? 'fas fa-money-bill-wave' : 'fab fa-paypal';
  const [winner, setWinner] = useState();
  return (
    <DefaultTemplate>
      <div className="columns">
        <div className="column">
          <div className="container">
            <section className="section">
              <MainForm winner={winner} setWinner={setWinner} />
            </section>
          </div>
        </div>
        {!winner && (

          <div className="column">
            <section className="section">
              <h1 className="title is-4">Support Kami</h1>
              <h2 className="subtitle">Support kami agar web ini tetap berjalan dengan gratis tanpa iklan atau monetisasi yang aneh-aneh.</h2>
              <a href={SUPPORT_LINK} className="button is-secondary" target="_blank" rel="noopener noreferrer">
                <span className="icon is-small">
                  <i className={SUPPORT_ICON}></i>
                </span>
                <span>Support</span>
              </a>
            </section>

          </div>
        )}
      </div>
    </DefaultTemplate>
  )
}

export default Home;