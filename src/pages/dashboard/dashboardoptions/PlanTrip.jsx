import React from "react";

const PlanTrip = () => {
  return (
    <div className="fade-in">
      <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Plan Your Adventure</h2>
      <p style={{ opacity: 0.8, marginBottom: '30px' }}>Customize your itinerary with our premium travel tools.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {['Select Dates', 'Choose Accommodation', 'Transport Mode', 'Local Guide'].map((step, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(255,255,255,0.05)', 
            padding: '20px', 
            borderRadius: '12px',
            cursor: 'pointer',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: '#00bfff', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px', fontWeight: 'bold' 
            }}>
              {index + 1}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>{step}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6 }}>Configure your preferences for a seamless experience.</p>
            </div>
            <span style={{ opacity: 0.4 }}>→</span>
          </div>
        ))}
      </div>

      <button style={{ 
        marginTop: '30px', width: '100%', padding: '15px', borderRadius: '10px', 
        border: 'none', background: '#00bfff', color: 'white', fontWeight: 'bold', cursor: 'pointer' 
      }}>
        Generate Full Itinerary
      </button>
    </div>
  );
};

export default PlanTrip;