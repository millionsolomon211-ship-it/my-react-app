import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '@/styles/index.css';

import bg1 from "../assets/fe5bd36bd6080de885259d59c9f68dd7.jpg";
import bg2 from "../assets/802671f7b3421f46cb6167d429a0fd94.jpg";

const backgroundImages = [bg1, bg2];

function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) { window.location.href = '/dashboard'; } 
      else { setErrorMessage(data.error || "Invalid Login"); }
    } catch (err) { setErrorMessage("Server error."); }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <div className="login-root" style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}>
      <div className="dark-overlay"></div>
      <div className="login-wrapper">
        <form className="pro-form" onSubmit={handleLogin}>
          <p id="heading">EXPLORE <span>ET</span></p>
          <p className="sub-heading">Welcome Back</p>

          {errorMessage && <div className="error-box">{errorMessage}</div>}

          <div className="field">
            <input placeholder="Username / Email" className="input-field" type="text" required
              onChange={e => setForm({ ...form, identifier: e.target.value })} />
          </div>

          <div className="field">
            <input placeholder="Password" className="input-field" type="password" required
              onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>

          <div className="btn-group">
            <button type="submit" className="button1">Login</button>
            <button type="button" className="button2" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>

          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" />
            Continue with Google
          </button>
          
          <button type="button" className="button3">Forgot Password?</button>
        </form>
      </div>

      <style>{`
        /* Keep your existing styles and add this: */
        .google-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-top: 10px; padding: 0.8em; border-radius: 12px;
          background: white; color: #333; font-weight: 600; cursor: pointer;
          border: none; transition: 0.3s;
        }
        .google-btn img { width: 18px; }
        .google-btn:hover { background: #f1f1f1; }
        
        .login-root { height: 100vh; width: 100vw; background-size: cover; display: flex; align-items: center; justify-content: center; position: relative; }
        .dark-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); }
        .login-wrapper { position: relative; z-index: 10; }
        .pro-form { display: flex; flex-direction: column; gap: 15px; padding: 2.5em; background: rgba(23,23,23,0.9); border-radius: 20px; width: 350px; }
        .field { background: #121212; padding: 1em; border-radius: 10px; }
        .input-field { background: none; border: none; color: white; width: 100%; outline: none; }
        .btn-group { display: flex; gap: 10px; }
        .button1 { flex: 1; background: #00bfff; padding: 0.8em; border-radius: 10px; color: white; border: none; cursor: pointer; }
        .button2 { flex: 1; background: #333; padding: 0.8em; border-radius: 10px; color: white; border: none; cursor: pointer; }
        #heading { color: white; font-size: 1.5rem; text-align: center; }
        .sub-heading { color: #888; text-align: center; margin-bottom: 10px; }
      `}</style>
    </div>
  );
}

export default Login;