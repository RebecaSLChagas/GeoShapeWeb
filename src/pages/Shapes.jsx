import ShapeCard from '../components/ShapeCard.jsx'
import { shapes } from '../data/shapes.js'

function Shapes() {
  return (
    <section className="content-card">
      <div className="section-header">
        <div>
          <h1 className="section-title">Formas geometricas</h1>
          <p className="section-copy">
            Uma colecao inicial de figuras para navegar pelos detalhes da rota
            dinamica.
          </p>
        </div>

        <span className="meta-badge">{shapes.length} itens</span>
      </div>

      <div className="shape-grid">
        {shapes.map((shape) => (
          <ShapeCard key={shape.id} shape={shape} />
        ))}
      </div>
    </section>
  )
}

export default Shapes
