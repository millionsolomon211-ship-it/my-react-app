import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch('http://localhost:3000/api/login',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        // CRITICAL: This allows the browser to receive and store the HttpOnly cookie
        credentials: 'include' 
      });

      const data = await res.json();

      if (res.ok) {
        /** * SUCCESS: 
         * We no longer use localStorage.setItem("token").
         * Using window.location.href forces a full reload, which triggers 
         * the 'verifyUser' useEffect in your App.js to detect the new cookie.
         */
        window.location.href = '/dashboard';
      } else {
        setErrorMessage(data.error || data.message || "Invalid Login");
      }
    } catch (err) {
      setErrorMessage("Server error. Is the backend running?");
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleLogin} style={{ minWidth: '350px' }}>
        <p className="title">Welcome Back</p>
        <p className="message">Log in to your secure dashboard.</p>

        {errorMessage && (
          <div style={{ 
            color: '#ff4d4d', 
            backgroundColor: '#ffe6e6', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px',
            fontSize: '14px',
            border: '1px solid #ffcccc'
          }}>
            {errorMessage}
          </div>
        )}

        <label>
          <input 
            className="input" 
            type="text" 
            placeholder=" " 
            required 
            onChange={e => setForm({ ...form, identifier: e.target.value })} 
          />
          <span>User / Email / Phone</span>
        </label>

        <label>
          <input 
            className="input" 
            type="password" 
            placeholder=" " 
            required 
            onChange={e => setForm({ ...form, password: e.target.value })} 
          />
          <span>Password</span>
        </label>

        <button type="submit" className="submit">Login</button>

        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#333' }}></div>
          <span style={{ padding: '0 10px', fontSize: '12px', color: '#555' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#333' }}></div>
        </div>

        <p className="signin">
          New user? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;