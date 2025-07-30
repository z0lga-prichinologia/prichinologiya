import React, { useEffect, useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import InfoPanel from './InfoPanel';
import useSelectedNode from './useSelectedNode';

const ForceGraph3D = dynamic(
  () => import('react-force-graph-3d'),
  { ssr: false }
);

const GraphPage = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const fgRef = useRef();
  const { selectedNode, setSelectedNode } = useSelectedNode();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/data/historical_events.json');
      const events = await res.json();
      // Преобразуем события в nodes/links
      const nodes = events.map(e => ({
        id: e.id,
        label: e.id,
        category: e.group,
        year: e.date?.slice(0, 4),
        value: e.importance || 3,
        description: e.description,
        causes: e.causes,
        sources: e.sources,
        color: e.color
      }));
      const links = [];
      events.forEach(e => {
        e.causes?.forEach(cause => {
          if (events.find(ev => ev.id === cause)) {
            links.push({ source: cause, target: e.id });
          }
        });
      });
      setGraphData({ nodes, links });
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleNodeClick = useCallback(node => {
    setSelectedNode(node);
    if (fgRef.current && node?.x !== undefined) {
      const distance = 200;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      fgRef.current.pointOfView({ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, 1200);
    }
  }, [setSelectedNode]);

  return (
    <div className="flex h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="flex-1 min-w-0 relative">
        {!loading && (
          <ForceGraph3D
            ref={fgRef}
            graphData={graphData}
            nodeAutoColorBy="category"
            nodeLabel="label"
            nodeVal={n => n.value}
            onNodeClick={handleNodeClick}
            backgroundColor="#0f172a"
            nodeThreeObjectExtend={true}
            nodeThreeObject={node => {
              // Увеличиваем выбранный узел
              const geometry = new window.THREE.SphereGeometry(selectedNode && node.id === selectedNode.id ? 16 : 8);
              const material = new window.THREE.MeshBasicMaterial({ color: node.color || '#fff' });
              return new window.THREE.Mesh(geometry, material);
            }}
          />
        )}
        {loading && <div className="absolute inset-0 flex items-center justify-center text-gray-400">Loading graph...</div>}
      </div>
      <div className="w-[420px] max-w-full bg-white/90 shadow-2xl h-full p-8 overflow-y-auto transition-all duration-300">
        <InfoPanel node={selectedNode} />
      </div>
    </div>
  );
};

export default GraphPage; 