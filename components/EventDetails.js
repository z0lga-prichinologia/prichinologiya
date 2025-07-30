const EventDetails = ({ event, onClose }) => {
  if (!event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImportanceStars = (importance) => {
    return '★'.repeat(importance) + '☆'.repeat(5 - importance);
  };

  return (
    <div style={{
      background: '#181926',
      color: '#f3f4f6',
      padding: '2rem',
      borderRadius: '1.5rem',
      boxShadow: '0 8px 32px rgba(24, 25, 38, 0.45)',
      maxWidth: 420,
      minWidth: 320,
      fontFamily: 'Inter, Arial, sans-serif',
      border: '1px solid #23243a',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', margin: 0 }}>{event.id}</h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.7rem',
            fontWeight: 700,
            cursor: 'pointer',
            lineHeight: 1,
            marginLeft: '1rem',
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.opacity = 1}
          onMouseOut={e => e.currentTarget.style.opacity = 0.7}
        >
          ×
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {/* Дата */}
        <div>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#a1a1aa' }}>Дата:</span>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>{formatDate(event.date)}</p>
        </div>

        {/* Важность */}
        <div>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#a1a1aa' }}>Важность:</span>
          <p style={{ color: '#facc15', fontSize: '1.1rem', margin: 0 }}>{getImportanceStars(event.importance)}</p>
        </div>

        {/* Категория */}
        <div>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#a1a1aa' }}>Категория:</span>
          <span 
            style={{
              display: 'inline-block',
              padding: '0.3rem 1rem',
              borderRadius: '1rem',
              fontSize: '0.98rem',
              fontWeight: 600,
              marginLeft: '0.7rem',
              background: event.color + '33',
              color: event.color,
              letterSpacing: '0.01em',
            }}
          >
            {event.group}
          </span>
        </div>

        {/* Описание */}
        <div>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#a1a1aa' }}>Описание:</span>
          <p style={{ color: '#e5e7eb', margin: '0.3rem 0 0 0' }}>{event.description}</p>
        </div>

        {/* Причины */}
        {event.causes && event.causes.length > 0 && (
          <div>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#a1a1aa' }}>Причины:</span>
            <ul style={{ margin: '0.3rem 0 0 1.2em', color: '#f3f4f6', fontSize: '0.98rem', padding: 0 }}>
              {event.causes.map((cause, index) => (
                <li key={index} style={{ marginBottom: 2 }}>
                  • {cause}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Последствия */}
        {event.effects && event.effects.length > 0 && (
          <div>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#a1a1aa' }}>Последствия:</span>
            <ul style={{ margin: '0.3rem 0 0 1.2em', color: '#f3f4f6', fontSize: '0.98rem', padding: 0 }}>
              {event.effects.map((effect, index) => (
                <li key={index} style={{ marginBottom: 2 }}>
                  • {effect}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Источники */}
        {event.sources && event.sources.length > 0 && (
          <div>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#a1a1aa' }}>Источники:</span>
            <ul style={{ margin: '0.3rem 0 0 1.2em', color: '#60a5fa', fontSize: '0.98rem', padding: 0 }}>
              {event.sources.map((source, index) => (
                <li key={index}>
                  <a 
                    href={source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#60a5fa', textDecoration: 'underline', wordBreak: 'break-all' }}
                  >
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails; 