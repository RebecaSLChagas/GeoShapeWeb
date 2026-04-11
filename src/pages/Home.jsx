import { Link } from 'react-router'
import { shapes } from '../data/shapes.js'

function Home() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Projeto base com React Router</span>
          <h1 className="hero-title">GeoShape Web</h1>
          <p className="hero-copy">
            Uma base limpa e funcional para explorar formas geometricas,
            navegar por detalhes e comparar propriedades em uma aplicacao React
            criada com Vite e JavaScript.
          </p>

          <div className="hero-actions">
            <Link className="button" to="/formas">
              Explorar formas
            </Link>
            <Link className="button-secondary" to="/comparar">
              Comparar figuras
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="shape-stage">
            <span className="shape-square"></span>
            <span className="shape-circle"></span>
            <span className="shape-triangle"></span>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <strong className="stat-value">{shapes.length}</strong>
          <span className="stat-label">formas iniciais cadastradas</span>
        </article>
        <article className="stat-card">
          <strong className="stat-value">5</strong>
          <span className="stat-label">rotas prontas para evoluir</span>
        </article>
        <article className="stat-card">
          <strong className="stat-value">100%</strong>
          <span className="stat-label">estrutura em JavaScript com Vite</span>
        </article>
      </section>

      <section className="content-card">
        <div className="section-header">
          <div>
            <h2 className="section-title">Como a base esta organizada</h2>
            <p className="section-copy">
              Componentes reutilizaveis, layout compartilhado, paginas por rota
              e dados separados para facilitar manutencao.
            </p>
          </div>
        </div>

        <div className="compare-grid">
          <article className="compare-item">
            <h3>Estrutura</h3>
            <ul className="info-list">
              <li>components para Navbar, Footer e cards</li>
              <li>layout para o esqueleto global da interface</li>
              <li>pages para cada tela mapeada no roteador</li>
            </ul>
          </article>

          <article className="compare-item">
            <h3>Fluxo</h3>
            <ul className="info-list">
              <li>Home com atalhos rapidos</li>
              <li>Lista de formas com links para detalhes</li>
              <li>Tela de comparacao com seletores simples</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Home
