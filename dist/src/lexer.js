import { h1Regex, h2Regex, h3Regex, h4Regex, h5Regex, h6Regex, boldRegex, boldAltRegex, italicRegex, italicAltRegex, strikethroughRegex, linkRegex, imageRegex, inlineCodeRegex, codeBlockRegex, lineBreakRegex, orderedListItemRegex, unorderedListItemRegex, unorderedListItemAltRegex, unorderedListItemAlt2Regex, } from "./common/html_regexp.js"; // 导入正则表达式
function lexer(input) {
    const tokens = [];
    console.log("原生代码");
    console.log(input);
    const lines = input.split("\n"); // 按行分割输入文本
    lines.forEach((line, index) => {
        const token = TypeCheck(line);
        // 打印整个 token 数组的 JSON 字符串（已格式化）
        // console.log("打印返回的数组");
        console.log(JSON.stringify(token, null, 2));
        // console.log("输出数组位置");
        // console.log(index);
        // 遍历 token 数组，获取每个 token 的键值对
        const tokenType = token["type"];
        const tokenContent = token["content"] ?? "";
        const tokenValue = token["value"] ?? "";
        const tokenLevel = token["level"] ?? 0;
        const tokenHref = token["href"] ?? "";
        const tokenText = token["text"] ?? "";
        const tokenSrc = token["src"] ?? "";
        const tokenAlt = token["alt"] ?? "";
        const tokenChildren = token["children"] ?? [];
        const tokenStart = token["start"] ?? 1;
        if (index !== 0) {
            tokens.push({ type: "newline" });
        }
        // 处理不同类型的 Token
        switch (tokenType) {
            case "text":
                console.log(token["value"]);
                tokens.push({
                    type: "text",
                    value: tokenValue,
                });
                break;
            case "header":
                tokens.push({
                    type: "header",
                    content: tokenContent,
                    level: tokenLevel,
                });
                break;
            case "bold":
                tokens.push({
                    type: "bold",
                    content: tokenContent,
                });
                break;
            case "italic":
                tokens.push({
                    type: "italic",
                    content: tokenContent,
                });
                break;
            case "strikethrough":
                tokens.push({
                    type: "strikethrough",
                    content: tokenContent,
                });
                break;
            case "link":
                tokens.push({
                    type: "link",
                    href: tokenHref,
                    text: tokenText,
                });
                break;
            case "image":
                tokens.push({
                    type: "image",
                    src: tokenSrc,
                    alt: tokenAlt,
                });
                break;
            case "code":
                tokens.push({
                    type: "code",
                    content: tokenContent,
                });
                break;
            case "code_block":
                tokens.push({
                    type: "code_block",
                    content: tokenContent,
                });
                break;
            case "horizontal_rule":
                tokens.push({
                    type: "horizontal_rule",
                });
                break;
            case "blockquote":
                tokens.push({
                    type: "blockquote",
                    content: tokenContent,
                });
                break;
            case "complex":
                tokens.push({
                    type: "complex",
                    children: tokenChildren,
                    content: tokenContent,
                });
                break;
            case "newline":
                tokens.push({
                    type: "newline",
                });
                break;
            case "order_list":
                tokens.push({
                    type: "order_list",
                    value: tokenValue,
                    start: tokenStart,
                });
                break;
            case "unorder_list":
                tokens.push({
                    type: "unorder_list",
                    value: tokenValue,
                });
                break;
            default:
                console.warn(`未知的 Token 类型: ${tokenType}`);
                break;
        }
    });
    return tokens;
}
function TypeCheck(input) {
    const token = {};
    const status = [];
    // 内容保存
    let content = "";
    const headerReg = [h1Regex, h2Regex, h3Regex, h4Regex, h5Regex, h6Regex];
    for (let i = 0; i < headerReg.length; i++) {
        const header = input.match(headerReg[i]);
        if (header) {
            let temp = i + 1;
            status.push("h" + temp);
            input = replaceInput(headerReg[i], input);
        }
    }
    // 处理加粗
    const boldRegexes = [boldRegex, boldAltRegex];
    const matchedBoldRegex = boldRegexes.find((regex) => input.match(regex));
    const bold = matchedBoldRegex ? input.match(matchedBoldRegex) : null;
    if (bold) {
        status.push("bold");
        input = replaceInput(matchedBoldRegex, input); // 确保替换用的是匹配到的正则
    }
    // 处理斜体
    const italicRegexes = [italicRegex, italicAltRegex];
    const matchedItalicRegex = italicRegexes.find((regex) => input.match(regex));
    const italic = matchedItalicRegex ? input.match(matchedItalicRegex) : null;
    if (italic) {
        status.push("italic");
        input = replaceInput(matchedItalicRegex, input);
    }
    // 匹配删除线
    const strikethrough = input.match(strikethroughRegex);
    if (strikethrough) {
        status.push("strikethrough");
        input = replaceInput(strikethroughRegex, input);
    }
    // 匹配图片
    const image = input.match(imageRegex);
    if (image) {
        status.push("image");
        input = imgAndLinkReplace(imageRegex, input);
    }
    // 匹配链接
    const link = input.match(linkRegex);
    if (link) {
        status.push("link");
        input = imgAndLinkReplace(linkRegex, input);
    }
    // 行内代码匹配
    const code = input.match(inlineCodeRegex);
    if (code) {
        status.push("code");
        input = replaceInput(inlineCodeRegex, input);
    }
    // 代码块匹配
    const code_block = input.match(codeBlockRegex);
    if (code_block) {
        status.push("code_block");
        input = replaceInput(codeBlockRegex, input);
    }
    // 换行符匹配
    const lineBreak = input.match(lineBreakRegex);
    if (lineBreak) {
        console.log("匹配到换行符");
        status.push("newline");
    }
    // 有序列表匹配
    const orderLine = input.match(orderedListItemRegex);
    let start = 1;
    if (orderLine) {
        status.push("order_list");
        // console.log("匹配到了列表项");
        let getStart = input.split(". "); //将数据分开
        input = replaceInput(orderedListItemRegex, input);
        start = +getStart[0];
    }
    const unorderedListRegexes = [
        unorderedListItemRegex,
        unorderedListItemAltRegex,
        unorderedListItemAlt2Regex,
    ];
    const matchedRegex = unorderedListRegexes.find((regex) => input.match(regex)); // 找到第一个成功匹配的正则
    const unorder = matchedRegex ? input.match(matchedRegex) : null;
    if (unorder) {
        status.push("unorder_list");
        input = replaceInput(matchedRegex, input); // 确保用匹配到的正则替换
        console.log("匹配到无序列表");
        console.log(input);
    }
    content += input;
    // 封装token
    if (status.length > 1) {
        for (let s of status) {
            if (s === "image") {
                let ans = typeImgOrUrl(content);
                token.type = "complex";
                token.src = ans.url;
                token.alt = ans.desc;
                token.children = [...status];
            }
            else if (s === "link") {
                let ans = typeImgOrUrl(content);
                token.type = "complex";
                token.text = ans.desc;
                token.href = ans.url;
                token.children = [...status];
            }
            else {
                token.type = "complex";
                token.content = content;
                token.children = [...status];
            }
        }
    }
    else if (status.length === 1) {
        const style = status[0];
        let headerLevel = typeHeader(style);
        if (headerLevel) {
            let str = style.split("");
            token.type = "header";
            token.level = +str[str.length - 1];
            token.content = content;
        }
        else {
            // 不是标题则是其他简单样式
            let ans = typeImgOrUrl(content);
            switch (style) {
                case "bold":
                    token.type = "bold";
                    token.content = content;
                    break;
                case "italic":
                    token.type = "italic";
                    token.content = content;
                    break;
                case "strikethrough":
                    token.type = "strikethrough";
                    token.content = content;
                    break;
                case "image":
                    // console.log("style是图片");
                    token.type = "image";
                    token.src = ans.url;
                    token.alt = ans.desc;
                    break;
                case "link":
                    // console.log("style是链接" + style);
                    token.type = "link";
                    token.text = ans.desc;
                    token.href = ans.url;
                    break;
                case "order_list":
                    token.type = "order_list";
                    token.value = content;
                    token.start = start;
                    break;
                case "unorder_list":
                    token.type = "unorder_list";
                    token.value = content;
                    break;
                default:
                    break;
            }
        }
    }
    else {
        token.type = "text";
        token.value = content;
        console.log(token);
    }
    return token;
}
// 返回匹配后的语法格式
function replaceInput(regex, input) {
    return input.replace(regex, "$1");
}
function imgAndLinkReplace(regex, input) {
    return input.replace(regex, `$1 $2`);
}
function typeHeader(input) {
    let level = 0;
    const headerMatch = /^h[1-6]$/;
    const headerReturn = input.match(headerMatch);
    if (headerReturn) {
        let str = input.split("");
        level = +str[str.length - 1];
    }
    return level;
}
function typeImgOrUrl(input) {
    let ans = {
        desc: "",
        url: "",
    };
    let str = input.split(" ");
    ans.desc = str[0];
    ans.url = str[1];
    return ans;
}
export { lexer };
