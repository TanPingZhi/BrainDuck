class DuckToken:
    def __init__(self, token_type, value, line):
        self.token_type = token_type
        self.value = value
        self.line = line

class DuckScanner:
    def __init__(self, source):
        self.keywords = {
            "Quack" : "QUACK",
            "Quackity": "QUACK",
            "Quackoo" : "QUACK"
        }
        self.source = source
        self.duck_tokens = []
        self.start = 0
        self.current = 0
        self.line = 1

        self.error_message = None
    
    def scan_duck_tokens(self):
        try:
            while not self.is_at_end():
                self.start = self.current
                self.scan_duck_token()
            
            self.duck_tokens.append(DuckToken("EOF", "", self.line))
            return self.duck_tokens
        except SyntaxError:
            return None
    
    def scan_duck_token(self):
        c = self.advance()
        match c:
            case ".":
                self.add_duck_token("PUNCTUATION")
            case "?":
                self.add_duck_token("PUNCTUATION")
            case "!":
                self.add_duck_token("PUNCTUATION")
            case " ":
                pass
            case "\r":
                pass
            case "\t":
                # do nothing
                pass
            case "\n":
                line += 1
            case _:
                if c.isdigit():
                    raise self.error(self.peek(), "Unexpected character.")
                elif c.isalpha():
                    self.identifier()
                else:
                    raise self.error(self.peek(), "Unexpected character.")            
    
    def add_duck_token(self, token_type):
        duck_text = self.source[self.start:self.current]
        duck_token = DuckToken(token_type, duck_text, self.line)
        self.duck_tokens.append(duck_token)

    def identifier(self):
        while self.peek().isalpha():
            self.advance()

        duck_text = self.source[self.start:self.current]
        duck_type = self.keywords.get(duck_text);
        if duck_type == None:
            raise self.error(duck_text, "Not recognised as duck language! Please speak duck!")
        self.add_duck_token(duck_type);

    def advance(self):
        self.current += 1
        return self.source[self.current - 1]
    
    def peek(self):
        if self.is_at_end():
            return '\0'
        return self.source[self.current]
    
    def is_at_end(self):
        return self.current >= len(self.source)
    
    def error(self, duck_text, message):
        if duck_text == '\0':
            self.report(self.line, " at end", message)
        else:
            self.report(self.line, f" at '{duck_text}'", message)
        return SyntaxError(message)

    def report(self, line, where, message):
        self.error_message = f"[line {line}] Error{where}: {message}"