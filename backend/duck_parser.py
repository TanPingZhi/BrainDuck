duck_table = {
    (".", "?") : ">",
    ("?", ".") : "<",
    (".", ".") : "+",
    ("!", "!") : "-",
    ("!", ".") : ".",
    (".", "!") : ",",
    ("!", "?") : "[",
    ("?", "!") : "]"
}

class DuckExpression:
    def __init__(self, *args):
        self.value = duck_table.get((args[0], args[1]))
        if self.value == None:
            # be sad and know that you are not a duck
            pass

class DuckParseError(Exception):
    pass

class DuckParser:
    def __init__(self, duck_tokens):
        self.duck_tokens = duck_tokens
        self.current = 0
        
        self.error_message = None

    def parse(self):
        try:
            return self.expression()
        except DuckParseError:
            return None

    def expression(self):
        if self.match("QUACK"):
            left = self.consume("PUNCTUATION", "Expect: punctuation after 'Quack'.")
            self.consume("QUACK", "Expect: 'Quack' after punctuation.")
            right = self.consume("PUNCTUATION", "Expect: punctation after 'Quack'.")
            return DuckExpression(left.value, right.value)

        # raise error
        raise self.error(self.peek(), "Expecting a 'Quack'...")
    
    def match(self, *token_types):
        for token_type in token_types:
            if self.check(token_type):
                self.advance()
                return True
        return False

    def consume(self, token_type, message):
        if self.check(token_type):
            return self.advance()
        raise self.error(message)
    
    def check(self, token_type):
        if self.is_at_end():
            return False
        return self.peek().token_type == token_type

    def advance(self):
        if not self.is_at_end():
            self.current += 1
        return self.previous()

    def is_at_end(self):
        return self.peek().token_type == "EOF"

    def peek(self):
        return self.duck_tokens[self.current]

    def previous(self):
        return self.duck_tokens[self.current - 1]
    
    def error(self, duck_token, message):
        if duck_token.token_type == "EOF":
            self.report(duck_token.line, " at end", message)
        else:
            self.report(duck_token.line, f" at '{duck_token.value}'", message)
        return DuckParseError(message)

    def report(self, line, where, message):
        self.error_message = f"[line {line}] Error{where}: {message}"