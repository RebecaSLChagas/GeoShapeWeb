import { useState } from 'react'
import ShapePreview from '../components/ShapePreview.jsx'
import { shapes } from '../data/shapes.js'

function CompareShapePanel({ shape, label }) {
  const shapeName = shape.nome || shape.name

  return (
    <article
      className="compare-shape-card"
      style={{ '--compare-accent': shape.colorHex || '#1F6F63' }}
    >
      <div className="compare-shape-header">
        <div>
          <span className="shape-badge">{label}</span>
          <h2>{shapeName}</h2>
        </div>

        <span className="meta-badge">{shape.family}</span>
      </div>

      <ShapePreview
        shapeId={shape.id}
        color={shape.colorHex}
        title={`Preview da forma ${shapeName}`}
      />

      <div className="compare-shape-section">
        <strong>Formula da area</strong>
        <p>{shape.formulaArea}</p>
      </div>

      <div className="compare-shape-section">
        <strong>Formula do perimetro</strong>
        <p>{shape.formulaPerimetro}</p>
      </div>

      <div className="compare-shape-section">
        <strong>Propriedades principais</strong>
        <ul className="info-list compare-shape-list">
          {shape.properties.map((property) => (
            <li key={property}>{property}</li>
          ))}
        </ul>
      </div>

      <div className="compare-shape-section compare-shape-curiosity">
        <strong>Curiosidade</strong>
        <p>{shape.curiosity}</p>
      </div>
    </article>
  )
}

function Compare() {
  const [leftShapeId, setLeftShapeId] = useState(shapes[0].id)
  const [rightShapeId, setRightShapeId] = useState(shapes[1].id)

  const leftShape = shapes.find((shape) => shape.id === leftShapeId) || shapes[0]
  const rightShape = shapes.find((shape) => shape.id === rightShapeId) || shapes[1]

  return (
    <section className="compare-panel compare-page">
      <div className="section-header">
        <div>
          <h1 className="section-title">Comparar formas</h1>
          <p className="section-copy">
            Escolha duas figuras geometricas para analisar formulas,
            propriedades e detalhes visuais lado a lado.
          </p>
        </div>
      </div>

      <div className="compare-controls compare-page-controls">
        <div className="field">
          <label htmlFor="left-shape">Forma da coluna esquerda</label>
          <select
            id="left-shape"
            value={leftShapeId}
            onChange={(event) => setLeftShapeId(event.target.value)}
          >
            {shapes.map((shape) => (
              <option key={shape.id} value={shape.id}>
                {shape.nome || shape.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="right-shape">Forma da coluna direita</label>
          <select
            id="right-shape"
            value={rightShapeId}
            onChange={(event) => setRightShapeId(event.target.value)}
          >
            {shapes.map((shape) => (
              <option key={shape.id} value={shape.id}>
                {shape.nome || shape.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="compare-grid compare-shape-grid">
        <CompareShapePanel label="Forma A" shape={leftShape} />
        <CompareShapePanel label="Forma B" shape={rightShape} />
      </div>
    </section>
  )
}

export default Compare
