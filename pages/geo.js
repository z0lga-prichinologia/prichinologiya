import { useState, useEffect } from 'react';
import Head from 'next/head';
import { graphData, EVENT_CATEGORIES } from '../data/graphData';

export default function Geo() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredCategory, setFilteredCategory] = useState('ALL');
  const [hoveredEvent, setHoveredEvent] = useState(null);

  // Mock geographic coordinates for events
  const getEventCoordinates = (event) => {
    // Simple hash-based coordinate generation
    const hash = event.name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const lat = (hash % 180) - 90; // -90 to 90
    const lng = (Math.abs(hash) % 360) - 180; // -180 to 180
    
    return { lat, lng };
  };

  useEffect(() => {
    let filteredEvents = graphData.nodes;
    
    if (filteredCategory !== 'ALL') {
      filteredEvents = graphData.nodes.filter(node => node.category === filteredCategory);
    }
    
    // Add coordinates to events
    const eventsWithCoords = filteredEvents.map(event => ({
      ...event,
      coordinates: getEventCoordinates(event)
    }));
    
    setEvents(eventsWithCoords);
  }, [filteredCategory]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleEventHover = (event) => {
    setHoveredEvent(event);
  };

  const handleEventLeave = () => {
    setHoveredEvent(null);
  };

  // Convert lat/lng to pixel coordinates on a simple world map
  const getPixelCoordinates = (lat, lng, containerWidth, containerHeight) => {
    const x = ((lng + 180) / 360) * containerWidth;
    const y = ((90 - lat) / 180) * containerHeight;
    return { x, y };
  };

  return (
    <>
      <Head>
        <title>Карта мира - CauseMap</title>
        <meta name="description" content="Географическая карта исторических событий" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-2xl">🏠</a>
              <h1 className="text-2xl font-bold">🌍 Карта мира</h1>
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

        {/* World Map */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Географическое распределение событий</h2>
            <p className="text-gray-400">Размер маркера = важность, цвет = категория</p>
          </div>
          
          <div className="relative bg-gray-800 rounded-lg p-8 min-h-96">
            {/* Simple World Map Background */}
            <div className="absolute inset-8 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-lg border border-gray-600"></div>
            
            {/* Event Markers */}
            <div className="relative z-10">
              {events.map((event) => {
                const category = EVENT_CATEGORIES[event.category];
                const { x, y } = getPixelCoordinates(
                  event.coordinates.lat,
                  event.coordinates.lng,
                  800, // container width
                  400  // container height
                );
                
                const markerSize = Math.max(8, Math.min(20, event.importance / 5));
                
                return (
                  <div
                    key={event.id}
                    className="absolute cursor-pointer transition-all hover:scale-150 hover:z-20"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => handleEventClick(event)}
                    onMouseEnter={() => handleEventHover(event)}
                    onMouseLeave={handleEventLeave}
                  >
                    <div
                      className="rounded-full border-2 border-white shadow-lg"
                      style={{
                        width: `${markerSize}px`,
                        height: `${markerSize}px`,
                        backgroundColor: category.color
                      }}
                    ></div>
                    
                    {/* Event name on hover */}
                    {hoveredEvent?.id === event.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap z-30">
                        {event.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Map Labels */}
            <div className="absolute top-4 left-4 text-xs text-gray-400">
              Северная Америка
            </div>
            <div className="absolute top-4 right-4 text-xs text-gray-400">
              Европа
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
              Африка
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xs text-gray-400">
              Азия
            </div>
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
                  <div className="text-gray-400">Координаты</div>
                  <div className="text-white font-mono">
                    {selectedEvent.coordinates.lat.toFixed(2)}°, {selectedEvent.coordinates.lng.toFixed(2)}°
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-gray-400">Важность</div>
                  <div className="text-white font-bold">{selectedEvent.importance}%</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                <div>Дата: {selectedEvent.date}</div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="fixed bottom-4 left-4 bg-black/80 p-4 rounded-lg">
          <h4 className="font-semibold text-white mb-2">📊 Статистика</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Событий на карте:</span>
              <span className="text-white font-medium">{events.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Категорий:</span>
              <span className="text-white font-medium">{Object.keys(EVENT_CATEGORIES).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Период:</span>
              <span className="text-white font-medium">1900-2025</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="fixed bottom-4 right-4 bg-black/80 p-4 rounded-lg">
          <h4 className="font-semibold text-white mb-2">Легенда</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(EVENT_CATEGORIES).slice(0, 4).map(([key, category]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-gray-300">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 