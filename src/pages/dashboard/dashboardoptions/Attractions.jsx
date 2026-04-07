import React from "react";

const Attractions = () => {
  const sites = [
    { id: 1, name: "Lalibela", type: "Historical", rating: "5.0", status: "Open" },
    { id: 2, name: "Simien Mountains", type: "Nature", rating: "4.9", status: "Open" },
    { id: 3, name: "Danakil Depression", type: "Adventure", rating: "4.8", status: "Seasonal" },
    { id: 4, name: "Axum Stelae", type: "Heritage", rating: "4.7", status: "Open" },
  ];

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Top Attractions</h2>
      <p style={{ opacity: 0.8, marginBottom: '30px' }}>Explore the soul of Ethiopia through these hand-picked destinations.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {sites.map(site => (
          <div key={site.id} style={{ 
            background: 'rgba(255,255,255,0.05)', 
            padding: '20px', 
            borderRadius: '15px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ fontSize: '0.8rem', background: '#00bfff', padding: '4px 10px', borderRadius: '20px' }}>{site.type}</span>
              <span style={{ color: '#ffd700' }}>★ {site.rating}</span>
            </div>
            <h3 style={{ marginBottom: '5px' }}>{site.name}</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '15px' }}>Discover the breathtaking architecture and deep-rooted history of this world heritage site.</p>
            <div style={{ fontSize: '0.8rem', color: site.status === 'Open' ? '#4aff93' : '#ffb34a' }}>
              ● {site.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attractions;