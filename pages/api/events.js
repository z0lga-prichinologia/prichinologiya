import { generateEvents, generateConnections } from '../../data/graphData';

export default function handler(req, res) {
  try {
    const NUM_EVENTS = 2000; // Было меньше, теперь больше событий
    const NUM_LINKS = 4200; // Было меньше, теперь больше связей
    const events = generateEvents(NUM_EVENTS);
    const links = generateConnections(events);
    res.status(200).json({ nodes: events, links });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка генерации событий' });
  }
} 