export interface Candidate {
  id?: number;
  name: string;
  email: string;
  skills: string[];
  experience_years: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function fetchCandidates(): Promise<Candidate[]> {
  const res = await fetch(`${API_BASE_URL}/api/candidates/`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch candidates');
  }
  return res.json();
}

export async function createCandidate(candidate: Candidate): Promise<Candidate> {
  const res = await fetch(`${API_BASE_URL}/api/candidates/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(candidate),
  });
  if (!res.ok) {
    throw new Error('Failed to create candidate');
  }
  return res.json();
}
