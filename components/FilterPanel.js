import { useState } from 'react';
import { EVENT_CATEGORIES, graphData } from '../data/graphData';

const FilterPanel = ({ onFilterChange, selectedCategory, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showStats, setShowStats] = useState(false);

  // Calculate statistics
  const stats = Object.keys(EVENT_CATEGORIES).reduce((acc, category) => {
    const count = graphData.nodes.filter(node => node.category === category).length;
    acc[category] = count;
    return acc;
  }, {});

  const totalEvents = graphData.nodes.length;
  const totalConnections = graphData.links.length;

  const handleCategoryClick = (category) => {
    onFilterChange(category === selectedCategory ? 'ALL' : category);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="bg-gray-900 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">🔍 Фильтры</h2>
        <button
          onClick={() => setShowStats(!showStats)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          📊
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск событий..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
          />
          <div className="absolute right-3 top-2.5 text-gray-400">🔍</div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Категории</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(EVENT_CATEGORIES).map(([key, category]) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                selectedCategory === key
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <div className="text-left">
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-xs opacity-75">{stats[key]} событий</div>
              </div>
              <div
                className="w-3 h-3 rounded-full ml-auto"
                style={{ backgroundColor: category.color }}
              ></div>
            </button>
          ))}
        </div>
      </div>

      {/* Statistics */}
      {showStats && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">📊 Статистика</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Всего событий:</span>
              <span className="text-white font-medium">{totalEvents.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Связей:</span>
              <span className="text-white font-medium">{totalConnections.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Категорий:</span>
              <span className="text-white font-medium">{Object.keys(EVENT_CATEGORIES).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Период:</span>
              <span className="text-white font-medium">1900-2025</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-2">
        <button
          onClick={() => onFilterChange('ALL')}
          className={`w-full p-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === 'ALL'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🌍 Показать все
        </button>
        
        <button
          onClick={() => onFilterChange('IMPORTANT')}
          className="w-full p-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          ⭐ Важные события (&gt;80%)
        </button>
        
        <button
          onClick={() => onFilterChange('RECENT')}
          className="w-full p-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          🕒 Последние 10 лет
        </button>
      </div>

      {/* AI Status */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🤖</span>
          <span className="text-sm font-medium text-white">AI Анализ</span>
          <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="text-xs text-gray-300">
          Система анализирует связи и генерирует прогнозы
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 