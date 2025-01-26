import { h1Regex, h2Regex, h3Regex, h4Regex, h5Regex, h6Regex, boldRegex, italicRegex, linkRegex, imageRegex, inlineCodeRegex, } from "./common/html_regexp.js"; // 导入正则表达式
function lexer(input) {
    const tokens = [];
    let current = 0;
    while (current < input.length) {
        const remainingInput = input.slice(current);
        // 处理换行符
        if (remainingInput.startsWith("\n")) {
            tokens.push({ type: "newline" });
            current++;
            continue;
        }
        // 处理标题
        const headerMatch = remainingInput.match(h1Regex) ||
            remainingInput.match(h2Regex) ||
            remainingInput.match(h3Regex) ||
            remainingInput.match(h4Regex) ||
            remainingInput.match(h5Regex) ||
            remainingInput.match(h6Regex);
        if (headerMatch) {
            const level = headerMatch[0].indexOf(headerMatch[1]);
            const content = headerMatch[1]?.trim() || "";
            tokens.push({ type: "header", level, content });
            current += headerMatch[0].length;
            continue;
        }
        // 处理加粗文本
        const boldMatch = remainingInput.match(boldRegex);
        if (boldMatch) {
            tokens.push({ type: "bold", content: boldMatch[1] });
            current += boldMatch[0].length;
            continue;
        }
        // 处理斜体文本
        const italicMatch = remainingInput.match(italicRegex);
        if (italicMatch) {
            tokens.push({ type: "italic", content: italicMatch[1] });
            current += italicMatch[0].length;
            continue;
        }
        // 处理列表项
        const listItemMatch = remainingInput.match(/^([*+-])\s+(.*)$/);
        if (listItemMatch) {
            tokens.push({ type: "list_item", content: listItemMatch[2].trim() });
            current += listItemMatch[0].length;
            continue;
        }
        // 处理行内代码
        const inlineCodeMatch = remainingInput.match(inlineCodeRegex);
        if (inlineCodeMatch) {
            tokens.push({ type: "code", content: inlineCodeMatch[1] });
            current += inlineCodeMatch[0].length;
            continue;
        }
        // 处理链接
        const linkMatch = remainingInput.match(linkRegex);
        if (linkMatch) {
            tokens.push({ type: "link", href: linkMatch[2], text: linkMatch[1] });
            current += linkMatch[0].length;
            continue;
        }
        // 处理图片
        const imageMatch = remainingInput.match(imageRegex);
        if (imageMatch) {
            tokens.push({ type: "image", src: imageMatch[2], alt: imageMatch[1] });
            current += imageMatch[0].length;
            continue;
        }
        // 处理块引用
        const blockquoteMatch = remainingInput.match(/^>\s+(.*)$/);
        if (blockquoteMatch) {
            tokens.push({ type: "blockquote", content: blockquoteMatch[1].trim() });
            current += blockquoteMatch[0].length;
            continue;
        }
        // 处理水平线
        const horizontalRuleMatch = remainingInput.match(/^([-*_]){3,}\s*$/);
        if (horizontalRuleMatch) {
            tokens.push({ type: "horizontal_rule" });
            current += horizontalRuleMatch[0].length;
            continue;
        }
        // 普通文本
        let text = "";
        while (current < input.length &&
            !["#", "*", "-", "\n", "[", "!", "`", ">"].includes(input[current])) {
            text += input[current];
            current++;
        }
        if (text.trim()) {
            tokens.push({ type: "text", value: text.trim() });
        }
    }
    return tokens;
}
export { lexer };
