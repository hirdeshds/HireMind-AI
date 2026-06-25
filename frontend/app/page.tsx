import Link from 'next/link';
import { fetchCandidates } from './lib/api';
import CandidateCard from './components/CandidateCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let candidates = [];
  try {
    candidates = await fetchCandidates();
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="container">
      <nav className="nav">
        <Link href="/" className="nav-logo">HireMind AI</Link>
        <Link href="/add-candidate" className="btn">Add Candidate</Link>
      </nav>

      <header className="header">
        <h1 className="header-title">Candidate Dashboard</h1>
        <p className="header-subtitle">Manage and review your AI-matched candidates</p>
      </header>

      {candidates.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>No candidates found in the database. Add one to get started!</p>
        </div>
      ) : (
        <div className="grid">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </div>
  );
}
