function lexer(input) {
    const tokens = [];
    let current = 0;
    while (current < input.length) {
        let char = input[current];
        if (char === "\n") {
            tokens.push({ type: "newline" });
            current++;
            continue;
        }
        // 处理标题
        if (char === "#") {
            let level = 0;
            while (input[current] === "#") {
                level++;
                current++;
            }
            if (input[current] === " ") {
                current++;
            }
            let content = "";
            while (current < input.length && input[current] !== "\n") {
                content += input[current];
                current++;
            }
            tokens.push({ type: "header", level, content });
            continue;
        }
        // 处理混合格式 **_ 或 _**
        if (input.slice(current, current + 3) === "**_") {
            current += 3;
            let content = "";
            while (current < input.length &&
                input.slice(current, current + 3) !== "_**") {
                content += input[current];
                current++;
            }
            current += 3;
            tokens.push({ type: "bold", content: `**${content}**` });
            tokens.push({ type: "italic", content });
            continue;
        }
        // 处理粗体 **text**
        if (input.slice(current, current + 2) === "**") {
            current += 2;
            let content = "";
            while (current < input.length &&
                input.slice(current, current + 2) !== "**") {
                content += input[current];
                current++;
            }
            current += 2;
            tokens.push({ type: "bold", content });
            continue;
        }
        // 处理斜体 *text*
        if (input[current] === "*") {
            current++;
            let content = "";
            while (current < input.length && input[current] !== "*") {
                content += input[current];
                current++;
            }
            current++;
            tokens.push({ type: "italic", content });
            continue;
        }
        // 处理列表项 - item
        if (input[current] === "-") {
            current++;
            while (input[current] === " ") {
                current++;
            }
            let content = "";
            while (current < input.length && input[current] !== "\n") {
                content += input[current];
                current++;
            }
            tokens.push({ type: "list_item", content });
            continue;
        }
        // 处理代码块（行内代码）
        if (input[current] === "`") {
            current++;
            let content = "";
            while (current < input.length && input[current] !== "`") {
                content += input[current];
                current++;
            }
            current++;
            tokens.push({ type: "code", content });
            continue;
        }
        // 处理链接 [text](url)
        if (input[current] === "[" && input[current + 1] !== "]") {
            current++;
            let text = "";
            while (current < input.length && input[current] !== "]") {
                text += input[current];
                current++;
            }
            if (input[current] === "]") {
                current++;
                if (input[current] === "(") {
                    current++;
                    let href = "";
                    while (current < input.length && input[current] !== ")") {
                        href += input[current];
                        current++;
                    }
                    if (input[current] === ")") {
                        current++;
                        tokens.push({ type: "link", href, text });
                    }
                }
            }
            continue;
        }
        // 处理图片 ![alt](url)
        if (input[current] === "!" && input[current + 1] === "[") {
            current += 2;
            let alt = "";
            while (current < input.length && input[current] !== "]") {
                alt += input[current];
                current++;
            }
            if (input[current] === "]") {
                current++;
                if (input[current] === "(") {
                    current++;
                    let src = "";
                    while (current < input.length && input[current] !== ")") {
                        src += input[current];
                        current++;
                    }
                    if (input[current] === ")") {
                        current++;
                        tokens.push({ type: "image", src, alt });
                    }
                }
            }
            continue;
        }
        // 处理块引用 > text
        if (input[current] === ">") {
            current++;
            while (input[current] === " ") {
                current++;
            }
            let content = "";
            while (current < input.length && input[current] !== "\n") {
                content += input[current];
                current++;
            }
            tokens.push({ type: "blockquote", content });
            continue;
        }
        // 处理水平线 --- 或 ***
        if (input.slice(current, current + 3) === "---" ||
            input.slice(current, current + 3) === "***") {
            current += 3;
            tokens.push({ type: "horizontal_rule" });
            continue;
        }
        // 普通文本
        let text = "";
        while (current < input.length &&
            !["#", "*", "-", "\n", "[", "!", "`", ">"].includes(input[current])) {
            text += input[current];
            current++;
        }
        if (text) {
            tokens.push({ type: "text", value: text });
        }
    }
    return tokens;
}
export { lexer };
