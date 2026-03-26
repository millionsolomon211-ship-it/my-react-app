import express from 'express';
import cors from 'cors'; // Import this!

const app = express();
const PORT = 3000;

app.use(cors()); // Allow React to talk to the Server
app.use(express.json()); // Allow the server to read JSON from React

// Change this to .post to match your React code
app.post('/login', (req, res) => {
    const { loginId, password } = req.body; // Get the data React sent

    console.log("Login attempt for:", loginId);

    // In a real app, you'd check the database here.
    // For now, let's just pretend it's correct:
    if (loginId === "admin" && password === "1234") {
        res.status(200).json({ 
            message: "Success!", 
            token: "fake-jwt-token-xyz" 
        });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});