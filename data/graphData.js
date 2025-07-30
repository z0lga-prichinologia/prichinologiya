// Event categories with color codes
export const EVENT_CATEGORIES = {
  POLITICS: {
    name: 'Politics & Geopolitics', color: '#2563eb',
    subcategories: [
      { key: 'GEOPOLITICAL_CONFLICTS', name: 'Geopolitical conflicts', color: '#3b82f6' },
      { key: 'REVOLUTIONS', name: 'Revolutions, coups', color: '#2563eb' },
      { key: 'TREATIES', name: 'International treaties', color: '#1d4ed8' },
      { key: 'ASSASSINATIONS', name: 'Political assassinations & scandals', color: '#60a5fa' }
    ]
  },
  WARS: {
    name: 'Wars & Military Events', color: '#dc2626',
    subcategories: [
      { key: 'WAR_START_END', name: 'Start and end of wars', color: '#ef4444' },
      { key: 'INVASIONS', name: 'Military invasions', color: '#dc2626' },
      { key: 'SANCTIONS', name: 'Sanctions, blockades', color: '#b91c1c' },
      { key: 'PEACE_TALKS', name: 'Peace negotiations', color: '#f87171' }
    ]
  },
  ECONOMY: {
    name: 'Economy & Finance', color: '#22c55e',
    subcategories: [
      { key: 'CRISIS', name: 'Crises, defaults', color: '#4ade80' },
      { key: 'INFLATION', name: 'Inflation spikes', color: '#22c55e' },
      { key: 'MARKET_CRASH', name: 'Market crashes', color: '#15803d' },
      { key: 'ENERGY', name: 'Energy market (oil, gas)', color: '#bbf7d0' }
    ]
  },
  TECHNOLOGY: {
    name: 'Technology & Innovation', color: '#fde047',
    subcategories: [
      { key: 'INVENTIONS', name: 'Inventions & discoveries', color: '#facc15' },
      { key: 'PRODUCT_LAUNCH', name: 'Product launches', color: '#fde047' },
      { key: 'BREAKTHROUGHS', name: 'Breakthroughs in AI, space, quantum tech', color: '#ca8a04' },
      { key: 'FAILURES', name: 'Failures & collapses (e.g. startup failures)', color: '#fef9c3' }
    ]
  },
  SOCIETY: {
    name: 'Society & Culture', color: '#f59e42',
    subcategories: [
      { key: 'PROTESTS', name: 'Mass protests', color: '#fbbf24' },
      { key: 'MIGRATION', name: 'Migration waves', color: '#f59e42' },
      { key: 'CULTURAL_SHIFTS', name: 'Cultural shifts', color: '#b45309' },
      { key: 'NEW_MOVEMENTS', name: 'New movements (feminism, environmentalism, etc.)', color: '#fef3c7' }
    ]
  },
  ECOLOGY: {
    name: 'Ecology & Disasters', color: '#a16207',
    subcategories: [
      { key: 'CLIMATE', name: 'Climate events (drought, flood, etc.)', color: '#fbbf24' },
      { key: 'TECH_DISASTERS', name: 'Accidents & man-made disasters', color: '#a16207' },
      { key: 'ECO_INITIATIVES', name: 'Global ecological initiatives', color: '#fde68a' }
    ]
  },
  HEALTH: {
    name: 'Health & Pandemics', color: '#a21caf',
    subcategories: [
      { key: 'DISEASES', name: 'Emergence of diseases', color: '#e879f9' },
      { key: 'PANDEMICS', name: 'Pandemics (SARS, COVID-19, etc.)', color: '#a21caf' },
      { key: 'MED_DISCOVERIES', name: 'Medical discoveries', color: '#701a75' },
      { key: 'HEALTHCARE_ISSUES', name: 'Healthcare issues', color: '#f3e8ff' }
    ]
  },
  IDEOLOGY: {
    name: 'Ideologies & Philosophy', color: '#f3f4f6',
    subcategories: [
      { key: 'NEW_CONCEPTS', name: 'Emergence of new concepts', color: '#d1d5db' },
      { key: 'THEORIES', name: 'Spread of theories (neoliberalism, Marxism, etc.)', color: '#f3f4f6' },
      { key: 'INFLUENTIAL_BOOKS', name: 'Books/speeches that influenced mass thinking', color: '#a3a3a3' }
    ]
  },
  PROPAGANDA: {
    name: 'Manipulation & Propaganda', color: '#18181b',
    subcategories: [
      { key: 'INFO_CAMPAIGNS', name: 'Information campaigns', color: '#52525b' },
      { key: 'ELECTION_FRAUD', name: 'Election fraud', color: '#18181b' },
      { key: 'CENSORSHIP', name: 'Censorship, blockades', color: '#a1a1aa' },
      { key: 'MEDIA_EVENTS', name: 'Mass media events (scandals, leaks)', color: '#d4d4d8' }
    ]
  }
};

