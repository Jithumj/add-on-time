import React,{useEffect} from 'react';
import { scoreStore } from './zustand/Store';

export default function Dashboard() {
    const{scores, loading, error, fetchScores}=scoreStore();
    useEffect(() => {
        fetchScores();
        // Optionally, poll every minute for live updates
        const interval = setInterval(fetchScores, 60000);
        return () => clearInterval(interval);
      }, [fetchScores]);
    
      if (loading) return <div>Loading live scores...</div>;
      if (error) return <div>{error}</div>;
  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      {scores.length === 0 && <div>No live matches right now.</div>}
      {scores.map((match) => (
        <div key={match.idEvent} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
          <h3>{match.strEvent}</h3>
          <div>
            <strong>{match.strHomeTeam}</strong> {match.intHomeScore} - {match.intAwayScore} <strong>{match.strAwayTeam}</strong>
          </div>
          <div>Status: {match.strStatus || 'N/A'}</div>
        </div>
      ))}
    </div>
  )
}
