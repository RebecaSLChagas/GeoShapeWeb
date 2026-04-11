function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-copy">
          GeoShape Web organiza rotas, componentes e paginas para servir como
          base de um projeto educacional com React, Vite e JavaScript.
        </p>

        <span className="meta-badge">Base academica | {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

export default Footer
