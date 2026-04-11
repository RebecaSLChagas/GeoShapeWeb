import { useId } from 'react'

function getShapeElement(shapeId, color) {
  const commonShapeProps = {
    fill: `${color}22`,
    stroke: color,
    strokeWidth: 6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  switch (shapeId) {
    case 'quadrado':
      return <rect x="44" y="24" width="72" height="72" rx="16" {...commonShapeProps} />
    case 'retangulo':
      return <rect x="24" y="34" width="112" height="52" rx="16" {...commonShapeProps} />
    case 'triangulo':
      return (
        <path
          d="M80 20 L128 98 H32 Z"
          {...commonShapeProps}
        />
      )
    case 'circulo':
    default:
      return <circle cx="80" cy="60" r="34" {...commonShapeProps} />
  }
}

function ShapePreview({ shapeId, color = '#1F6F63', title = 'Preview da forma' }) {
  const previewId = useId()
  const gradientId = `${previewId}-gradient`
  const patternId = `${previewId}-pattern`

  return (
    <div className="shape-preview" aria-hidden="true">
      <svg
        className="shape-preview-svg"
        viewBox="0 0 160 120"
        role="img"
        aria-labelledby={`${previewId}-title`}
      >
        <title id={`${previewId}-title`}>{title}</title>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`${color}20`} />
            <stop offset="100%" stopColor={`${color}05`} />
          </linearGradient>
          <pattern
            id={patternId}
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.25" fill={`${color}24`} />
          </pattern>
        </defs>

        <rect x="8" y="8" width="144" height="104" rx="26" fill={`url(#${gradientId})`} />
        <rect x="8" y="8" width="144" height="104" rx="26" fill={`url(#${patternId})`} />
        <circle cx="126" cy="28" r="18" fill={`${color}10`} />
        <circle cx="36" cy="94" r="12" fill={`${color}12`} />
        {getShapeElement(shapeId, color)}
      </svg>
    </div>
  )
}

export default ShapePreview
