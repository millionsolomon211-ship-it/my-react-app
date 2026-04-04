import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. FIXED PATHS: Use '../assets' to go up from the 'pages' folder
import bg1 from "../assets/fe5bd36bd6080de885259d59c9f68dd7.jpg";
import bg2 from "../assets/802671f7b3421f46cb6167d429a0fd94.jpg";
import bg3 from "../assets/e7c2e3158c2942f27a73a74d925ac494.jpg";
import bg4 from "../assets/18a78c3adc1d77abecf2e1e819f19fad.jpg";

// 2. CORE SUB-PAGES
import Attractions from "./dashboardoptions/Attractions";
import PlanTrip from "./dashboardoptions/PlanTrip";
import ThingsToDo from "./dashboardoptions/ThingsToDo";
import Main from "./dashboardoptions/main";

// 3. UTILITY SUB-PAGES (Ensure these files exist or keep them commented out)
// import Profile from "./dashboardoptions/Profile";
// import Settings from "./dashboardoptions/Settings";
// import Help from "./dashboardoptions/Help";

function Dashboard() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("main");
  const [bgIndex, setBgIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const images = [bg1, bg2, bg3, bg4];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/login';
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case "Attractions": return <Attractions />;
      case "Plan your trip": return <PlanTrip />;
      case "Things to do": return <ThingsToDo />;
      // For now, these return placeholders if you haven't made the files yet:
      case "Profile": return <div className="placeholder">Profile View coming soon...</div>;
      case "Settings": return <div className="placeholder">Settings View coming soon...</div>;
      case "Help": return <div className="placeholder">Help Center coming soon...</div>;
      default: return <Main />;
    }
  };

  return (
    <div className="dashboard-root" style={{ backgroundImage: `url(${images[bgIndex]})` }}>
      <div className="overlay"></div>

      {/* --- RETRACTABLE SIDEBAR --- */}
      <aside className={`sidebar ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "✕" : "☰"}
        </button>

        <div className="sidebar-nav">
          <div className="nav-group">
            <button onClick={() => setCurrentTab("Profile")} className={currentTab === "Profile" ? "active" : ""}>
              <span className="icon">👤</span> {isSidebarOpen && "Profile"}
            </button>
            <button onClick={() => setCurrentTab("Settings")} className={currentTab === "Settings" ? "active" : ""}>
              <span className="icon">⚙️</span> {isSidebarOpen && "Settings"}
            </button>
            <button onClick={() => setCurrentTab("Help")} className={currentTab === "Help" ? "active" : ""}>
              <span className="icon">❓</span> {isSidebarOpen && "Help"}
            </button>
          </div>
          
          <button onClick={handleLogout} className="logout-btn">
            <span className="icon">🚪</span> {isSidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="viewport">
        <header className="navbar">
          <div className="brand" onClick={() => setCurrentTab("main")}> <img className="logoimg" src="https://i.pinimg.com/736x/5d/39/24/5d3924efa5d05124ba6388f6424bf96a.jpg"/> 

        {/* BURGER ICON (Visible on Mobile) */}
            EXPLORE <span>ET</span>
          </div>
          <div className="main-nav">
            <button onClick={() => setCurrentTab("Attractions")}>Attractions</button>
            <button onClick={() => setCurrentTab("Plan your trip")}>Plan Trip</button>
            <button onClick={() => setCurrentTab("Things to do")}>Things to Do</button>
          </div>
        </header>

        <main className="content-wrap">
          <div className="glass-panel">
            {renderContent()}
          </div>
        </main>
      </div>

      <style>{`
        .dashboard-root {
          display: flex; height: 100vh; width: 100vw;
          background-size: cover; background-position: center;
          transition: background-image 1.2s ease-in-out;
          color: white; font-family: 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }

        .overlay {
          position: absolute; inset: 0;
          background: radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
          z-index: 1; pointer-events: none;
        }

        .sidebar {
          position: relative; z-index: 100;
          background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255,255,255,0.1);
          display: flex; flex-direction: column; transition: 0.3s;
        }
        .collapsed { width: 70px; }
        .expanded { width: 220px; }

        .toggle-btn {
          background: none; border: none; color: white;
          padding: 25px; cursor: pointer; font-size: 1.2rem;
        }

        .sidebar-nav { flex: 1; display: flex; flex-direction: column; padding: 10px; }
        .nav-group { flex: 1; }
        
        .sidebar-nav button {
          width: 100%; display: flex; align-items: center;
          background: none; border: none; color: white;
          padding: 12px 15px; border-radius: 10px; cursor: pointer;
          margin-bottom: 5px; transition: 0.2s; white-space: nowrap;
        }
        .sidebar-nav button:hover { background: rgba(255,255,255,0.1); }
        .sidebar-nav button.active { background: #00bfff; font-weight: bold; }
        .icon { margin-right: 15px; min-width: 20px; text-align: center; }

        .logout-btn { color: #ff4b4b !important; margin-bottom: 10px; }

        .viewport { flex: 1; display: flex; flex-direction: column; z-index: 10; position: relative; }
        
        .navbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0 40px; height: 80px; background: rgba(0,0,0,0.2);
        }
        .brand { font-size: 1.5rem; font-weight: 800; cursor: pointer; letter-spacing: 2px; }
        .brand span { color: #00bfff; }

        .main-nav button {
          background: none; border: none; color: white; margin-left: 25px;
          cursor: pointer; font-size: 1rem; opacity: 0.7; transition: 0.3s;
        }
        .main-nav button:hover { opacity: 1; color: #00bfff; }

        .content-wrap { flex: 1; padding: 40px; display: flex; justify-content: center; overflow-y: auto; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px; width: 100%; max-width: 1200px;
          padding: 40px; min-height: 60vh;
        }
        .placeholder { text-align: center; padding: 100px; font-size: 1.2rem; opacity: 0.5; }
      `}</style>
    </div>
  );
}

export default Dashboard;