import React from "react";

const ThingsToDo = () => {
  const activities = [
    { name: "Coffee Ceremony", duration: "1-2 Hours", intensity: "Low" },
    { name: "Trekking", duration: "Full Day", intensity: "High" },
    { name: "Museum Tour", duration: "3 Hours", intensity: "Medium" },
    { name: "Cuisine Tasting", duration: "Evening", intensity: "Low" },
  ];

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Curated Experiences</h2>
      <p style={{ opacity: 0.8, marginBottom: '30px' }}>Don't just visit—immerse yourself in the culture.</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <th style={{ padding: '15px 10px', opacity: 0.6 }}>Activity</th>
            <th style={{ padding: '15px 10px', opacity: 0.6 }}>Duration</th>
            <th style={{ padding: '15px 10px', opacity: 0.6 }}>Intensity</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((act, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '20px 10px', fontWeight: 'bold' }}>{act.name}</td>
              <td style={{ padding: '20px 10px', opacity: 0.8 }}>{act.duration}</td>
              <td style={{ padding: '20px 10px' }}>
                <span style={{ 
                  padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem',
                  background: act.intensity === 'High' ? 'rgba(255,75,75,0.2)' : 'rgba(74,255,147,0.2)',
                  color: act.intensity === 'High' ? '#ff4b4b' : '#4aff93'
                }}>
                  {act.intensity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThingsToDo;