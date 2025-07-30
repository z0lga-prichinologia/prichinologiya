import Link from 'next/link';

export default function HowPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)', fontFamily: 'Inter, Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: '#fff', boxShadow: '0 2px 8px rgba(74, 78, 105, 0.04)', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" legacyBehavior>
          <a style={{ fontWeight: 800, fontSize: '1.5rem', color: '#22223b', textDecoration: 'none', letterSpacing: '-0.03em' }}>CauseMap</a>
        </Link>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/about" legacyBehavior><a style={{ color: '#4a4e69', fontWeight: 600, textDecoration: 'none' }}>About</a></Link>
          <Link href="/how" legacyBehavior><a style={{ color: '#4a4e69', fontWeight: 600, textDecoration: 'none' }}>How It Works</a></Link>
          <Link href="/investors" legacyBehavior><a style={{ color: '#4a4e69', fontWeight: 600, textDecoration: 'none' }}>For Investors</a></Link>
          <Link href="/contacts" legacyBehavior><a style={{ color: '#4a4e69', fontWeight: 600, textDecoration: 'none' }}>Contacts</a></Link>
        </nav>
      </header>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1rem 2rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#22223b', marginBottom: '2rem', letterSpacing: '-0.03em' }}>How It Works</h1>
        <ol style={{ color: '#22223b', marginBottom: '1.2rem', lineHeight: 1.7, paddingLeft: '1.2em', fontSize: '1.15rem' }}>
          <li>User enters a query or topic (e.g., "start of the special military operation")</li>
          <li>AI analyzes causal relationships, selecting relevant events</li>
          <li>An interactive 3D map is built: nodes are events, lines are their connections</li>
          <li>Color and size of nodes depend on category and significance</li>
          <li>Clicking an event opens a card with date, description, and links</li>
          <li>AI explains why events are connected and generates forecasts</li>
        </ol>
        <div style={{ marginBottom: '1.2rem' }}>
          <span style={{ fontWeight: 600, color: '#22223b', marginBottom: 4, display: 'block' }}>AI Assistant:</span>
          <ul style={{ color: '#444', marginBottom: '1.2rem', lineHeight: 1.7, paddingLeft: '1.2em' }}>
            <li>Helps collect connections</li>
            <li>Analyzes data and provides probabilities</li>
            <li>Builds hypotheses and simplifies complex structures</li>
          </ul>
        </div>
        <div>
          <span style={{ fontWeight: 600, color: '#22223b', marginBottom: 4, display: 'block' }}>Covered topics:</span>
          <ul style={{ color: '#444', marginBottom: '1.2rem', lineHeight: 1.7, paddingLeft: '1.2em' }}>
            <li>Politics, geopolitics, economy</li>
            <li>Natural disasters and climate</li>
            <li>Technology, AI, culture</li>
            <li>Demography, protests, wars, trade, energy</li>
          </ul>
        </div>
      </main>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
        <Link href="/beta" legacyBehavior>
          <a style={{
            padding: '1rem 2.5rem',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(90deg, #4a4e69 0%, #9a8c98 100%)',
            borderRadius: '2rem',
            boxShadow: '0 4px 24px rgba(74, 78, 105, 0.08)',
            textDecoration: 'none',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}>
            Go to Beta Version
          </a>
        </Link>
      </div>
      <footer style={{ textAlign: 'center', background: '#22223b', color: '#fff', fontSize: '0.95rem', padding: '1.5rem 0 2.5rem 0', marginTop: 0 }}>
        © CauseMap 2024. All rights reserved. &nbsp;
        <Link href="/legal" legacyBehavior>
          <a style={{ color: '#9a8c98', textDecoration: 'underline' }}>Legal</a>
        </Link>
      </footer>
    </div>
  );
} 