import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from "next/head"

const menu = [
  { label: 'About', id: 'about' },
  { label: 'How it works', id: 'how' },
  { label: 'For investors', id: 'investors' },
  { label: 'Beta', id: 'beta' },
  { label: 'Contacts', id: 'contacts' },
];

export default function BetaPage() {
  const [stats, setStats] = useState({ events: 0, connections: 0, categories: 5 });

  useEffect(() => {
    // Загружаем статистику из файла данных
    fetch('/data/historical_events.json')
      .then(response => response.json())
      .then(events => {
        const connections = events.reduce((total, event) => total + event.causes.length, 0);
        setStats({
          events: events.length,
          connections: connections,
          categories: 5
        });
      })
      .catch(err => {
        console.error('Error loading stats:', err);
        setStats({ events: 50, connections: 120, categories: 5 });
      });
  }, []);

  return (
    <>
      <Head>
        <title>Interactive Graph - CauseMap</title>
        <meta name="description" content="Explore the interactive network of historical events and their connections." />
      </Head>
      
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
        
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 1rem 2rem 1rem' }}>
          {/* Hero Section */}
          <div style={{
            width: '100%',
            background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
            borderRadius: '2rem',
            boxShadow: '0 8px 32px rgba(74, 78, 105, 0.10)',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#22223b', marginBottom: '1.2rem', letterSpacing: '-0.03em' }}>
              CauseMap Beta
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#22223b', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '800px' }}>
              Welcome to the Beta version of CauseMap — an interactive 3D map of historical, political, economic, and cultural events, powered by AI. Explore causal connections, discover hidden patterns, and see history from a new perspective.
            </p>
            <Link href="/graph" legacyBehavior>
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
                Open the Interactive Map
              </a>
            </Link>
          </div>

          {/* Stats Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(74, 78, 105, 0.06)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4a4e69', marginBottom: '0.5rem' }}>
                {stats.events}
              </div>
              <div style={{ color: '#666', fontSize: '1rem' }}>Historical Events</div>
            </div>
            
            <div style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(74, 78, 105, 0.06)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4a4e69', marginBottom: '0.5rem' }}>
                {stats.connections}
              </div>
              <div style={{ color: '#666', fontSize: '1rem' }}>Causal Connections</div>
            </div>
            
            <div style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(74, 78, 105, 0.06)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4a4e69', marginBottom: '0.5rem' }}>
                {stats.categories}
              </div>
              <div style={{ color: '#666', fontSize: '1rem' }}>Event Categories</div>
            </div>
          </div>

          {/* Features Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(74, 78, 105, 0.06)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#22223b', marginBottom: '1rem' }}>
                🔍 Interactive Exploration
              </h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Navigate through a 3D network of historical events. Click on any node to see detailed information about causes, effects, and sources.
              </p>
            </div>
            
            <div style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(74, 78, 105, 0.06)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#22223b', marginBottom: '1rem' }}>
                🏷️ Smart Filtering
              </h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Filter events by category (war, politics, economy, technology, society) and search for specific events or topics.
              </p>
            </div>
            
            <div style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(74, 78, 105, 0.06)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#22223b', marginBottom: '1rem' }}>
                📅 Timeline Navigation
              </h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Explore history by time periods: WWI, WWII, Cold War, Modern era, or set custom year ranges to focus on specific decades.
              </p>
            </div>
          </div>

          {/* Timeline Features Section */}
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(74, 78, 105, 0.06)',
            marginBottom: '3rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22223b', marginBottom: '1.5rem', textAlign: 'center' }}>
              ⏰ New: Timeline Features
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#22223b', marginBottom: '0.5rem' }}>Quick Periods</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>One-click access to major historical periods</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎚️</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#22223b', marginBottom: '0.5rem' }}>Custom Ranges</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Set any year range from 1900 to 2024</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#22223b', marginBottom: '0.5rem' }}>Live Counter</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>See how many events are in your selected period</p>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(74, 78, 105, 0.06)',
            marginBottom: '3rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22223b', marginBottom: '1.5rem', textAlign: 'center' }}>
              Event Categories
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {[
                { name: 'War', color: '#dc2626', icon: '⚔️' },
                { name: 'Politics', color: '#2563eb', icon: '🏛️' },
                { name: 'Economy', color: '#ea580c', icon: '💰' },
                { name: 'Technology', color: '#9333ea', icon: '🚀' },
                { name: 'Society', color: '#6b7280', icon: '👥' }
              ].map(category => (
                <div key={category.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(74, 78, 105, 0.02)',
                  borderRadius: '0.5rem',
                  border: `2px solid ${category.color}20`
                }}>
                  <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>{category.icon}</span>
                  <span style={{ fontWeight: 600, color: '#22223b' }}>{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(90deg, #4a4e69 0%, #9a8c98 100%)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            color: '#fff'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Ready to Explore History?
            </h2>
            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
              This is an early access version. The map is updated automatically as new events are analyzed. More features and personal accounts are coming soon!
            </p>
            <Link href="/graph" legacyBehavior>
              <a style={{
                padding: '0.75rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#4a4e69',
                background: '#fff',
                borderRadius: '1.5rem',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'transform 0.2s'
              }}>
                Start Exploring
              </a>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
