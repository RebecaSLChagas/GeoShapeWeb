import { useEffect, useState } from 'react'
import { fetchColorScheme } from '../api/colorApi.js'

function getFallbackPalette(baseHex) {
  const safeHex = baseHex || '#1F6F63'

  return [
    { id: `${safeHex}-1`, name: 'Cor base', hex: safeHex },
    { id: `${safeHex}-2`, name: 'Tonalidade suave', hex: '#F3E6D3' },
    { id: `${safeHex}-3`, name: 'Apoio quente', hex: '#D58936' },
    { id: `${safeHex}-4`, name: 'Verde profundo', hex: '#1F6F63' },
  ]
}

function ColorPalette({ baseHex, count = 5, mode = 'analogic' }) {
  const [palette, setPalette] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    async function loadPalette() {
      setIsLoading(true)
      setErrorMessage('')
      setPalette(null)

      try {
        const data = await fetchColorScheme(baseHex, {
          count,
          mode,
          signal: abortController.signal,
        })

        setPalette(data)
      } catch (error) {
        if (error?.name === 'AbortError') {
          return
        }

        setErrorMessage(
          error instanceof Error && error.message
            ? error.message
            : 'Nao foi possivel carregar a paleta agora.'
        )
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadPalette()

    return () => abortController.abort()
  }, [baseHex, count, mode])

  const fallbackColors = getFallbackPalette(baseHex)

  return (
    <section className="color-palette-panel">
      <div className="color-palette-header">
        <div>
          <span className="eyebrow">Paleta de cores</span>
          <h3>Cores derivadas da forma</h3>
        </div>

        <span className="meta-badge">{baseHex}</span>
      </div>

      {isLoading ? (
        <p className="status-note status-note-loading">
          Buscando combinacoes de cores na The Color API...
        </p>
      ) : null}

      {errorMessage ? (
        <div className="color-palette-fallback">
          <p className="status-note status-note-error">{errorMessage}</p>
          <div className="color-swatch-grid">
            {fallbackColors.map((color) => (
              <article className="color-swatch-card" key={color.id}>
                <div
                  className="color-swatch-sample"
                  style={{ backgroundColor: color.hex }}
                />
                <strong>{color.name}</strong>
                <span>{color.hex}</span>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {!isLoading && !errorMessage && palette ? (
        <div className="color-swatch-grid">
          {palette.colors.map((color) => (
            <article className="color-swatch-card" key={color.id}>
              <div
                className="color-swatch-sample"
                style={{ backgroundColor: color.hex }}
              />
              <strong>{color.name}</strong>
              <span>{color.hex}</span>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default ColorPalette
