// src/dashboardoptions/main.jsx
import React from 'react';

export default function Main() {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Welcome, </h1>
      <p>This is your central overview. Select an option from the sidebar to begin.</p>
      
      {/* Add a border just to see if the box is actually rendering */}
      <div style={{ border: '2px dashed rgba(255,255,255,0.3)', padding: '40px', marginTop: '20px' }}>
        Content will appear here.
      </div>
    </div>
  );
}