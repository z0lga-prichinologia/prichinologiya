// pages/graph.jsx
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { graphData, EVENT_CATEGORIES } from '../data/graphData';
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

function pastelColorByCategory(category) {
  if (!category) return '#BDBDBD';
  const palette = {
    Politics: '#2B50EC',
    'политика': '#2B50EC',
    Economy: '#FF9800',
    'экономика': '#FF9800',
    Military: '#E53935',
    'война': '#E53935',
    Culture: '#00BFAE',
    'культура': '#00BFAE',
    Ideology: '#8E24AA',
    'идеология': '#8E24AA',
    Technology: '#0097A7',
    'технологии': '#0097A7',
    Science: '#FFD600',
    'наука': '#FFD600',
    Environment: '#43A047',
    'экология': '#43A047',
    Media: '#FF1744',
    'медиа': '#FF1744',
    Religion: '#3949AB',
    'религия': '#3949AB',
    Health: '#00E676',
    'здоровье': '#00E676',
    Default: '#BDBDBD',
  };
  // Всегда возвращаем один и тот же цвет для одной и той же категории
  const key = Object.keys(palette).find(k => k.toLowerCase() === String(category).toLowerCase());
  return key ? palette[key] : palette.Default;
}

export default function GraphPage() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [mode, setMode] = useState('3D'); // '3D' | '2D'
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeCategories, setActiveCategories] = useState(Object.keys(EVENT_CATEGORIES));
  const [search, setSearch] = useState('');
  const [showTimeline, setShowTimeline] = useState(true);
  const [timeRange, setTimeRange] = useState({ start: 1900, end: 2024 });
  const fg3DRef = useRef();
  const [showCategories, setShowCategories] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Фильтрация узлов и связей по категориям
  const filteredNodes = graphData.nodes.filter(n =>
    activeCategories.includes(n.category) &&
    (!search || n.name.toLowerCase().includes(search.toLowerCase())) &&
    (parseInt(n.date) >= timeRange.start && parseInt(n.date) <= timeRange.end)
  );
  const filteredLinks = graphData.links.filter(l =>
    activeCategories.includes(l.category || l.source?.category || l.target?.category)
  );

  // 3D: только узлы, без связей
  const graph3DData = { nodes: filteredNodes, links: [] };

  // 2D: только выбранный узел и его связи (и только если они в активных категориях)
  const graph2DData = React.useMemo(() => {
    if (!selectedNode) return { nodes: [], links: [] };
    const nodeId = selectedNode.id;
    const links = filteredLinks.filter(l => l.source === nodeId || l.target === nodeId);
    const nodeIds = new Set([nodeId, ...links.map(l => l.source === nodeId ? l.target : l.source)]);
    const nodes = filteredNodes.filter(n => nodeIds.has(n.id));
    return { nodes, links };
  }, [selectedNode, filteredNodes, filteredLinks]);

  const handleNodeClick3D = useCallback(node => {
    setSelectedNode(node);
    setMode('2D');
  }, []);

  const handleBackTo3D = useCallback(() => {
    setSelectedNode(null);
    setMode('3D');
  }, []);

  // Панель фильтров
  const handleToggleCategory = (cat) => {
    setActiveCategories(prev => prev.includes(cat)
      ? prev.filter(c => c !== cat)
      : [...prev, cat]
    );
  };
  const handleShowAll = () => setActiveCategories(Object.keys(EVENT_CATEGORIES));
  const handleTimeRange = (type, value) => setTimeRange(r => ({ ...r, [type]: Number(value) }));
  const handlePeriod = (period) => {
    const periods = {
      WWI: { start: 1914, end: 1918 },
      WWII: { start: 1939, end: 1945 },
      'Cold War': { start: 1947, end: 1991 },
      Modern: { start: 1991, end: 2024 },
      All: { start: 1900, end: 2024 }
    };
    setTimeRange(periods[period]);
  };

  return (
    <>
      <Head>
        <title>Event Map - CauseMap</title>
      </Head>
      <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#181C24' }}>
        {/* Sidebar toggle button */}
        <div style={{ position: 'absolute', left: sidebarOpen ? 340 : 0, top: '50%', zIndex: 30, transform: 'translateY(-50%)', transition: 'left 0.25s' }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            style={{
              background: '#23283a',
              color: '#fff',
              border: 'none',
              borderRadius: 16,
              padding: '8px 12px',
              fontSize: 18,
              boxShadow: '0 2px 8px #0003',
              cursor: 'pointer',
              transition: 'background 0.18s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            aria-label={sidebarOpen ? 'Hide filters' : 'Show filters'}
          >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        {/* Sidebar */}
        <div style={{
          width: sidebarOpen ? 340 : 0,
          minWidth: sidebarOpen ? 280 : 0,
          maxWidth: sidebarOpen ? 400 : 0,
          background: '#10111A',
          color: '#fff',
          padding: sidebarOpen ? 24 : 0,
          borderRight: sidebarOpen ? '1.5px solid #23283a' : 'none',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          overflow: 'hidden',
          transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
        }}>
          <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Filters</h2>
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: 'none', background: '#181C24', color: '#fff', fontSize: 16, marginBottom: 8 }}
          />
          <button
            onClick={() => setShowTimeline(v => !v)}
            style={{ width: '100%', background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600, fontSize: 16, marginBottom: 8, cursor: 'pointer' }}
          >
            {showTimeline ? 'Hide timeline' : 'Show timeline'}
          </button>
          {showTimeline && (
            <div style={{ background: '#181C24', borderRadius: 12, padding: 16, marginBottom: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Time period</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {['WWI', 'WWII', 'Cold War', 'Modern', 'All'].map(p => (
                  <button
                    key={p}
                    onClick={() => handlePeriod(p)}
                    style={{ background: '#23283a', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 500, fontSize: 14, cursor: 'pointer', marginBottom: 2 }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 14, marginBottom: 2 }}>From: {timeRange.start}</div>
              <input type="range" min={1900} max={2024} value={timeRange.start} onChange={e => handleTimeRange('start', e.target.value)} style={{ width: '100%' }} />
              <div style={{ fontSize: 14, margin: '8px 0 2px' }}>To: {timeRange.end}</div>
              <input type="range" min={1900} max={2024} value={timeRange.end} onChange={e => handleTimeRange('end', e.target.value)} style={{ width: '100%' }} />
            </div>
          )}
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Categories</div>
          <div style={{ display: 'none' }}>
            {/* Categories are now at the bottom of the graph */}
          </div>
          <button
            onClick={handleShowAll}
            style={{
              width: '100%',
              background: '#23283a',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '10px 0',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              marginBottom: 2,
              transition: 'background 0.18s',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#353a4d'}
            onMouseOut={e => e.currentTarget.style.background = '#23283a'}
          >Show all</button>
        </div>
        {/* Graph */}
        <div style={{ flex: 1, height: '100vh', position: 'relative', minWidth: 0 }}>
          {mode === '3D' && (
            <ForceGraph3D
              ref={fg3DRef}
              width={dimensions.width}
              height={dimensions.height}
              graphData={graph3DData}
              nodeLabel={node => node.name}
              nodeColor={node => pastelColorByCategory(node.category)}
              nodeVal={node => {
                // importance: 1-100, sqrt for smoothing, min 16, max 80 (x2)
                const imp = Number(node.importance) || 1;
                return Math.max(16, Math.min(80, Math.sqrt(imp) * 12));
              }}
              backgroundColor="#181C24"
              d3ChargeStrength={-800}
              d3VelocityDecay={0.2}
              onNodeClick={handleNodeClick3D}
            />
          )}
          {mode === '2D' && selectedNode && (
            <>
              <button
                onClick={handleBackTo3D}
                style={{ position: 'absolute', top: 24, left: 24, zIndex: 10, background: '#23283a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0003' }}
              >
                ← Back to event cloud
              </button>
              <ForceGraph2D
                width={dimensions.width}
                height={dimensions.height}
                graphData={graph2DData}
                nodeLabel={node => node.name}
                nodeColor={node => pastelColorByCategory(node.category)}
                nodeVal={node => Math.max(16, Math.sqrt(node.importance || 1) * 12)}
                backgroundColor="#181C24"
                d3ChargeStrength={-400}
                d3MinDistance={80}
                linkColor={() => '#fff'}
                linkWidth={() => 2}
              />
            </>
          )}
          {/* Categories at the bottom */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            background: 'rgba(16,17,26,0.96)',
            borderTop: '1.5px solid #23283a',
            padding: showCategories ? '10px 0 8px 0' : '0',
            boxShadow: '0 -2px 16px #0002',
            height: showCategories ? 56 : 0,
            minHeight: 0,
            maxHeight: showCategories ? 80 : 0,
            opacity: showCategories ? 1 : 0,
            overflow: 'hidden',
            transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              overflowX: 'auto',
              overflowY: 'hidden',
              width: '100%',
              padding: '0 16px',
              scrollbarWidth: 'thin',
            }}>
              {showCategories && Object.entries(EVENT_CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => handleToggleCategory(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: activeCategories.includes(key) ? pastelColorByCategory(key) : 'transparent',
                    color: activeCategories.includes(key) ? '#181C24' : '#bdbdbd',
                    border: 'none',
                    borderRadius: 9,
                    padding: '6px 12px',
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: 'pointer',
                    boxShadow: activeCategories.includes(key) ? '0 1px 6px #0002' : 'none',
                    opacity: activeCategories.includes(key) ? 1 : 0.7,
                    transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
                    outline: 'none',
                    borderBottom: activeCategories.includes(key) ? '2px solid #fff3' : '2px solid transparent',
                    marginBottom: 0,
                    whiteSpace: 'nowrap',
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = 1}
                  onMouseOut={e => e.currentTarget.style.opacity = activeCategories.includes(key) ? 1 : 0.7}
                >
                  <span style={{ fontSize: 18, marginRight: 2 }}>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
