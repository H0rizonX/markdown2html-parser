import { lexer } from "./lexer.js";
import { parser } from "./parser.js";
import { render } from "./render.js";
export function markdownToHtml(input) {
    const tokens = lexer(input); // 词法分析，生成 tokens
    // console.log(`生成的token${JSON.stringify(tokens, null, 2)}`); // 打印生成的 tokens
    const ast = parser(tokens); // 语法分析，生成 AST
    console.log(ast); // 打印 AST
    return render(ast); // 渲染 AST 为 HTML
}
