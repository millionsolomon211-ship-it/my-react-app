import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '@/styles/index.css';

// Using the same assets as Login for a consistent brand feel
import bg1 from "../assets/fe5bd36bd6080de885259d59c9f68dd7.jpg";
import bg2 from "../assets/802671f7b3421f46cb6167d429a0fd94.jpg";

const backgroundImages = [bg1, bg2];

function Signup() {
  const [formData, setFormData] = useState({ 
    full_Name: '', 
    username: '', 
    email: '', 
    phone: '', 
    password: '' 
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();

  // Background Switcher Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include' 
      });
      
      const data = await response.json();

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        setErrorMessage(data.error || data.message || "Signup failed");
      }
    } catch (err) {
      setErrorMessage("Server connection error. Is the backend running?");
    }
  };

  return (
    <div className="login-root" style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}>
      <div className="dark-overlay"></div>
      
      <div className="login-wrapper">
        <form className="pro-form signup-form" onSubmit={handleSignup}>
          <p id="heading">EXPLORE <span>ET</span></p>
          <p className="sub-heading">Create New Account</p>

          {errorMessage && (
            <div className="error-box">
              {errorMessage}
            </div>
          )}

          {/* Full Name */}
          <div className="field">
            <svg className="input-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg>
            <input 
              placeholder="Full Name" className="input-field" type="text" required 
              onChange={e => setFormData({...formData, full_Name: e.target.value})} 
            />
          </div>

          {/* Username */}
          <div className="field">
            <svg className="input-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/></svg>
            <input 
              placeholder="Username" className="input-field" type="text" required 
              onChange={e => setFormData({...formData, username: e.target.value})} 
            />
          </div>

          {/* Email */}
          <div className="field">
            <svg className="input-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/></svg>
            <input 
              placeholder="Email Address" className="input-field" type="email" required 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          {/* Phone */}
          <div className="field">
            <svg className="input-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/></svg>
            <input 
              placeholder="Phone Number" className="input-field" type="text" required 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, "")})} 
            />
          </div>

          {/* Password */}
          <div className="field">
            <svg className="input-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>
            <input 
              placeholder="Password" className="input-field" type="password" required 
              onChange={e => setFormData({...formData, password: e.target.value})} 
            />
          </div>

          <button type="submit" className="button1 signup-btn">Create Account</button>
          
          <p className="signin-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>

      <style>{`
        .login-root {
          height: 100vh; width: 100vw;
          background-size: cover;
          background-position: center;
          transition: background-image 1.5s ease-in-out;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .dark-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%);
          z-index: 1;
        }

        .login-wrapper { position: relative; z-index: 10; width: 100%; display: flex; justify-content: center;}

        .pro-form {
          display: flex; flex-direction: column; gap: 12px;
          padding: 3em 2.5em;
          background-color: rgba(23, 23, 23, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: .4s ease-in-out;
          width: 420px;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.6);
        }

        .pro-form:hover {
          border: 1px solid rgba(0, 191, 255, 0.4);
        }

        #heading {
          text-align: center; margin: 0;
          color: white; font-size: 2em; font-weight: 900;
          letter-spacing: 4px;
        }
        #heading span { color: #00bfff; }

        .sub-heading {
          text-align: center; color: #a0a0a0;
          margin-bottom: 1.5em; font-size: 0.85em; letter-spacing: 2px;
          text-transform: uppercase;
        }

        .error-box {
          color: #ff4d4d; background: rgba(255, 77, 77, 0.1);
          padding: 10px; border-radius: 10px; font-size: 13px;
          border: 1px solid rgba(255, 77, 77, 0.2); text-align: center;
        }

        .field {
          display: flex; align-items: center; justify-content: center;
          gap: 1em; border-radius: 12px; padding: 0.8em 1em;
          color: white; background-color: #121212;
          box-shadow: inset 2px 5px 15px rgba(0, 0, 0, 0.5);
          border: 1px solid transparent; transition: 0.3s;
        }
        .field:focus-within { border-color: #00bfff; }

        .input-icon { height: 1.1em; width: 1.1em; fill: #00bfff; }

        .input-field {
          background: none; border: none; outline: none;
          width: 100%; color: #fff; font-size: 0.9em;
        }

        .signup-btn {
          margin-top: 1.5em; padding: 1em; border-radius: 12px;
          border: none; background-color: #00bfff; color: white;
          font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
          cursor: pointer; transition: 0.3s;
        }
        .signup-btn:hover { background-color: #00d2ff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 191, 255, 0.4); }

        .signin-link {
          text-align: center; margin-top: 1.5em;
          color: #666; font-size: 0.85em;
        }
        .signin-link a { color: #00bfff; text-decoration: none; font-weight: 600; }
        .signin-link a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}

export default Signup;