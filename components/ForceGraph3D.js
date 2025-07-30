import { useRef, useCallback, useState, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import { graphData, EVENT_CATEGORIES } from '../data/graphData';

const ForceGraph3DComponent = ({ onNodeClick, selectedNode, filteredCategory }) => {
  const fgRef = useRef();
  const [graphDataState, setGraphDataState] = useState(graphData);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Filter data based on category
  useEffect(() => {
    if (filteredCategory && filteredCategory !== 'ALL') {
      const filteredNodes = graphData.nodes.filter(node => node.category === filteredCategory);
      const filteredLinks = graphData.links.filter(link => {
        const sourceNode = graphData.nodes.find(n => n.id === link.source);
        const targetNode = graphData.nodes.find(n => n.id === link.target);
        return sourceNode?.category === filteredCategory && targetNode?.category === filteredCategory;
      });
      setGraphDataState({ nodes: filteredNodes, links: filteredLinks });
    } else {
      setGraphDataState(graphData);
    }
  }, [filteredCategory]);

  // Handle node click
  const handleNodeClick = useCallback((node) => {
    onNodeClick(node);
    
    // Zoom to node
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
    
    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
      node,
      3000
    );
  }, [onNodeClick]);

  // Handle node hover
  const handleNodeHover = useCallback((node) => {
    setHoveredNode(node);
  }, []);

  // Handle node right click
  const handleNodeRightClick = useCallback((node) => {
    // Prevent default context menu
    event.preventDefault();
    
    // Additional actions can be added here
    console.log('Right clicked node:', node);
  }, []);

  // Auto-rotate camera
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.cameraPosition({ z: 1000 });
    }
  }, []);

  return (
    <div className="w-full h-full relative">
      <ForceGraph3D
        ref={fgRef}
        graphData={graphDataState}
        nodeLabel={(node) => `
          <div class="bg-black/90 text-white p-3 rounded-lg border border-gray-600">
            <div class="font-bold text-lg">${node.name}</div>
            <div class="text-sm text-gray-300">${node.date}</div>
            <div class="text-xs text-gray-400">Важность: ${node.importance}%</div>
            <div class="text-xs text-gray-400">${EVENT_CATEGORIES[node.category]?.name}</div>
          </div>
        `}
        nodeColor={(node) => EVENT_CATEGORIES[node.category]?.color || '#666'}
        nodeVal={(node) => {
          const minSize = 4;
          const maxSize = 96;
          // Вычисляем min и max importance по всем узлам
          const importances = graphDataState.nodes.map(n => n.importance);
          const minImp = Math.min(...importances);
          const maxImp = Math.max(...importances);
          const norm = maxImp === minImp ? 1 : (node.importance - minImp) / (maxImp - minImp);
          return minSize + Math.pow(norm, 1.5) * (maxSize - minSize);
        }}
        linkColor={() => '#fff'}
        linkWidth={3}
        linkOpacity={0.9}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onNodeRightClick={handleNodeRightClick}
        backgroundColor="#0D0D0D"
        showNavInfo={false}
        enableNodeDrag={true}
        enableNavigationControls={true}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.1}
        cooldownTicks={100}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.name);
          sprite.color = '#fff';
          sprite.textHeight = 8;
          sprite.visible = hoveredNode === node || selectedNode?.id === node.id;
          return sprite;
        }}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleColor={() => '#fff'}
      />
      
      {/* Hover info */}
      {hoveredNode && (
        <div className="absolute top-4 left-4 bg-black/90 text-white p-4 rounded-lg border border-gray-600 max-w-xs z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{EVENT_CATEGORIES[hoveredNode.category]?.icon}</span>
            <span className="font-bold">{hoveredNode.name}</span>
          </div>
          <div className="text-sm text-gray-300 mb-1">{hoveredNode.date}</div>
          <div className="text-xs text-gray-400 mb-2">{hoveredNode.description}</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: EVENT_CATEGORIES[hoveredNode.category]?.color }}></div>
            <span className="text-xs">{EVENT_CATEGORIES[hoveredNode.category]?.name}</span>
            <span className="text-xs text-gray-400 ml-auto">Важность: {hoveredNode.importance}%</span>
          </div>
        </div>
      )}
      
      {/* Controls info */}
      <div className="absolute bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs">
        <div>🖱️ Перетащите для вращения</div>
        <div>🔍 Колесико для масштаба</div>
        <div>👆 Клик для выбора узла</div>
      </div>
    </div>
  );
};

export default ForceGraph3DComponent; 