import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { evaluateMathExpression } from '../api/mathApi.js'
import ColorPalette from '../components/ColorPalette.jsx'
import ShapePreview from '../components/ShapePreview.jsx'
import { getShapeById } from '../data/shapes.js'

function createInitialValues(fields = []) {
  return fields.reduce((values, field) => {
    values[field.name] = ''
    return values
  }, {})
}

function validateShapeFields(fields = [], values = {}) {
  for (const field of fields) {
    const rawValue = values[field.name]

    if (rawValue === '') {
      return 'Preencha todos os campos antes de calcular.'
    }

    const numericValue = Number(rawValue)

    if (Number.isNaN(numericValue)) {
      return `O campo ${field.label.toLowerCase()} precisa conter um numero valido.`
    }

    if (numericValue < 0) {
      return 'Nao e permitido calcular com valores negativos.'
    }
  }

  return ''
}

function getShapeExpressions(shapeId, values) {
  switch (shapeId) {
    case 'circulo':
      return {
        area: `pi * ${values.raio}^2`,
        perimeter: `2 * pi * ${values.raio}`,
      }
    case 'quadrado':
      return {
        area: `${values.lado} * ${values.lado}`,
        perimeter: `4 * ${values.lado}`,
      }
    case 'retangulo':
      return {
        area: `${values.base} * ${values.altura}`,
        perimeter: `2 * (${values.base} + ${values.altura})`,
      }
    case 'triangulo':
      return {
        area: `(${values.base} * ${values.altura}) / 2`,
        perimeter: `${values.ladoA} + ${values.ladoB} + ${values.ladoC}`,
      }
    default:
      throw new Error('A forma selecionada nao possui formulas configuradas.')
  }
}

function getFriendlyErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Nao foi possivel calcular agora. Tente novamente em instantes.'
}

function ShapeDetails() {
  const { shapeId } = useParams()
  const shape = getShapeById(shapeId)
  const [fieldValues, setFieldValues] = useState({})
  const [calculationResult, setCalculationResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setFieldValues(createInitialValues(shape?.fields))
    setCalculationResult(null)
    setErrorMessage('')
    setIsLoading(false)
  }, [shape])

  if (!shape) {
    return (
      <section className="empty-state">
        <h1 className="section-title">Forma nao encontrada</h1>
        <p className="section-copy">
          O identificador <code>{shapeId}</code> nao existe na base atual.
        </p>
        <div className="inline-actions">
          <Link className="button" to="/formas">
            Voltar para formas
          </Link>
          <Link className="button-secondary" to="/">
            Ir para a Home
          </Link>
        </div>
      </section>
    )
  }

  const shapeName = shape.nome || shape.name
  const shapeDescription = shape.descricao || shape.description
  const shapeSummary = shape.summary || shapeDescription
  const fieldValidationMessage = validateShapeFields(shape.fields, fieldValues)
  const canCalculate = !fieldValidationMessage && !isLoading

  function handleFieldChange(event) {
    const { name, value } = event.target

    setFieldValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
    setCalculationResult(null)
    setErrorMessage('')
  }

  async function handleCalculate(event) {
    event.preventDefault()

    const validationMessage = validateShapeFields(shape.fields, fieldValues)

    if (validationMessage) {
      setCalculationResult(null)
      setErrorMessage(validationMessage)
      return
    }

    setIsLoading(true)
    setErrorMessage('')
    setCalculationResult(null)

    try {
      const numericValues = Object.fromEntries(
        Object.entries(fieldValues).map(([key, value]) => [key, Number(value)])
      )

      const expressions = getShapeExpressions(shape.id, numericValues)
      const [areaResult, perimeterResult] = await Promise.all([
        evaluateMathExpression(expressions.area),
        evaluateMathExpression(expressions.perimeter),
      ])

      setCalculationResult({
        expressions,
        area: areaResult,
        perimeter: perimeterResult,
      })
    } catch (error) {
      setErrorMessage(getFriendlyErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-stack">
      <section className="content-card detail-hero">
        <div className="detail-header">
          <div>
            <span className="eyebrow">{shape.family}</span>
            <h1 className="detail-title">{shapeName}</h1>
            <p className="detail-copy">{shapeDescription}</p>
          </div>

          <div className="detail-meta">
            <span className="meta-badge">{shape.plane}</span>
            <span className="meta-badge">{shape.sides}</span>
          </div>
        </div>

        <div className="detail-preview-wrap">
          <ShapePreview
            shapeId={shape.id}
            color={shape.colorHex}
            title={`Preview da forma ${shapeName}`}
          />
        </div>
      </section>

      <section className="detail-grid">
        <article className="detail-panel">
          <h3>Visao geral</h3>
          <p>{shapeSummary}</p>

          <h3>Propriedades importantes</h3>
          <ul className="info-list">
            {shape.properties.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="shape-highlight">
            <strong>Curiosidade</strong>
            <p>{shape.curiosity}</p>
          </div>

          <ColorPalette baseHex={shape.colorHex} count={5} />
        </article>

        <article className="detail-panel">
          <h3>Calcular medidas</h3>

          <div className="formula-list">
            <div>
              <strong>Formula da area</strong>
              <p>{shape.formulaArea}</p>
            </div>
            <div>
              <strong>Formula do perimetro</strong>
              <p>{shape.formulaPerimetro}</p>
            </div>
          </div>

          <form className="calculator-form" onSubmit={handleCalculate}>
            {shape.fields.map((field) => (
              <div className="field" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || 'number'}
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={field.placeholder}
                  value={fieldValues[field.name] ?? ''}
                  onChange={handleFieldChange}
                />
              </div>
            ))}

            <button className="button" type="submit" disabled={!canCalculate}>
              {isLoading ? 'Calculando...' : 'Calcular area e perimetro'}
            </button>
          </form>

          {fieldValidationMessage && !errorMessage ? (
            <p className="status-note">{fieldValidationMessage}</p>
          ) : null}

          {errorMessage ? (
            <p className="status-note status-note-error">{errorMessage}</p>
          ) : null}

          {isLoading ? (
            <p className="status-note status-note-loading">
              Enviando as expressoes para a API e calculando os resultados...
            </p>
          ) : null}

          {calculationResult ? (
            <div className="result-grid">
              <article className="result-card">
                <span className="meta-badge">Area</span>
                <strong>{calculationResult.area.formattedResult}</strong>
                <p>Expressao: {calculationResult.expressions.area}</p>
              </article>

              <article className="result-card">
                <span className="meta-badge">Perimetro</span>
                <strong>{calculationResult.perimeter.formattedResult}</strong>
                <p>Expressao: {calculationResult.expressions.perimeter}</p>
              </article>
            </div>
          ) : null}

          <div className="inline-actions">
            <Link className="button-secondary" to="/comparar">
              Comparar com outra forma
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}

export default ShapeDetails
