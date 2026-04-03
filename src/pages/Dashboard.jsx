import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User", email: "user@example.com" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleLogout = async () => {
  try {
    await fetch('http://localhost:3000/api/logout', { 
      method: 'POST',
      credentials: 'include' 
    });
    // Redirecting will trigger App.jsx to realize the user is logged out
    window.location.href = '/login';
  } catch (err) {
    console.error("Logout failed", err);
  }
};

  return (
    <div className="dashboard-layout">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div style={{width: '12px', height: '12px', background: '#00bfff', borderRadius: '50%'}}></div>
          VIP PROJECT
        </div>
        
        <nav>
          <div className="nav-item active">🏠 Dashboard</div>
          <div className="nav-item">👤 Profile</div>
          <div className="nav-item">📊 Analytics</div>
          <div className="nav-item">⚙️ Settings</div>
        </nav>

        <div style={{marginTop: 'auto'}}>
          <button onClick={handleLogout} className="btn-logout" style={{width: '100%'}}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN SECTION */}
      <main className="main-area">
        {/* TOP HEADER */}
        <header className="top-header">
          <div style={{color: '#888'}}>Search something...</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <span style={{fontSize: '14px'}}>{user.name}</span>
            <div style={{width: '35px', height: '35px', background: '#333', borderRadius: '50%', border: '1px solid #00bfff'}}></div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="content-body">
          <h2 style={{margin: 0}}>Overview</h2>
          <p style={{color: '#666', fontSize: '14px'}}>Welcome back to your control panel.</p>

          {/* STATIC STATS (To make it look like a real dashboard) */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Sessions</h3>
              <p>1,284</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p>42</p>
            </div>
            <div className="stat-card">
              <h3>Server Status</h3>
              <p style={{color: '#00ff88'}}>Online</p>
            </div>
          </div>

          <div style={{marginTop: '40px', background: '#1e1e1e', padding: '40px', borderRadius: '15px', border: '1px dashed #444', textAlign: 'center'}}>
             <p style={{color: '#888'}}>No recent activity to display.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;