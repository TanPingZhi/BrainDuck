const express = require('express');
const { brainfuckInterpreter } = require('./BrainfuckInterpreter');
const app = express();
const { spawn } = require('child_process');

/////////
const cors = require("cors");
app.use(cors());
/////////

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.post('/run', (req, res) => {
//     // Accessing the 'code' field from the parsed JSON request body
//     const code = req.body.code;
//     console.log(brainfuckInterpreter(",[.[-],]", "Your input here"))
//     res.send("returns the string");
// });

// const port = 8000;
// app.listen(process.env.port || port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

app.post('/run', (req, res) => {
    const code = req.body.code;
    const userInput = req.body.input;
    // console.log(userInput)
    // Spawn a new Python process
    const pythonProcess = spawn('python3', ['main.py', code]);

    let brainfuck_string = '';

    // Capture the output from the Python script
    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString())
        brainfuck_string += data.toString();
    });

    // Handle the end of the Python script execution
    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        // res.send(output);
        output = brainfuckInterpreter(brainfuck_string, userInput)
        res.send("brainfuck: " + brainfuck_string + "\n output: " + output)
    });
});

const port = 8000;
app.listen(process.env.port || port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
