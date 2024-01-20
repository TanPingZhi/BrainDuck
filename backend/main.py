from duck_scanner import DuckScanner
from duck_parser import DuckParser
import sys

if __name__ == "__main__":

    if len(sys.argv) != 2:
        print("Usage: python main.py <user_input>")
        sys.exit(1)

    user_input = sys.argv[1]

    # Use user_input directly instead of reading from the file
    contents = user_input.replace('\n', '')
    # print(contents)

    s = DuckScanner(contents)
    duck_tokens = s.scan_duck_tokens()
    # print([token.token_type for token in duck_tokens])

    if duck_tokens == None:
        output = s.error_message
        print(output)
        exit()        

    p = DuckParser(duck_tokens)
    
    output = []
    had_error = False

    while not p.is_at_end():
        duck_expression = p.parse()
        if duck_expression:
            output.append(duck_expression.value)
        else:
            had_error = True
            output = [p.error_message]
            break
        # print(output)
    
    print("".join(output))
    exit()