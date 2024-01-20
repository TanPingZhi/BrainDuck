class DuckToken {
    constructor(tokenType, value, line) {
        this.tokenType = tokenType;
        this.value = value;
        this.line = line;
    }
}

class DuckScanner {
    constructor(source) {
        this.keywords = {
            "Quack": "QUACK",
            "Quackity": "QUACK",
            "Quackoo": "QUACK"
        };
        this.source = source;
        this.duckTokens = [];
        this.start = 0;
        this.current = 0;
        this.line = 1;

        this.errorMessage = null;
    }

    scanDuckTokens() {
        try {
            while (!this.isAtEnd()) {
                this.start = this.current;
                this.scanDuckToken();
            }

            this.duckTokens.push(new DuckToken("EOF", "", this.line));
            return this.duckTokens;
        } catch (error) {
            if (error instanceof SyntaxError) {
                return null;
            }
            throw error;
        }
    }

    scanDuckToken() {
        const c = this.advance();
        switch (c) {
            case ".":
            case "?":
            case "!":
                this.addDuckToken("PUNCTUATION");
                break;
            case " ":
                break;
            case "\r":
                break;
            case "\t":
                // do nothing
                break;
            case "\n":
                this.line += 1;
                break;
            default:
                if (c.match(/[a-zA-Z]/)) {
                    this.identifier();
                } else {
                    throw this.error(this.peek(), "Unexpected character.");
                }
        }
    }

    addDuckToken(tokenType) {
        const duckText = this.source.substring(this.start, this.current);
        const duckToken = new DuckToken(tokenType, duckText, this.line);
        this.duckTokens.push(duckToken);
    }

    identifier() {
        while (this.peek().match(/[a-zA-Z]/)) {
            this.advance();
        }

        const duckText = this.source.substring(this.start, this.current);
        const duckType = this.keywords[duckText];
        if (duckType === undefined) {
            throw this.error(duckText, "Not recognized as duck language! Please speak duck!");
        }
        this.addDuckToken(duckType);
    }

    advance() {
        this.current += 1;
        return this.source[this.current - 1];
    }

    peek() {
        if (this.isAtEnd()) {
            return '\0';
        }
        return this.source[this.current];
    }

    isAtEnd() {
        return this.current >= this.source.length;
    }

    error(duckText, message) {
        if (duckText === '\0') {
            this.report(this.line, " at end", message);
        } else {
            this.report(this.line, ` at '${duckText}'`, message);
        }
        return new SyntaxError(message);
    }

    report(line, where, message) {
        this.errorMessage = `[line ${line}] Error${where}: ${message}`;
    }
}

const duckTable = {
    [JSON.stringify([".", "?"])]: ">",
    [JSON.stringify(["?", "."])]: "<",
    [JSON.stringify([".", "."])]: "+",
    [JSON.stringify(["!", "!"])]: "-",
    [JSON.stringify(["!", "."])]: ".",
    [JSON.stringify([".", "!"])]: ",",
    [JSON.stringify(["!", "?"])]: "[",
    [JSON.stringify(["?", "!"])]: "]",
    [JSON.stringify(["?", "?"])]: ""
};

class DuckExpression {
    constructor(...args) {
        this.value = duckTable[JSON.stringify([args[0], args[1]])];
        if (this.value === undefined) {
            // be sad and know that you are not a duck
        }
    }
}

class DuckParseError extends Error {}

class DuckParser {
    constructor(duckTokens) {
        this.duckTokens = duckTokens;
        this.current = 0;
        this.errorMessage = null;
    }

    parse() {
        try {
            return this.expression();
        } catch (error) {
            if (error instanceof DuckParseError) {
                return null;
            }
            throw error;
        }
    }

    expression() {
        if (this.match("QUACK")) {
            const left = this.consume("PUNCTUATION", "Expect: punctuation after 'Quack'.");
            this.consume("QUACK", "Expect: 'Quack' after punctuation.");
            const right = this.consume("PUNCTUATION", "Expect: punctuation after 'Quack'.");
            const expr = new DuckExpression(left.value, right.value);
            return expr
        }

        // raise error
        throw this.error(this.peek(), "Expecting a 'Quack'...");
    }

    match(...tokenTypes) {
        for (const tokenType of tokenTypes) {
            if (this.check(tokenType)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    consume(tokenType, message) {
        if (this.check(tokenType)) {
            return this.advance();
        }
        throw this.error(this.peek(), message);
    }

    check(tokenType) {
        if (this.isAtEnd()) {
            return false;
        }
        return this.peek().tokenType === tokenType;
    }

    advance() {
        if (!this.isAtEnd()) {
            this.current += 1;
        }
        return this.previous();
    }

    isAtEnd() {
        return this.peek().tokenType === "EOF";
    }

    peek() {
        return this.duckTokens[this.current];
    }

    previous() {
        return this.duckTokens[this.current - 1];
    }

    error(duckToken, message) {
        if (duckToken.tokenType === "EOF") {
            this.report(duckToken.line, " at end", message);
        } else {
            this.report(duckToken.line, ` at '${duckToken.value}'`, message);
        }
        return new DuckParseError(message);
    }

    report(line, where, message) {
        this.errorMessage = `[line ${line}] Error${where}: ${message}`;
    }
}

function brainQuack_To_Brainfuck_Interpreter(contents) {
    const s = new DuckScanner(contents);
    const duckTokens = s.scanDuckTokens();

    if (duckTokens === null) {
        return ["ERROR", s.error];
    }

    const p = new DuckParser(duckTokens);

    const output = [];

    while (!p.isAtEnd()) {
        const duckExpression = p.parse();
        if (duckExpression) {
            output.push(duckExpression.value);
        } else {
            return ["ERROR", p.errorMessage];
        }
    }

    return ["BRAINFUCK", output.join('')];
}

module.exports = {brainQuack_To_Brainfuck_Interpreter}