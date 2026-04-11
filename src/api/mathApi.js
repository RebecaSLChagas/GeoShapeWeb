const MATH_API_URL = 'https://api.mathjs.org/v4/'

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 6,
})

function formatMathResult(result) {
  const numericResult = Number(result)

  if (Number.isFinite(numericResult)) {
    return numberFormatter.format(numericResult)
  }

  return String(result).trim()
}

export async function evaluateMathExpression(expression, options = {}) {
  const sanitizedExpression = String(expression ?? '').trim()
  const precision = options.precision ?? 14

  if (!sanitizedExpression) {
    throw new Error('Informe uma expressao matematica valida para calcular.')
  }

  let response

  try {
    response = await fetch(MATH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expr: sanitizedExpression,
        precision,
      }),
    })
  } catch {
    throw new Error(
      'Nao foi possivel conectar ao servico de calculo. Verifique sua conexao e tente novamente.'
    )
  }

  let payload

  try {
    payload = await response.json()
  } catch {
    throw new Error(
      'O servico de calculo respondeu em um formato invalido. Tente novamente em instantes.'
    )
  }

  if (!response.ok || payload?.error) {
    const apiMessage =
      typeof payload?.error === 'string' && payload.error.trim()
        ? payload.error.trim()
        : 'A expressao informada nao pode ser processada no momento.'

    throw new Error(`Nao foi possivel concluir o calculo. ${apiMessage}`)
  }

  if (typeof payload?.result !== 'string' || !payload.result.trim()) {
    throw new Error('A API nao retornou um resultado valido para esta expressao.')
  }

  return {
    expression: sanitizedExpression,
    rawResult: payload.result,
    formattedResult: formatMathResult(payload.result),
  }
}
