
import Link from "next/link"
import { useEffect, useState } from "react"

export default function BetaDemoPage() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && document) {
      const timer = setTimeout(() => setIsReady(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const nodes = [
    { x: 200, y: 150, label: "SVO", color: "#00ffaa" },
    { x: 400, y: 300, label: "BRICS", color: "#ffaa00" },
    { x: 300, y: 100, label: "Sanctions", color: "#ff0077" },
    { x: 500, y: 200, label: "Resources", color: "#00aaff" }
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-12 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-4 text-center">
        CauseMap Beta Preview
      </h2>

      <p className="text-center text-neutral-400 max-w-2xl mb-12">
        This is a conceptual demo showing how interconnected global events might appear in CauseMap. Click on nodes to explore event connections.
      </p>

      <div className="w-full max-w-5xl h-[500px] bg-black rounded-xl shadow-lg flex items-center justify-center">
        <svg width="700" height="450" className="rounded-xl">
          {nodes.map((node, i) => (
            nodes.slice(i + 1).map((target, j) => (
              <line
                key={`line-${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke="#888"
                strokeWidth="1"
              />
            ))
          ))}

          {nodes.map((node, i) => (
            <g key={`node-${i}`}>
              <circle cx={node.x} cy={node.y} r="30" fill={node.color} />
              <text
                x={node.x}
                y={node.y + 5}
                fill="white"
                fontSize="14"
                fontFamily="Helvetica"
                textAnchor="middle"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {!isReady && <p className="mt-4 text-sm text-neutral-500">Loading visualization...</p>}

      <Link href="/" passHref legacyBehavior>
        <a className="mt-12 inline-block px-6 py-3 bg-white text-black font-semibold rounded-2xl shadow hover:bg-neutral-200">
          Back to Home
        </a>
      </Link>
    </div>
  )
}
