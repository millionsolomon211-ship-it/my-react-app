import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Image Assets
import bg1 from "../../assets/fe5bd36bd6080de885259d59c9f68dd7.jpg";
import bg2 from "../../assets/802671f7b3421f46cb6167d429a0fd94.jpg";
import bg3 from "../../assets/e7c2e3158c2942f27a73a74d925ac494.jpg";
import bg4 from "../../assets/18a78c3adc1d77abecf2e1e819f19fad.jpg";
const images = [bg1, bg2, bg3, bg4];


function Dashboard() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("main");
  const [bgIndex, setBgIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // FIXED LOGOUT LOGIC: Hits the backend to kill the session/cookie
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/logout', { 
        method: 'POST', 
        credentials: 'include' 
      });
      // Clear any local storage tokens just in case
      localStorage.removeItem('token'); 
      // Force refresh to /login so the Auth Guard in App.js triggers
      window.location.href = '/login'; 
    } catch (err) {
      console.error("Logout failed:", err);
      window.location.href = '/login';
    }
  };

  const renderContent = () => {
    if (currentTab !== "main") {
      switch (currentTab) {
        case "Attractions": return <Attractions />;
        case "Plan your trip": return <PlanTrip />;
        case "Things to do": return <ThingsToDo />;
        default: return <Main />;
      }
    }

    return (
      <div className="hero-content">
        <h1 className="hero-title">TRAVEL</h1>
        <p className="hero-subtitle">AND LEARN THE BEST WAY TO DO IT</p>
        <button className="cta-btn" onClick={() => setCurrentTab("Plan your trip")}>START NOW</button>
        
        <div className="discovery-container scroll-1">
          <div className="travel-card" onClick={() => setCurrentTab("Attractions")}>
            <div className="card__image img-fusce"></div>
            <div className="card__content">
              <span className="card__title">The Fusce</span>
              <p className="card__describe">Explore the hidden emerald lagoons of the north.</p>
            </div>
          </div>
          <div className="travel-card" onClick={() => setCurrentTab("Things to do")}>
            <div className="card__image img-venetatis"></div>
            <div className="card__content">
              <span className="card__title">The Venetatis</span>
              <p className="card__describe">Walk through history in the ancient stone arches.</p>
            </div>
          </div>
          <div className="travel-card">
            <div className="card__image img-vitae"></div>
            <div className="card__content">
              <span className="card__title">The Vitae</span>
              <p className="card__describe">Breathtaking summits waiting for your discovery.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pro-dashboard" style={{ backgroundImage: `url(${images[bgIndex]})` }}>
      <div className="dark-overlay"></div>

      <header className="pro-navbar">
        <div className="logo-area" onClick={() => setCurrentTab("main")}>
          LOGOTYPE
        </div>
        <nav className="nav-links">
          <button onClick={() => setCurrentTab("main")}>HOME</button>
          <button onClick={() => setCurrentTab("Attractions")}>DESTINATIONS</button>
          <button onClick={() => setCurrentTab("Plan your trip")}>SELECTION</button>
          <button onClick={() => setCurrentTab("Things to do")}>ABOUT US</button>
          <button className="login-outline" onClick={handleLogout}>LOG OUT</button>
        </nav>
      </header>

      <aside className={`utility-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="side-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "✕" : "☰"}
        </button>
        
        <div className="uiverse-menu-card">
          <ul className="list" style={{"--color":"#5353ff","--hover-storke":"#fff", "--hover-color":"#fff"}}>
            <li className="element">
              <label onClick={() => setCurrentTab("Profile")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {isSidebarOpen && "Profile"}
              </label>
            </li>
            <li className="element">
              <label onClick={() => setCurrentTab("Settings")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                {isSidebarOpen && "Settings"}
              </label>
            </li>
            <div className="separator"></div>
            <li className="element delete">
              <label onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                {isSidebarOpen && "Logout"}
              </label>
            </li>
          </ul>
        </div>
      </aside>

      <main className="main-viewport">
        {renderContent()}
      </main>

      <style>{`
        .pro-dashboard {
          height: 100vh; width: 100vw; overflow: hidden;
          background-size: cover; background-position: center;
          transition: background-image 1.5s ease-in-out;
          color: white; font-family: 'Inter', sans-serif;
          position: relative; display: flex; flex-direction: column;
        }

        .dark-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%);
          z-index: 1;
        }

        /* NAVBAR */
        .pro-navbar {
          position: relative; z-index: 10;
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 60px; height: 100px;
        }
        .logo-area { font-weight: 900; letter-spacing: 4px; font-size: 1.2rem; cursor: pointer; }
        .nav-links { display: flex; gap: 30px; align-items: center; }
        .nav-links button {
          background: none; border: none; color: white; cursor: pointer;
          font-size: 0.8rem; letter-spacing: 1.5px; opacity: 0.8; transition: 0.3s;
        }
        .nav-links button:hover { opacity: 1; }
        .login-outline { border: 1px solid white !important; padding: 8px 20px; }

        /* HERO CONTENT */
        .main-viewport { flex: 1; position: relative; z-index: 5; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow-y: auto; }
        .hero-content { text-align: center; width: 100%; padding-top: 40px; }
        .hero-title { font-size: 8rem; font-weight: 200; letter-spacing: 25px; margin: 0; }
        .hero-subtitle { font-size: 1.2rem; letter-spacing: 4px; opacity: 0.9; margin-bottom: 40px; }
        .cta-btn {
          background: #141414; color: white; border: none;
          padding: 15px 45px; font-size: 1rem; letter-spacing: 2px;
          cursor: pointer; transition: 0.3s; margin-bottom: 60px;
        }
        .cta-btn:hover { background: white; color: black; }

        /* CARDS */
        .discovery-container {
          display: flex; gap: 30px; padding: 20px 60px;
          overflow-x: auto; width: 100%; max-width: 1400px; margin: 0 auto;
          scroll-snap-type: x mandatory;
        }
        .travel-card {
          flex: 0 0 350px; background: rgba(20, 20, 20, 0.9);
          border-radius: 4px; overflow: hidden; cursor: pointer;
          transition: transform 0.3s; scroll-snap-align: start;
        }
        .travel-card:hover { transform: translateY(-10px); }
        .card__image { height: 180px; background-size: cover; background-position: center; }
        .img-fusce { background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'); }
        .img-venetatis { background-image: url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80'); }
        .img-vitae { background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'); }
        .card__content { padding: 25px; text-align: left; }
        .card__title { font-size: 1.5rem; display: block; margin-bottom: 10px; font-weight: bold; }
        .card__describe { font-size: 0.9rem; opacity: 0.7; line-height: 1.4; }

        /* SIDEBAR */
        .utility-sidebar { position: fixed; right: 0; top: 50%; transform: translateY(-50%); z-index: 100; transition: 0.4s; }
        .utility-sidebar.closed { right: -230px; }
        .side-toggle {
          position: absolute; left: -50px; top: 0;
          background: #242832; color: white; border: none;
          width: 50px; height: 50px; cursor: pointer;
        }
        .uiverse-menu-card { width: 230px; background: #242832; border-radius: 10px 0 0 10px; padding: 15px; display: flex; flex-direction: column; gap: 8px; }
        .list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 5px; }
        .element label { display: flex; align-items: center; color: #7e8590; gap: 15px; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: 0.3s; }
        .element label svg { width: 20px; height: 20px; stroke: #7e8590; }
        .element label:hover { background: var(--color); color: white; }
        .element label:hover svg { stroke: white; }
        .separator { border-top: 1.5px solid #42434a; margin: 5px 0; }
        .delete label:hover { background: #8e2a2a; }

        /* RESPONSIVE FIXES */
        @media (max-width: 1024px) {
          .hero-title { font-size: 5rem; letter-spacing: 15px; }
          .nav-links { gap: 15px; }
          .pro-navbar { padding: 20px 30px; }
        }

        @media (max-width: 768px) {
          .nav-links button:not(.login-outline) { display: none; }
          .hero-title { font-size: 3.5rem; letter-spacing: 8px; }
          .hero-subtitle { font-size: 0.9rem; padding: 0 20px; }
          .discovery-container { padding: 20px; }
          .travel-card { flex: 0 0 280px; }
        }

        .scroll-1::-webkit-scrollbar { height: 4px; }
        .scroll-1::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default Dashboard;