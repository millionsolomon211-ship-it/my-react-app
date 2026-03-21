import React, { useState } from 'react';

const CookieApp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', username: '', phone: '',
    email: '', location: '', birthDate: '', password: '', loginId: ''
  });

  // --- Cookie Helper Functions ---
  const getDb = () => {
    const cookieData = document.cookie.split('; ').find(row => row.startsWith('user_db='));
    return cookieData ? JSON.parse(decodeURIComponent(cookieData.split('=')[1])) : [];
  };

  const saveToDb = (newUser) => {
    const db = getDb();
    db.push(newUser);
    document.cookie = `user_db=${encodeURIComponent(JSON.stringify(db))}; path=/; max-age=31536000`;
  };

  // --- Handlers ---
  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignIn = (e) => {
    e.preventDefault();
    saveToDb(formData);
    console.log(`Successfully signed in: ${formData.fullName}`);
    alert(`Account created for ${formData.fullName}!`);
    setIsLogin(true);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const db = getDb();
    const user = db.find(u => 
      (u.username === formData.loginId || u.email === formData.loginId || u.phone === formData.loginId) 
      && u.password === formData.password
    );

    if (user) {
      console.log(`Successfully logged in: ${user.fullName}`);
      alert(`Welcome back, ${user.fullName}!`);
    } else {
      alert("Invalid credentials. Check your username/email/phone or password.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #a40000', borderRadius: '8px' }}>
      <h2>{isLogin ? 'Login' : 'Sign In'}</h2>
      <form onSubmit={isLogin ? handleLogIn : handleSignIn}>
        {!isLogin && (
          <>
            <input name="fullName" placeholder="Name" onChange={handleInput} required /><br/>
            <input name="fatherName" placeholder="Father's Name" onChange={handleInput} required /><br/>
            <input name="phone" type="Nember"  placeholder="Phone" onChange={handleInput} required /><br/>
            <input name="email" type="email" placeholder="Email" onChange={handleInput} required /><br/>
            <input name="location" placeholder="Location" onChange={handleInput} required /><br/>
            <input name="birthDate" type="date" onChange={handleInput} required /><br/>
            <input name="username" placeholder="Username" onChange={handleInput} required /><br/>
          </>
        )}
        
        {isLogin && (
          <input name="loginId" placeholder="Username, Email, or Phone" onChange={handleInput} required />
        )}

        <div style={{ position: 'relative' }}>
          <input 
            name="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            onChange={handleInput} 
            required 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            style={{ marginLeft: '5px', fontSize: '12px' }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" style={{ marginTop: '10px', width: '100%' }}>
          {isLogin ? 'Log In' : 'Register'}
        </button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center' }}>
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </p>
    </div>
  );
};

export default CookieApp;