function parser(tokens) {
    let current = 0;
    function parse() {
        const children = [];
        while (current < tokens.length) {
            const token = tokens[current];
            switch (token.type) {
                case "text":
                    // 处理 text 类型
                    children.push({ type: "text", value: token.value });
                    current++;
                    break;
                case "header":
                    // 处理 header 类型
                    children.push({
                        type: "header",
                        level: token.level,
                        content: token.content,
                    });
                    current++;
                    break;
                case "bold":
                    // 处理 bold 类型
                    children.push({ type: "bold", content: token.content });
                    current++;
                    break;
                case "italic":
                    // 处理 italic 类型
                    children.push({ type: "italic", content: token.content });
                    current++;
                    break;
                case "strikethrough":
                    // 处理 strikethrough 类型
                    children.push({ type: "strikethrough", content: token.content });
                    current++;
                    break;
                case "link":
                    // 处理 link 类型
                    children.push({
                        type: "link",
                        href: token.href,
                        text: token.text,
                    });
                    current++;
                    break;
                case "image":
                    // 处理 image 类型
                    children.push({
                        type: "image",
                        src: token.src,
                        alt: token.alt,
                    });
                    current++;
                    break;
                case "code":
                    // 处理 inline code 类型
                    children.push({ type: "code", content: token.content });
                    current++;
                    break;
                case "code_block":
                    // 处理 code block 类型
                    children.push({ type: "code_block", content: token.content });
                    current++;
                    break;
                case "blockquote":
                    // 处理 blockquote 类型
                    children.push({
                        type: "blockquote",
                        children: [{ type: "text", value: token.content }],
                    });
                    current++;
                    break;
                case "newline":
                    // 处理 newline 类型
                    children.push({ type: "newline" });
                    current++;
                    break;
                case "complex":
                    // 处理 complex 类型，多个样式组合
                    children.push({
                        type: "complex",
                        content: token.content,
                        children: token.children, // 保存组合的样式信息
                    });
                    current++;
                    break;
                case "order_list":
                    children.push({
                        type: "order_list",
                        content: token.value,
                        start: token.start,
                        nestedItems: token.listArr
                            ? token.listArr.map((item) => ({
                                type: "order_list",
                                content: item.value,
                                start: item.start,
                            }))
                            : [], // 如果 `listArr` 存在，则递归解析子项，否则为空数组
                    });
                    current++;
                    break;
                case "unorder_list":
                    children.push({
                        type: "unorder_list",
                        content: token.value,
                    });
                    current++;
                    break;
                default:
                    current++;
                    break;
            }
        }
        // 返回包含所有内容的文档节点
        return { type: "document", children };
    }
    return parse();
}
export { parser };
