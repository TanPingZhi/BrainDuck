function brainfuckInterpreter(program, stdin) {
    const memory = new Uint8Array(30000); // Large array of bytes, initialized to 0
    let pointer = 0; // Data pointer
    let inputPointer = 0; // Pointer for stdin
    let output = ''; // String to hold the output

    const jumpStack = []; // Stack for '[' and ']'
    const jumpMap = {}; // Maps positions of '[' to their corresponding ']'

    // Preprocessing: Build a map of matching brackets for jumps
    for (let i = 0; i < program.length; i++) {
        if (program[i] === '[') {
            jumpStack.push(i);
        } else if (program[i] === ']') {
            if (jumpStack.length === 0) {
                throw new Error('Unmatched closing bracket');
            }
            const start = jumpStack.pop();
            jumpMap[start] = i;
            jumpMap[i] = start;
        }
    }
    if (jumpStack.length > 0) {
        throw new Error('Unmatched opening bracket');
    }

    // Execution
    for (let i = 0; i < program.length; i++) {
        switch (program[i]) {
            case '>':
                pointer++;
                break;
            case '<':
                pointer--;
                break;
            case '+':
                memory[pointer]++;
                break;
            case '-':
                memory[pointer]--;
                break;
            case '.':
                output += String.fromCharCode(memory[pointer]);
                break;
            case ',':
                if (inputPointer < stdin.length) {
                    memory[pointer] = stdin.charCodeAt(inputPointer++);
                } else {
                    memory[pointer] = 0; // If no input is left, use 0
                }
                break;
            case '[':
                if (memory[pointer] === 0) {
                    i = jumpMap[i];
                }
                break;
            case ']':
                if (memory[pointer] !== 0) {
                    i = jumpMap[i];
                }
                break;
        }
    }

    return output;
}
module.exports = {brainfuckInterpreter}