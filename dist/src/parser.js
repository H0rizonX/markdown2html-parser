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
                    children.push(parseList());
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
                    children.push(parseBlockquote());
                    break;
                case "horizontal_rule":
                    children.push({ type: "horizontal_rule" });
                    current++;
                    break;
                case "code":
                    children.push({ type: "code", content: token.content });
                    current++;
                    break;
                case "newline":
                    current++; // 跳过换行符
                    break;
                default:
                    current++; // 跳过未知 token
                    break;
            }
        }
        return { type: "document", children };
    }
    // 解析列表（支持嵌套）
    function parseList() {
        const items = [];
        while (current < tokens.length && tokens[current].type === "list_item") {
            const token = tokens[current];
            current++; // 跳过 list_item
            const content = [];
            while (current < tokens.length &&
                tokens[current].type !== "list_item" &&
                tokens[current].type !== "newline") {
                content.push(parse());
            }
            items.push({ type: "list_item", content });
        }
        return { type: "list", items };
    }
    // 解析区块引用（支持嵌套）
    function parseBlockquote() {
        const children = [];
        current++; // 跳过 blockquote token
        while (current < tokens.length && tokens[current].type === "blockquote") {
            children.push(parse());
        }
        return { type: "blockquote", children };
    }
    return parse();
}
export { parser };