// Generate 1000+ realistic historical and current events
export const generateEvents = (count = 500) => {
  const events = [];
  let id = 1;

  // Собираем все подкатегории в массив
  const allSubcategories = Object.entries(EVENT_CATEGORIES).flatMap(([catKey, cat]) =>
    cat.subcategories.map(sub => ({
      ...sub,
      category: catKey,
      categoryName: cat.name,
      categoryColor: cat.color
    }))
  );

  // Генерируем события с подкатегориями
  for (let i = 0; i < count; i++) {
    const subcat = allSubcategories[Math.floor(Math.random() * allSubcategories.length)];
    const year = 1900 + Math.floor(Math.random() * 125);
    events.push({
      id: id++,
      name: `${subcat.name} (${year})`,
      date: `${year}`,
      category: subcat.category,
      subcategory: subcat.key,
      color: subcat.color,
      importance: Math.floor(60 + Math.random() * 40),
      description: `Событие категории '${subcat.name}' (${subcat.categoryName}) в ${year} году`,
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      z: Math.random() * 1000
    });
  }

  return events;
};

// Generate connections between events
export const generateConnections = (events) => {
  const connections = [];
  let connectionId = 1;

  // Create connections based on categories and time proximity
  events.forEach((event, index) => {
    // Connect to 2-6 related events (уменьшаем для лучшей визуализации)
    const numConnections = 2 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numConnections; i++) {
      const targetIndex = Math.floor(Math.random() * events.length);
      if (targetIndex !== index) {
        const targetEvent = events[targetIndex];
        
        // Higher chance to connect events from same category or time period
        const sameCategory = event.category === targetEvent.category;
        const timeDiff = Math.abs(parseInt(event.date) - parseInt(targetEvent.date));
        const timeProximity = timeDiff < 20; // Увеличиваем временное окно
        
        // Проверяем, что связь еще не существует
        const connectionExists = connections.some(conn => 
          (conn.source === event.id && conn.target === targetEvent.id) ||
          (conn.source === targetEvent.id && conn.target === event.id)
        );
        
        if (!connectionExists && (sameCategory || timeProximity || Math.random() > 0.6)) {
          connections.push({
            id: connectionId++,
            source: event.id,
            target: targetEvent.id,
            strength: sameCategory ? 0.8 : 0.4,
            type: sameCategory ? 'category' : 'temporal'
          });
        }
      }
    }
  });

  console.log(`Generated ${connections.length} connections for ${events.length} events`);
  return connections;
};

// Main data export
export const graphData = (() => {
  const events = generateEvents();
  return {
    nodes: events,
    links: generateConnections(events)
  };
})();

// AI prediction mock data
export const aiPredictions = [
  {
    eventId: 1,
    prediction: 'На основе роста цен на энергоносители, вероятность экономического кризиса: 73%',
    confidence: 0.73,
    factors: ['Рост цен на нефть', 'Санкции', 'Инфляция']
  },
  {
    eventId: 2,
    prediction: 'Учитывая технологические прорывы, вероятность новой ИИ-революции: 85%',
    confidence: 0.85,
    factors: ['Развитие ИИ', 'Инвестиции в технологии', 'Глобальная конкуренция']
  }
];

// News API mock data structure
export const newsSources = [
  { name: 'Reuters', url: 'https://reuters.com', category: 'general' },
  { name: 'BBC', url: 'https://bbc.com', category: 'general' },
  { name: 'CNN', url: 'https://cnn.com', category: 'general' },
  { name: 'TechCrunch', url: 'https://techcrunch.com', category: 'technology' },
  { name: 'Bloomberg', url: 'https://bloomberg.com', category: 'economy' }
]; 