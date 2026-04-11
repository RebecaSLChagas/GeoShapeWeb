import { Link } from 'react-router'
import ShapePreview from './ShapePreview.jsx'

function ShapeCard({ shape }) {
  const color = shape.colorHex || '#1F6F63'
  const name = shape.nome || shape.name
  const shortDescription = shape.summary || shape.descricao || shape.description

  return (
    <article className="shape-card" style={{ '--shape-accent': color }}>
      <div className="shape-card-header">
        <span className="shape-badge">{shape.family || 'Forma geometrica'}</span>
        <span className="shape-card-id">#{shape.id}</span>
      </div>

      <ShapePreview
        shapeId={shape.id}
        color={color}
        title={`Preview da forma ${name}`}
      />

      <div className="shape-card-copy">
        <h3>{name}</h3>
        <p>{shortDescription}</p>
      </div>

      <footer className="shape-card-footer">
        <div className="shape-card-meta">
          <span className="meta-item">{shape.plane || 'Figura plana'}</span>
          <span className="meta-item">{shape.sides || 'Medidas variaveis'}</span>
        </div>

        <Link className="button-secondary shape-card-link" to={`/formas/${shape.id}`}>
          Explorar forma
        </Link>
      </footer>
    </article>
  )
}

export default ShapeCard
