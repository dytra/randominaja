import React from "react";

const DefaultTemplate = ({ children }) => {
  return (

    <div className="container is-flex pt-3" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100%' }}>
      <header >
        <section className="section">
          <h1 className="title">Acakin</h1>
          <p className="subtitle">acakin apa aja yang kamu mau</p>
        </section>
      </header>

      <main style={{ width: '100%' }}>
        {children}
      </main>

      <footer className="footer" style={{ marginTop: 'auto', width: '100%' }}>
        <div className="content has-text-centered">
          <p>
            <strong>acakin</strong> by <a href="https://dytra.github.io" target="_blank" rel="noopener noreferrer">dytra</a>. All rights reserved
    </p>
        </div>
      </footer>
    </div>
  )
}

export default DefaultTemplate;