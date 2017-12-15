import React from 'react';

const Score = ({ scores }) => {
  if(scores){
    return scores.map((score, idx) => {
      return <div key={idx}>Puntos: {score}</div>
    });
  }
  return <div>No scores</div>
}

export default Score;
