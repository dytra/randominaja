import React from "react"
import DefaultTemplate from "../templates/DefaultTemplate";
import MainForm from "../components/MainForm"
const Home = () => {
  return (
    <DefaultTemplate>
      <div className="columns">
        <div className="column">
          <div className="container">
            <section className="section">
              <MainForm />
            </section>
          </div>
        </div>
        <div className="column">
          <section className="section">
            {/* <div className="container"> */}
            <h1 className="title is-4">Support Kami</h1>
            <h2 className="subtitle">Support kami agar web ini tetap berjalan tanpa iklan atau monetisasi yang aneh-aneh</h2>
            <a href="https://paypal.me/dytra?locale.x=id_ID" className="button is-secondary" target="_blank" rel="noopener noreferrer">
              <span className="icon is-small">
                <i className="fab fa-paypal"></i>
              </span>
              <span>Support</span>
            </a>
            {/* </div> */}
          </section>
          {/* <p><strong>Support Kami</strong></p>
          <p>Support kami agar web ini tetap berjalan tanpa iklan atau monetisasi yang aneh-aneh</p>
          <a href="https://paypal.me/dytra?locale.x=id_ID" className="button is-secondary" target="_blank" rel="noopener noreferrer">
            <span className="icon is-small">
              <i className="fab fa-paypal"></i>
            </span>
            <span>Support</span>
          </a> */}
        </div>
      </div>
    </DefaultTemplate>
  )
}

export default Home;