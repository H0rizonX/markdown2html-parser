function parser(tokens) {
    let current = 0;
    function parse() {
        const children = [];
        while (current < tokens.length) {
            const token = tokens[current];
            switch (token.type) {
                case "text":
                    children.push({ type: "text", value: token.value });
                    current++;
                    break;
                case "header":
                    children.push({
                        type: "header",
                        level: token.level,
                        content: token.content,
                    });
                    current++;
                    break;
                case "bold":
                    children.push({ type: "bold", content: token.content });
                    current++;
                    break;
                case "italic":
                    children.push({ type: "italic", content: token.content });
                    current++;
                    break;
                case "list_item":
                    children.push({ type: "list_item", content: token.content });
                    current++;
                    break;
                case "link":
                    children.push({
                        type: "link",
                        href: token.href,
                        text: token.text,
                    });
                    current++;
                    break;
                case "image":
                    children.push({
                        type: "image",
                        src: token.src,
                        alt: token.alt,
                    });
                    current++;
                    break;
                case "blockquote":
                    children.push({
                        type: "blockquote",
                        content: token.content,
                    });
                    current++;
                    break;
                case "horizontal_rule":
                    children.push({ type: "horizontal_rule" });
                    current++;
                    break;
                case "newline":
                    current++; // 跳过换行符
                    break;
                default:
                    current++; // 跳过其他不需要处理的 token
                    break;
            }
        }
        return { type: "document", children };
    }
    return parse();
}
export { parser };
