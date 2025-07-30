import { useState, useEffect } from 'react';
import Head from 'next/head';
import { graphData, EVENT_CATEGORIES } from '../data/graphData';

export default function Timeline() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredCategory, setFilteredCategory] = useState('ALL');

  useEffect(() => {
    // Sort events by date and filter
    let filteredEvents = graphData.nodes;
    
    if (filteredCategory !== 'ALL') {
      filteredEvents = graphData.nodes.filter(node => node.category === filteredCategory);
    }
    
    // Sort by year (extract year from date)
    filteredEvents.sort((a, b) => {
      const yearA = parseInt(a.date.split('-')[0]);
      const yearB = parseInt(b.date.split('-')[0]);
      return yearA - yearB;
    });
    
    setEvents(filteredEvents);
  }, [filteredCategory]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <>
      <Head>
        <title>Временная шкала - CauseMap</title>
        <meta name="description" content="Временная шкала исторических событий" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-2xl">🏠</a>
              <h1 className="text-2xl font-bold">📅 Временная шкала</h1>
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

        {/* Timeline */}
        <div className="p-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-600"></div>
            
            {/* Events */}
            <div className="space-y-8">
              {events.map((event, index) => {
                const category = EVENT_CATEGORIES[event.category];
                const isEven = index % 2 === 0;
                
                return (
                  <div
                    key={event.id}
                    className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-6 w-4 h-4 rounded-full border-4 border-gray-900 z-10"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    
                    {/* Event card */}
                    <div
                      className={`w-96 p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                        selectedEvent?.id === event.id
                          ? 'bg-purple-600 border-purple-500'
                          : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{category.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-white">{event.name}</h3>
                          <p className="text-sm text-gray-400">{event.date}</p>
                        </div>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-2">{event.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Важность: {event.importance}%</span>
                        <span>{category.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
              
              <div className="text-sm text-gray-400">
                <div>Дата: {selectedEvent.date}</div>
                <div>Важность: {selectedEvent.importance}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 