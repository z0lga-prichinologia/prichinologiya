import { useState, useEffect, useRef } from 'react';

const InteractiveGraph = ({ events, onNodeClick }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const svgRef = useRef(null);

  // Позиционирование узлов в круге
  const centerX = 350;
  const centerY = 250;
  const radius = 150;

  const positionedEvents = events.map((event, index) => {
    const angle = (index / events.length) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { ...event, x, y };
  });

  const handleNodeClick = (event) => {
    setSelectedNode(selectedNode?.id === event.id ? null : event);
    if (onNodeClick) onNodeClick(event);
  };

  const handleNodeMouseEnter = (event) => {
    setHoveredNode(event);
  };

  const handleNodeMouseLeave = () => {
    setHoveredNode(null);
  };

  return (
    <div className="relative w-full" style={{ height: '500px', backgroundColor: 'black', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
      <svg 
        ref={svgRef}
        width="700" 
        height="500" 
        style={{ borderRadius: '0.75rem' }}
        viewBox="0 0 700 500"
      >
        {/* Соединительные линии между связанными событиями */}
        {positionedEvents.map((event, i) => 
          event.causes?.map(causeId => {
            const causeEvent = positionedEvents.find(e => e.id === causeId);
            if (causeEvent) {
              return (
                <line
                  key={`line-${event.id}-${causeId}`}
                  x1={causeEvent.x}
                  y1={causeEvent.y}
                  x2={event.x}
                  y2={event.y}
                  stroke="#444"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            }
            return null;
          })
        )}

        {/* Определение стрелки */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#444" />
          </marker>
        </defs>

        {/* Узлы событий */}
        {positionedEvents.map((event) => (
          <g key={event.id}>
            {/* Внешний круг для hover эффекта */}
            <circle
              cx={event.x}
              cy={event.y}
              r={hoveredNode?.id === event.id ? 45 : 40}
              fill="transparent"
              stroke={hoveredNode?.id === event.id ? "#fff" : "transparent"}
              strokeWidth="2"
              opacity={hoveredNode?.id === event.id ? 0.3 : 0}
              style={{ transition: 'all 0.2s ease' }}
            />
            
            {/* Основной узел */}
            <circle
              cx={event.x}
              cy={event.y}
              r={selectedNode?.id === event.id ? 35 : 30}
              fill={event.color}
              stroke={selectedNode?.id === event.id ? "#fff" : "transparent"}
              strokeWidth={selectedNode?.id === event.id ? "3" : "0"}
              className="cursor-pointer"
              style={{ 
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => handleNodeClick(event)}
              onMouseEnter={() => handleNodeMouseEnter(event)}
              onMouseLeave={handleNodeMouseLeave}
            />
            
            {/* Текст узла */}
            <text
              x={event.x}
              y={event.y + 5}
              fill="white"
              fontSize="12"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              textAnchor="middle"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {event.id}
            </text>
          </g>
        ))}
      </svg>

      {/* Всплывающая подсказка */}
      {hoveredNode && (
        <div 
          className="absolute bg-white text-black p-4 rounded-lg shadow-lg"
          style={{
            maxWidth: '16rem',
            zIndex: 10,
            left: Math.min(hoveredNode.x + 50, 650),
            top: Math.min(hoveredNode.y - 50, 400),
            transform: 'translateY(-50%)'
          }}
        >
          <h3 className="font-bold text-sm mb-2">{hoveredNode.id}</h3>
          <p className="text-xs text-gray-500 mb-2">{hoveredNode.date}</p>
          <p className="text-xs">{hoveredNode.description}</p>
          <div className="mt-2">
            <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded">
              {hoveredNode.group}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveGraph; 