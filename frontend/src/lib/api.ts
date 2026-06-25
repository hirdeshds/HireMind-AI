export interface Candidate {
  id?: number;
  name: string;
  email: string;
  skills: string[];
  experience_years: number;
}

export async function fetchCandidates(): Promise<Candidate[]> {
  const res = await fetch('/api/candidates/', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch candidates');
  }
  return res.json();
}

export async function createCandidate(candidate: Candidate): Promise<Candidate> {
  const res = await fetch('/api/candidates/', {
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
