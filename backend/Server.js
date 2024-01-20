const express = require('express');
const { brainfuckInterpreter } = require('./BrainfuckInterpreter');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/run', (req, res) => {
    // Accessing the 'code' field from the parsed JSON request body
    const code = req.body.code;
    console.log(brainfuckInterpreter(",[.[-],]", "Your input here"))
    res.send(code.toString());
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
