import React from "react";

const DefaultTemplate = ({ children }) => {
  const [alertMessage, setAlertMessage] = React.useState();
  const handleClick = () => {
    setAlertMessage(!alertMessage);
  }

  React.useEffect(() => {
    start();
    async function start() {
      const res = await fetch("https://randominaja-backend.dytra.workers.dev/");
      const message = await res.json();
      setAlertMessage(message?.message);
    }
  }, []);
  return (

    <div className="container is-flex pt-3" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100%' }}>
      <header className="container" style={{ width: "100%" }} >
        {alertMessage && (
          <section className="panel is-flex has-background-success container is-fullwidth pl-3 pt-1 pr-2 pb-1" style={{
            width: "100%",
            alignItems: "center",
          }}>
            <p className="has-text-white" style={{
              textAlign: "center",
              width: "100%"
            }} dangerouslySetInnerHTML={{ __html: alertMessage }}></p>
            <button
              onClick={handleClick}
              style={{
                marginLeft: "auto",
                background: "transparent",
                border: "none",
                cursor: "pointer"
              }} ><i className="fas fa-times has-text-white" /></button>
          </section>
        )}

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