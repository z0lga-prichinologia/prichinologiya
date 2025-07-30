import Link from 'next/link';

export default function Home() {
  return (
    <main className="homepage-bg min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* CauseMap - Interactive 3D/2D Historical Events Visualization */}
      <header className="homepage-header text-center mb-12 animate-fadeIn">
        <h1 className="homepage-title">CauseMap</h1>
        <h2 className="homepage-subtitle">Visualize causes. Understand history.</h2>
        <p className="homepage-lead max-w-2xl mx-auto mt-6">
          An interactive 3D map of historical, political, economic, social, and cultural events — all connected by causal relationships. Reliable. Objective. Respectful.
        </p>
        <Link href="/beta" legacyBehavior>
          <a className="homepage-beta-btn mt-8 inline-block">BETA</a>
        </Link>
      </header>
      <section className="homepage-section max-w-3xl mx-auto mb-8 animate-fadeIn">
        <h3 className="homepage-section-title">Mission</h3>
        <p className="homepage-section-text">
          To make the complexity of historical causality accessible, objective, and educational for everyone. We believe that understanding the web of causes and effects behind world events empowers people to think critically and compassionately about the past, present, and future.
        </p>
      </section>
      <section className="homepage-section max-w-3xl mx-auto mb-8 animate-fadeIn">
        <h3 className="homepage-section-title">Values</h3>
        <ul className="homepage-values-list homepage-section-text">
          <li><b>Objectivity:</b> We strive for neutrality and avoid bias in presenting events and their relationships.</li>
          <li><b>Respect:</b> Sensitive topics are handled with care and empathy.</li>
          <li><b>Transparency:</b> All sources are verified and clearly referenced.</li>
          <li><b>Education:</b> We aim to inspire curiosity and critical thinking.</li>
        </ul>
      </section>
      <section className="homepage-section max-w-3xl mx-auto mb-8 animate-fadeIn">
        <h3 className="homepage-section-title">What Makes CauseMap Unique?</h3>
        <p className="homepage-section-text">
          Unlike traditional timelines or encyclopedias, CauseMap visualizes the intricate web of causes and effects, helping users see not just what happened, but why. Our interactive 3D network brings history to life, making connections visible and exploration intuitive.
        </p>
      </section>
      <section className="homepage-section max-w-3xl mx-auto animate-fadeIn">
        <h3 className="homepage-section-title">Who Is It For?</h3>
        <p className="homepage-section-text">
          Students, educators, researchers, and anyone curious about the world. CauseMap is designed for all who seek a deeper, unbiased understanding of history and its lessons.
        </p>
      </section>
    </main>
  );
}
