// 将原函数重新命名
import { markdownToHtml as convertMarkdownToHtml } from "./src/md2html.js";
import { lexer as lexMarkdown } from "./src/lexer.js";
import { parser as parseMarkdown } from "./src/parser.js";
// 通过lexMarkdown可以生成tokens数组
// 通过parseMarkdown生成ast抽象语法树
// **ESM 导出**
export { convertMarkdownToHtml, lexMarkdown, parseMarkdown };
export default convertMarkdownToHtml;
// **CommonJS 兼容**
if (typeof module !== "undefined" && module.exports) {
    module.exports = convertMarkdownToHtml;
    module.exports.convertMarkdownToHtml = convertMarkdownToHtml;
    module.exports.lexMarkdown = lexMarkdown;
    module.exports.parseMarkdown = parseMarkdown;
}
