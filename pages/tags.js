import { useState, useEffect } from 'react';
import Head from 'next/head';
import { graphData, EVENT_CATEGORIES } from '../data/graphData';

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredCategory, setFilteredCategory] = useState('ALL');

  useEffect(() => {
    // Generate tags from event names and descriptions
    const tagMap = new Map();
    
    let filteredEvents = graphData.nodes;
    if (filteredCategory !== 'ALL') {
      filteredEvents = graphData.nodes.filter(node => node.category === filteredCategory);
    }
    
    filteredEvents.forEach(event => {
      // Extract words from event name and description
      const words = [...event.name.split(' '), ...event.description.split(' ')]
        .map(word => word.toLowerCase().replace(/[^\wа-яё]/g, ''))
        .filter(word => word.length > 3 && word.length < 20);
      
      words.forEach(word => {
        if (tagMap.has(word)) {
          tagMap.get(word).count += 1;
          tagMap.get(word).importance += event.importance;
          tagMap.get(word).events.push(event);
        } else {
          tagMap.set(word, {
            name: word,
            count: 1,
            importance: event.importance,
            category: event.category,
            events: [event]
          });
        }
      });
    });
    
    // Convert to array and sort by importance
    const tagArray = Array.from(tagMap.values())
      .filter(tag => tag.count > 1) // Only show tags that appear multiple times
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 100); // Limit to top 100 tags
    
    setTags(tagArray);
  }, [filteredCategory]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const getTagSize = (importance) => {
    const minSize = 12;
    const maxSize = 48;
    const normalized = (importance - 30) / (100 - 30); // Normalize between 30-100
    return Math.max(minSize, Math.min(maxSize, minSize + (normalized * (maxSize - minSize))));
  };

  return (
    <>
      <Head>
        <title>Облако тегов - CauseMap</title>
        <meta name="description" content="Облако тегов исторических событий" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-2xl">🏠</a>
              <h1 className="text-2xl font-bold">🏷️ Облако тегов</h1>
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

        {/* Tag Cloud */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Облако тегов</h2>
            <p className="text-gray-400">Размер = важность, цвет = категория</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 p-8 bg-gray-800 rounded-lg min-h-96">
            {tags.map((tag) => {
              const category = EVENT_CATEGORIES[tag.category];
              const fontSize = getTagSize(tag.importance);
              
              return (
                <button
                  key={tag.name}
                  onClick={() => handleTagClick(tag)}
                  className="hover:scale-110 transition-transform cursor-pointer"
                  style={{
                    fontSize: `${fontSize}px`,
                    color: category.color,
                    fontWeight: tag.count > 5 ? 'bold' : 'normal'
                  }}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tag Details Panel */}
        {selectedTag && (
          <div className="fixed right-0 top-0 h-full w-96 bg-gray-900 border-l border-gray-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Детали тега</h2>
              <button
                onClick={() => setSelectedTag(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: EVENT_CATEGORIES[selectedTag.category].color }}>
                  #{selectedTag.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{EVENT_CATEGORIES[selectedTag.category].icon}</span>
                  <span className="text-white">{EVENT_CATEGORIES[selectedTag.category].name}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-gray-400">Количество</div>
                  <div className="text-white font-bold">{selectedTag.count}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-gray-400">Средняя важность</div>
                  <div className="text-white font-bold">{Math.round(selectedTag.importance / selectedTag.count)}%</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Связанные события:</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedTag.events.slice(0, 10).map((event) => (
                    <div key={event.id} className="bg-gray-800 p-3 rounded-lg">
                      <div className="font-medium text-white">{event.name}</div>
                      <div className="text-sm text-gray-400">{event.date}</div>
                      <div className="text-xs text-gray-500">Важность: {event.importance}%</div>
                    </div>
                  ))}
                  {selectedTag.events.length > 10 && (
                    <div className="text-center text-gray-400 text-sm">
                      ... и еще {selectedTag.events.length - 10} событий
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="fixed bottom-4 left-4 bg-black/80 p-4 rounded-lg">
          <h4 className="font-semibold text-white mb-2">Легенда</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-300">Геополитика</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-300">Экономика</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-gray-300">Технологии</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-gray-300">Культура</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 