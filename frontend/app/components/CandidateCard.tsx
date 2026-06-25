import { Candidate } from '../lib/api';

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <div className="card">
      <h3 className="card-title">{candidate.name}</h3>
      <p className="card-subtitle">{candidate.email}</p>
      <div className="pill-container">
        {candidate.skills.map((skill, index) => (
          <span key={index} className="pill">{skill}</span>
        ))}
        {candidate.skills.length === 0 && <span className="pill">No skills listed</span>}
      </div>
      <p className="card-subtitle" style={{ marginTop: '1rem', marginBottom: 0 }}>
        {candidate.experience_years} years experience
      </p>
    </div>
  );
}
