const COLOR_API_BASE_URL = 'https://www.thecolorapi.com/scheme'

function sanitizeHex(hex) {
  return String(hex ?? '')
    .trim()
    .replace(/^#/, '')
    .toLowerCase()
}

function isValidHex(hex) {
  return /^[0-9a-f]{6}$/i.test(hex) || /^[0-9a-f]{3}$/i.test(hex)
}

function normalizeHex(hex) {
  const sanitizedHex = sanitizeHex(hex)

  if (!isValidHex(sanitizedHex)) {
    throw new Error('A cor informada nao e um hexadecimal valido.')
  }

  if (sanitizedHex.length === 3) {
    return sanitizedHex
      .split('')
      .map((char) => `${char}${char}`)
      .join('')
  }

  return sanitizedHex
}

export async function fetchColorScheme(
  baseHex,
  { mode = 'analogic', count = 5, signal } = {}
) {
  const normalizedHex = normalizeHex(baseHex)
  const schemeCount = Math.min(Math.max(Number(count) || 5, 4), 5)
  const url = new URL(COLOR_API_BASE_URL)

  url.searchParams.set('hex', normalizedHex)
  url.searchParams.set('mode', mode)
  url.searchParams.set('count', String(schemeCount))

  let response

  try {
    response = await fetch(url.toString(), { signal })
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error
    }

    throw new Error(
      'Nao foi possivel buscar a paleta de cores. Verifique sua conexao e tente novamente.'
    )
  }

  if (!response.ok) {
    throw new Error(
      'O servico de cores nao respondeu como esperado. Tente novamente em instantes.'
    )
  }

  let payload

  try {
    payload = await response.json()
  } catch {
    throw new Error('A resposta da API de cores veio em um formato invalido.')
  }

  if (!Array.isArray(payload?.colors) || payload.colors.length === 0) {
    throw new Error('A API de cores nao retornou uma paleta valida.')
  }

  return {
    mode: payload.mode || mode,
    seed: {
      name: payload.seed?.name?.value || 'Cor base',
      hex: payload.seed?.hex?.value || `#${normalizedHex.toUpperCase()}`,
      rgb: payload.seed?.rgb?.value || '',
    },
    colors: payload.colors.slice(0, schemeCount).map((color, index) => ({
      id: color.hex?.clean || `${normalizedHex}-${index}`,
      name: color.name?.value || `Cor ${index + 1}`,
      hex: color.hex?.value || `#${normalizedHex.toUpperCase()}`,
      cleanHex: color.hex?.clean || normalizedHex.toUpperCase(),
      rgb: color.rgb?.value || '',
      contrast: color.contrast?.value || '',
    })),
  }
}
