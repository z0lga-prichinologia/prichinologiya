import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import EventPanel from './EventPanel';
import FilterPanel from './FilterPanel';
import { graphData } from '../data/graphData';

const ForceGraph3DComponent = dynamic(() => import('./ForceGraph3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-900"><div className="text-white">Загрузка графа...</div></div>
});

const CauseMapDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredCategory, setFilteredCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showEventPanel, setShowEventPanel] = useState(false);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const handleNodeClick = (node) => {
    setSelectedEvent(node);
    setShowEventPanel(true);
  };

  const handleFilterChange = (category) => {
    setFilteredCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // TODO: Implement search functionality
  };

  const handleCloseEventPanel = () => {
    setShowEventPanel(false);
    setSelectedEvent(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Загружаем CauseMap</h2>
          <p className="text-gray-400">Анализируем {graphData.nodes.length.toLocaleString()} событий...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Sidebar - Filters */}
      <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🌍</span>
            <h1 className="text-2xl font-bold text-white">CauseMap</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Интерактивная карта причинно-следственных связей
          </p>
        </div>
        
        <FilterPanel
          onFilterChange={handleFilterChange}
          selectedCategory={filteredCategory}
          onSearch={handleSearch}
        />
      </div>

      {/* Main Content - 3D Graph */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black/80 text-white p-4 rounded-lg text-sm min-w-[180px] shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📊</span>
              <span className="font-bold text-lg">Статистика</span>
            </div>
            <div className="flex flex-col gap-2 text-base">
              <div className="flex justify-between"><span>Событий:</span> <span>{graphData.nodes.length.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Связей:</span> <span>{graphData.links.length.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Категорий:</span> <span>8</span></div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/80 text-white p-3 rounded-lg text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🤖</span>
              <span className="font-medium">AI Статус</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">Активен</span>
            </div>
          </div>
        </div>

        <ForceGraph3DComponent
          onNodeClick={handleNodeClick}
          selectedNode={selectedEvent}
          filteredCategory={filteredCategory}
        />
      </div>

      {/* Right Sidebar - Event Panel */}
      {showEventPanel && (
        <EventPanel
          selectedEvent={selectedEvent}
          onClose={handleCloseEventPanel}
        />
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowEventPanel(!showEventPanel)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-colors z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Navigation Menu */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 flex gap-2">
          <a
            href="/"
            className="px-4 py-2 text-white hover:bg-gray-700 rounded-md transition-colors text-sm font-medium"
          >
            🏠 Главная
          </a>
          <a
            href="/beta"
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors text-sm font-medium"
          >
            🧪 Бета
          </a>
          <a
            href="/timeline"
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors text-sm font-medium"
          >
            📅 Временная шкала
          </a>
          <a
            href="/geo"
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors text-sm font-medium"
          >
            🌍 Карта мира
          </a>
          <a
            href="/tags"
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors text-sm font-medium"
          >
            🏷️ Облако тегов
          </a>
          <a
            href="/tree"
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors text-sm font-medium"
          >
            🌳 Дерево
          </a>
        </div>
      </div>
    </div>
  );
};

export default CauseMapDashboard; 