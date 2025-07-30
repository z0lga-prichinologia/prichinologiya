import { useState, useEffect } from 'react';
import Head from 'next/head';
import { graphData, EVENT_CATEGORIES } from '../data/graphData';

export default function Tree() {
  const [treeData, setTreeData] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredCategory, setFilteredCategory] = useState('ALL');
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  useEffect(() => {
    // Build tree structure from graph data
    const buildTree = () => {
      let filteredEvents = graphData.nodes;
      
      if (filteredCategory !== 'ALL') {
        filteredEvents = graphData.nodes.filter(node => node.category === filteredCategory);
      }
      
      // Find root events (events with highest importance)
      const sortedEvents = [...filteredEvents].sort((a, b) => b.importance - a.importance);
      const rootEvents = sortedEvents.slice(0, 5); // Top 5 most important events
      
      // Build tree structure
      const buildNode = (event, depth = 0) => {
        if (depth > 3) return null; // Limit depth
        
        // Find related events (connected in graph)
        const relatedEvents = graphData.links
          .filter(link => link.source === event.id || link.target === event.id)
          .map(link => {
            const relatedId = link.source === event.id ? link.target : link.source;
            return filteredEvents.find(e => e.id === relatedId);
          })
          .filter(Boolean)
          .sort((a, b) => b.importance - a.importance)
          .slice(0, 3); // Limit children
        
        return {
          ...event,
          children: relatedEvents.map(child => buildNode(child, depth + 1)).filter(Boolean)
        };
      };
      
      const tree = {
        name: 'Исторические события',
        children: rootEvents.map(event => buildNode(event))
      };
      
      setTreeData(tree);
    };
    
    buildTree();
  }, [filteredCategory]);

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node, level = 0) => {
    const category = EVENT_CATEGORIES[node.category];
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div key={node.id} className="ml-6">
        <div className="flex items-center gap-2 py-2">
          {/* Expand/Collapse button */}
          {hasChildren && (
            <button
              onClick={() => toggleNode(node.id)}
              className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-white"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          
          {/* Event marker */}
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          ></div>
          
          {/* Event info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium text-white">{node.name}</span>
              <span className="text-sm text-gray-400">({node.date})</span>
            </div>
            <div className="text-sm text-gray-300 ml-6">{node.description}</div>
            <div className="text-xs text-gray-400 ml-6">
              Важность: {node.importance}% | {category.name}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedEvent(node)}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
            >
              👁️
            </button>
            {hasChildren && (
              <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                {node.children.length}
              </span>
            )}
          </div>
        </div>
        
        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="border-l border-gray-600 ml-2">
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Древовидная диаграмма - CauseMap</title>
        <meta name="description" content="Иерархическая структура исторических событий" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-2xl">🏠</a>
              <h1 className="text-2xl font-bold">🌳 Древовидная диаграмма</h1>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2">
              {Object.entries(EVENT_CATEGORIES).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setFilteredCategory(filteredCategory === key ? 'ALL' : key)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    filteredCategory === key
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tree Visualization */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Иерархическая структура событий</h2>
            <p className="text-gray-400">Корневые события и их связи</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 min-h-96">
            {treeData ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-white">{treeData.name}</h3>
                  <p className="text-gray-400">Нажмите ▶ для раскрытия связей</p>
                </div>
                
                {treeData.children.map(node => renderNode(node))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
              </div>
            )}
          </div>
        </div>

        {/* Event Details Panel */}
        {selectedEvent && (
          <div className="fixed right-0 top-0 h-full w-96 bg-gray-900 border-l border-gray-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Детали события</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">{selectedEvent.name}</h3>
                <p className="text-gray-300">{selectedEvent.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl">{EVENT_CATEGORIES[selectedEvent.category].icon}</span>
                <span className="text-white">{EVENT_CATEGORIES[selectedEvent.category].name}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-gray-400">Важность</div>
                  <div className="text-white font-bold">{selectedEvent.importance}%</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-gray-400">Связей</div>
                  <div className="text-white font-bold">
                    {selectedEvent.children ? selectedEvent.children.length : 0}
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                <div>Дата: {selectedEvent.date}</div>
              </div>
              
              {selectedEvent.children && selectedEvent.children.length > 0 && (
                <div>
                  <h4 className="font-semibold text-white mb-2">Связанные события:</h4>
                  <div className="space-y-2">
                    {selectedEvent.children.map(child => (
                      <div key={child.id} className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{EVENT_CATEGORIES[child.category].icon}</span>
                          <span className="font-medium text-white">{child.name}</span>
                        </div>
                        <div className="text-sm text-gray-400">{child.date}</div>
                        <div className="text-xs text-gray-500">Важность: {child.importance}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="fixed bottom-4 left-4 bg-black/80 p-4 rounded-lg">
          <h4 className="font-semibold text-white mb-2">📊 Статистика дерева</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Корневых событий:</span>
              <span className="text-white font-medium">
                {treeData?.children?.length || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Всего узлов:</span>
              <span className="text-white font-medium">
                {treeData ? JSON.stringify(treeData).match(/"id":/g)?.length || 0 : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Макс. глубина:</span>
              <span className="text-white font-medium">3 уровня</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="fixed bottom-4 right-4 bg-black/80 p-4 rounded-lg">
          <h4 className="font-semibold text-white mb-2">🎛️ Управление</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">▶</span>
              <span className="text-gray-300">Раскрыть узел</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">▼</span>
              <span className="text-gray-300">Свернуть узел</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">👁️</span>
              <span className="text-gray-300">Просмотр деталей</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 