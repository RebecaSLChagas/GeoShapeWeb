import { Link } from 'react-router'

function NotFound() {
  return (
    <section className="not-found">
      <span className="not-found-code">404</span>
      <h1 className="not-found-title">Pagina nao encontrada</h1>
      <p className="section-copy">
        A rota acessada nao existe nesta base do GeoShape Web.
      </p>

      <div className="inline-actions">
        <Link className="button" to="/">
          Voltar para a Home
        </Link>
        <Link className="button-secondary" to="/formas">
          Ver formas
        </Link>
      </div>
    </section>
  )
}

export default NotFound
