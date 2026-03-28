import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ 
    full_Name: '', username: '', email: '', phone: '', password: '' 
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate('/dashboard');
      } else {
        setErrorMessage(data.error || data.message || "Signup failed");
      }
    } catch (err) {
      setErrorMessage("Server connection error. Is the backend running?");
    }
  };

  return (
    <form className="form" onSubmit={handleSignup}>
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our app.</p>
      
      {errorMessage && <div className="err-box">{errorMessage}</div>}

      <div className="flex">
        <label>
          <input className="input" type="text" placeholder=" " required 
            onChange={e => setFormData({...formData, full_Name: e.target.value})} />
          <span>Full tname</span>
        </label>
        
      </div>

      <label>
        <input className="input" type="text" placeholder=" " required 
          onChange={e => setFormData({...formData, username: e.target.value})} />
        <span>Username</span>
      </label>

      <label>
        <input className="input" type="email" placeholder=" " required 
          onChange={e => setFormData({...formData, email: e.target.value})} />
        <span>Email</span>
      </label>

      <label>
        <input className="input" type="text" placeholder=" " required 
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, "")})} />
        <span>Phone</span>
      </label>

      <label>
        <input className="input" type="password" placeholder=" " required 
          onChange={e => setFormData({...formData, password: e.target.value})} />
        <span>Password</span>
      </label>

      <button className="submit">Create Account</button>
      <p className="signin">Already have an account? <Link to="/login">Log In</Link></p>
    </form>
  );
}

export default Signup;