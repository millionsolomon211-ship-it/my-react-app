// 1. Change 'require' to 'import'
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const userString = req.query.name;

    if (userString) {
        res.send(`Hello! You sent the string: ${userString}`);
    } else {
        res.send("The request is empty. Please send a name in the URL!");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});