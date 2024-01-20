const express = require('express');
const { brainfuckInterpreter } = require('./BrainfuckInterpreter');
const app = express();
const { brainQuack_To_Brainfuck_Interpreter} = require('./BrainQuack_To_Brainfuck_Interpreter')

/////////
const cors = require("cors");
app.use(cors());
/////////

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/run', (req, res) => {
    const code = req.body.code;
    const userInput = req.body.input;

    // Convert the BrainQuack to Brainfuck
    let brainfuck_interpreter_response = brainQuack_To_Brainfuck_Interpreter(code);
    let err = brainfuck_interpreter_response[0];
    let brainfuckCode = brainfuck_interpreter_response[1];
    console
    if (err === "ERROR") {
        res.send(brainfuckCode);
    }
    else {
        output = brainfuckInterpreter(brainfuckCode, userInput);
        res.send(output);
    }

    // Capture the output from the Python script
    // pythonProcess.stdout.on('data', (data) => {
    //     console.log(data.toString())
    //     brainfuck_string += data.toString();
    // });

    // Handle the end of the Python script execution
    // pythonProcess.on('close', (code) => {
    //     console.log(`Python script exited with code ${code}`);
    //     // res.send(output);
    //     output = brainfuckInterpreter(brainfuck_string, userInput)
    //     res.send("brainfuck: " + brainfuck_string + "\n output: " + output)
    // });
});

const port = 8000;
app.listen(process.env.port || port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
