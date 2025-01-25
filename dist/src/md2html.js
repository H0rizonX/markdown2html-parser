import { lexer } from "./lexer.js";
import { parser } from "./parser.js";
import { render } from "./render.js";
export function markdownToHtml(input) {
    const tokens = lexer(input);
    console.log(`生成的token${JSON.stringify(tokens, null, 2)}`);
    const ast = parser(tokens);
    console.log(ast);
    return render(ast);
}
