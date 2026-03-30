import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // GOOGLE SIGN-IN LOGIC
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate('/dashboard');
      } else {
        setErrorMessage(data.error || data.message || "Invalid Login");
      }
    } catch (err) {
      setErrorMessage("Server error.");
    }
  };

  return (
    <form className="form" onSubmit={handleLogin} style={{ minWidth: '350px' }}>
      <p className="title">Welcome Back</p>
      <p className="message">Log in to your secure dashboard.</p>

      {errorMessage && <div className="err-box">{errorMessage}</div>}

      <label>
        <input className="input" type="text" placeholder=" " required 
          onChange={e => setForm({...form, identifier: e.target.value})} />
        <span>User / Email / Phone</span>
      </label>

      <label>
        <input className="input" type="password" placeholder=" " required 
          onChange={e => setForm({...form, password: e.target.value})} />
        <span>Password</span>
      </label>

      <button className="submit">Login</button>

      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <div style={{ flex: 1, height: '1px', background: '#333' }}></div>
        <span style={{ padding: '0 10px', fontSize: '12px', color: '#555' }}>OR</span>
        <div style={{ flex: 1, height: '1px', background: '#333' }}></div>
      </div>

    

      <p className="signin">New user? <Link to="/signup">Register</Link></p>
    </form>
  );
}

export default Login;