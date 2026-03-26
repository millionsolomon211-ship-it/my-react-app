import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ loginId: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call backend API
    // Inside your handleSubmit function:
const res = await fetch("http://localhost:3000/login", { // Added /login
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(form)
});
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token); // store JWT
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        name="loginId"
        placeholder="Username / Email / Phone"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;