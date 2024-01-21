# BrainDuck

## Introduction
BrainDuck is a project for [Hack&Roll 2024](https://hacknroll.nushackers.org/) that interprets BrainQuack, a unique programming language inspired by Brainfuck. 
This serves absolutely no ducking purpose and is purely for fun.

Hackathon writeup at https://devpost.com/software/brainduck

## Features
- **BrainQuack to Brainfuck Interpreter**: Converts BrainQuack code to Brainfuck, enabling users to write code in an amusing duck-themed syntax.
- **Brainfuck Interpreter**: A robust interpreter for Brainfuck, allowing execution of Brainfuck code.
- **Web Interface**: A user-friendly web interface for coding and executing BrainQuack and Brainfuck programs.
- **Funny voice**: AI generated voice of Donald Trump to speak the code.

## Components
1. **Backend**:
   - `BrainQuack_To_Brainfuck_Interpreter.js`: Translates BrainQuack code to Brainfuck.
   - `BrainfuckInterpreter.js`: Executes Brainfuck code.
   - `Server.js`: Backend server setup using Express.js.
   - `duck_parser.py` & `duck_scanner.py`: Python scripts for parsing BrainQuack code.

2. **Frontend**:
   - Built with React, providing a sleek and interactive user interface.
   - `App.js` & `Navbar.js`: Core React components for the application.
   - `public/index.html`: Entry point for the frontend application.

## Getting Started
- **Prerequisites**: Node.js
- **Installation**:
  - Clone the repository.
  - Install dependencies: `npm install` in the frontend directory.
  - Start the backend server: `node backend/Server.js`.
  - Start the frontend application: `npm start` in the frontend directory.

## Usage
- Write BrainQuack code in the web interface.
- Run the code and view the output instantly.

## Examples
- `donald_duck_example.txt`: An example of BrainQuack code.
- `hello_world_example.txt`: A classic "Hello, World!" example in Brainfuck.

# Team
- Tan Ping Zhi (Y3, NUS)
- Chin Zhe Ning (Y2, NUS)
- Homun Tan (Y3, NUS)
- Mateusz Korytkowski (Y3, University of Edinburgh)
