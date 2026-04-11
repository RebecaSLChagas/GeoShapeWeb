export const shapes = [
  {
    id: 'circulo',
    nome: 'Circulo',
    descricao:
      'O circulo e uma figura plana formada por todos os pontos que estao a mesma distancia do centro. Ele e muito usado para estudar medidas relacionadas ao raio, ao diametro e a circunferencia.',
    formulaArea: 'A = pi x r x r',
    formulaPerimetro: 'P = 2 x pi x r',
    colorHex: '#FF6B6B',
    fields: [
      {
        name: 'raio',
        label: 'Raio',
        type: 'number',
        placeholder: 'Informe o valor do raio',
      },
    ],
    properties: [
      'Nao possui lados retos nem vertices.',
      'Todos os pontos da borda ficam a mesma distancia do centro.',
      'O diametro mede o dobro do raio.',
      'Apresenta infinitos eixos de simetria.',
    ],
    curiosity:
      'A constante pi aparece no estudo do circulo porque relaciona a medida da circunferencia com o diametro em qualquer circulo.',
    name: 'Circulo',
    family: 'Curva fechada',
    plane: 'Figura plana',
    sides: 'Sem lados retos',
    summary:
      'Figura redonda definida pela distancia constante entre a borda e o centro.',
    description:
      'O circulo e uma figura plana formada por todos os pontos que estao a mesma distancia do centro. Ele e muito usado para estudar medidas relacionadas ao raio, ao diametro e a circunferencia.',
    formulas: {
      area: 'A = pi x r x r',
      perimeter: 'P = 2 x pi x r',
    },
    applications: ['rodas', 'moedas', 'relogios', 'pistas circulares'],
  },
  {
    id: 'quadrado',
    nome: 'Quadrado',
    descricao:
      'O quadrado e um poligono regular com quatro lados iguais e quatro angulos retos. Ele e uma das figuras mais conhecidas da geometria e serve de base para varios calculos e composicoes.',
    formulaArea: 'A = lado x lado',
    formulaPerimetro: 'P = 4 x lado',
    colorHex: '#4ECDC4',
    fields: [
      {
        name: 'lado',
        label: 'Lado',
        type: 'number',
        placeholder: 'Informe o valor do lado',
      },
    ],
    properties: [
      'Possui quatro lados com a mesma medida.',
      'Seus quatro angulos internos medem 90 graus.',
      'As diagonais tem o mesmo comprimento.',
      'As diagonais se cruzam no centro e sao perpendiculares.',
    ],
    curiosity:
      'O quadrado e considerado um caso especial de retangulo e tambem de losango, porque reune caracteristicas das duas figuras.',
    name: 'Quadrado',
    family: 'Quadrilatero regular',
    plane: 'Figura plana',
    sides: '4 lados iguais',
    summary:
      'Poligono regular com lados congruentes e angulos internos retos.',
    description:
      'O quadrado e um poligono regular com quatro lados iguais e quatro angulos retos. Ele e uma das figuras mais conhecidas da geometria e serve de base para varios calculos e composicoes.',
    formulas: {
      area: 'A = lado x lado',
      perimeter: 'P = 4 x lado',
    },
    applications: ['pisos', 'tabuleiros', 'azulejos', 'icones'],
  },
  {
    id: 'retangulo',
    nome: 'Retangulo',
    descricao:
      'O retangulo e um quadrilatero com lados opostos paralelos e de mesma medida. Seus quatro angulos sao retos, o que faz dessa figura uma das mais presentes em objetos do dia a dia.',
    formulaArea: 'A = base x altura',
    formulaPerimetro: 'P = 2 x (base + altura)',
    colorHex: '#FFD166',
    fields: [
      {
        name: 'base',
        label: 'Base',
        type: 'number',
        placeholder: 'Informe o valor da base',
      },
      {
        name: 'altura',
        label: 'Altura',
        type: 'number',
        placeholder: 'Informe o valor da altura',
      },
    ],
    properties: [
      'Possui quatro angulos internos de 90 graus.',
      'Os lados opostos sao paralelos e congruentes.',
      'As diagonais possuem a mesma medida.',
      'Quando todos os lados ficam iguais, ele se torna um quadrado.',
    ],
    curiosity:
      'Telas, folhas de papel e portas costumam ter formato retangular porque esse desenho facilita a organizacao do espaco.',
    name: 'Retangulo',
    family: 'Quadrilatero',
    plane: 'Figura plana',
    sides: '4 lados',
    summary:
      'Figura plana muito comum em objetos cotidianos e composicoes visuais.',
    description:
      'O retangulo e um quadrilatero com lados opostos paralelos e de mesma medida. Seus quatro angulos sao retos, o que faz dessa figura uma das mais presentes em objetos do dia a dia.',
    formulas: {
      area: 'A = base x altura',
      perimeter: 'P = 2 x (base + altura)',
    },
    applications: ['telas', 'livros', 'portas', 'embalagens'],
  },
  {
    id: 'triangulo',
    nome: 'Triangulo',
    descricao:
      'O triangulo e um poligono de tres lados e a figura plana mais simples entre os poligonos. Mesmo assim, ele e muito importante na geometria, na engenharia e na arquitetura.',
    formulaArea: 'A = (base x altura) / 2',
    formulaPerimetro: 'P = lado A + lado B + lado C',
    colorHex: '#A29BFE',
    fields: [
      {
        name: 'base',
        label: 'Base',
        type: 'number',
        placeholder: 'Informe o valor da base',
      },
      {
        name: 'altura',
        label: 'Altura',
        type: 'number',
        placeholder: 'Informe o valor da altura',
      },
      {
        name: 'ladoA',
        label: 'Lado A',
        type: 'number',
        placeholder: 'Informe o lado A',
      },
      {
        name: 'ladoB',
        label: 'Lado B',
        type: 'number',
        placeholder: 'Informe o lado B',
      },
      {
        name: 'ladoC',
        label: 'Lado C',
        type: 'number',
        placeholder: 'Informe o lado C',
      },
    ],
    properties: [
      'Possui tres lados e tres vertices.',
      'A soma dos angulos internos e sempre 180 graus.',
      'Pode ser classificado pelos lados ou pelos angulos.',
      'E uma estrutura muito usada por oferecer boa estabilidade.',
    ],
    curiosity:
      'Pontes, torres e telhados usam triangulos com frequencia porque essa forma distribui forcas com bastante eficiencia.',
    name: 'Triangulo',
    family: 'Poligono',
    plane: 'Figura plana',
    sides: '3 lados',
    summary:
      'Figura essencial para estudar area, classificacao e estabilidade estrutural.',
    description:
      'O triangulo e um poligono de tres lados e a figura plana mais simples entre os poligonos. Mesmo assim, ele e muito importante na geometria, na engenharia e na arquitetura.',
    formulas: {
      area: 'A = (base x altura) / 2',
      perimeter: 'P = lado A + lado B + lado C',
    },
    applications: ['telhados', 'pontes trelicadas', 'placas de sinalizacao'],
  },
]

export function getShapeById(shapeId) {
  return shapes.find((shape) => shape.id === shapeId)
}
