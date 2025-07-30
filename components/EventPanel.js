import { useState, useEffect } from 'react';
import { EVENT_CATEGORIES, aiPredictions } from '../data/graphData';

const EventPanel = ({ selectedEvent, onClose }) => {
  const [aiPrediction, setAiPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Find AI prediction for selected event
  useEffect(() => {
    if (selectedEvent) {
      const prediction = aiPredictions.find(p => p.eventId === selectedEvent.id);
      setAiPrediction(prediction);
      
      // Simulate AI analysis loading
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, [selectedEvent]);

  if (!selectedEvent) {
    return (
      <div className="w-80 bg-gray-900 border-l border-gray-700 p-6 text-gray-400">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">Выберите событие</h3>
          <p className="text-sm">Кликните на любой узел в графе для просмотра деталей</p>
        </div>
      </div>
    );
  }

  const category = EVENT_CATEGORIES[selectedEvent.category];

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-700 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">{selectedEvent.name}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>📅 {selectedEvent.date}</span>
          <span>⭐ {selectedEvent.importance}% важность</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Описание</h3>
          <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
        </div>

        {/* Category */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Категория</h3>
          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <div className="font-medium text-white">{category.name}</div>
              <div className="text-sm text-gray-400">Цвет: {category.color}</div>
            </div>
          </div>
        </div>

        {/* AI Prediction */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">🤖 AI Анализ</h3>
          {isLoading ? (
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                <span className="text-gray-300">Анализируем связи...</span>
              </div>
            </div>
          ) : aiPrediction ? (
            <div className="p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔮</span>
                <span className="font-medium text-white">Прогноз</span>
                <span className="ml-auto text-sm text-purple-300">
                  {Math.round(aiPrediction.confidence * 100)}% уверенность
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-3">{aiPrediction.prediction}</p>
              <div>
                <div className="text-xs text-gray-400 mb-2">Факторы:</div>
                <div className="flex flex-wrap gap-1">
                  {aiPrediction.factors.map((factor, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-gray-400 text-sm">AI анализ недоступен для этого события</p>
            </div>
          )}
        </div>

        {/* External Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">📚 Источники</h3>
          <div className="space-y-2">
            <a
              href={`https://ru.wikipedia.org/wiki/${encodeURIComponent(selectedEvent.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="text-xl">📖</span>
              <div>
                <div className="font-medium text-white">Wikipedia</div>
                <div className="text-xs text-gray-400">Подробная информация</div>
              </div>
            </a>
            
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(selectedEvent.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="text-xl">🔍</span>
              <div>
                <div className="font-medium text-white">Google</div>
                <div className="text-xs text-gray-400">Поиск новостей</div>
              </div>
            </a>
            
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedEvent.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="text-xl">📺</span>
              <div>
                <div className="font-medium text-white">YouTube</div>
                <div className="text-xs text-gray-400">Видео материалы</div>
              </div>
            </a>
          </div>
        </div>

        {/* Related Events */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">🔗 Связанные события</h3>
          <div className="space-y-2">
            <div className="p-3 bg-gray-800 rounded-lg">
              <div className="text-sm font-medium text-white">Похожие события</div>
              <div className="text-xs text-gray-400 mt-1">Анализ связей в разработке...</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-700">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
            📊 Показать связи
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPanel; 