import { h1Regex, h2Regex, h3Regex, h4Regex, h5Regex, h6Regex, boldRegex, boldAltRegex, italicRegex, italicAltRegex, strikethroughRegex, linkRegex, imageRegex, inlineCodeRegex, codeBlockRegex, lineBreakRegex, } from "./common/html_regexp.js"; // 导入正则表达式
function lexer(input) {
    const tokens = [];
    const lines = input.split("\n"); // 按行分割输入文本
    lines.forEach((line) => {
        // console.log(`行${i++}\t` + line);
        const token = TypeCheck(line);
        console.log("词法解析器返回的数据");
        // 打印整个 token 数组的 JSON 字符串（已格式化）
        console.log(JSON.stringify(token, null, 2));
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
        // 处理不同类型的 Token
        switch (tokenType) {
            case "text":
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
                console.log("返回了一个链接");
                tokens.push({
                    type: "link",
                    href: tokenHref,
                    text: tokenText,
                });
                break;
            case "image":
                console.log("返回了一个图片");
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
            case "newline":
                tokens.push({
                    type: "newline",
                });
                break;
            case "list_item":
                tokens.push({
                    type: "list_item",
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
            // console.log("第" + i + "个正则表达式");
            let temp = i + 1;
            status.push("h" + temp);
            input = replaceInput(headerReg[i], input);
        }
    }
    // 匹配加粗
    const bold = input.match(boldRegex) || input.match(boldAltRegex);
    if (bold) {
        status.push("bold");
        input = replaceInput(boldRegex || boldAltRegex, input);
    }
    // 匹配斜体
    const italic = input.match(italicAltRegex) || input.match(italicRegex);
    if (italic) {
        status.push("italic");
        input = replaceInput(italicRegex || italicAltRegex, input);
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
        console.log("匹配到了图片");
        input = imgAndLinkReplace(imageRegex, input);
        console.log(input);
    }
    // 匹配链接
    const link = input.match(linkRegex);
    if (link) {
        console.log("匹配到链接");
        status.push("link");
        input = imgAndLinkReplace(linkRegex, input);
        console.log(input);
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
        status.push("newLine");
    }
    // console.log(`得到的最终input为:\t${input}\n`);
    // console.log(`得到的语法格式:\t${status}\n`);
    content += input;
    // console.log(`最终返回的内容为:\t${content}`);
    // token封装
    if (status.length > 1) {
        for (let s of status) {
            if (s === "image") {
                let ans = typeImgOrUrl(content);
                console.log("匹配到图片后的文本为:\r" + JSON.stringify(ans, null, 2));
                token.type = "complex";
                token.src = ans.url;
                token.alt = ans.desc;
                token.children = [...status];
                // console.log("打印token\n");
                // console.log(token);
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
            // console.log("匹配到标题了");
            let str = style.split("");
            token.type = "header";
            token.level = +str[str.length - 1];
            token.content = content;
        }
        else {
            // 不是标题则是其他简单样式
            let ans = typeImgOrUrl(content);
            console.log("匹配到返回的样式为：");
            console.log(style);
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
                    console.log("style是图片");
                    token.type = "image";
                    token.src = ans.url;
                    token.alt = ans.desc;
                    break;
                case "link":
                    console.log("style是链接" + style);
                    token.type = "link";
                    token.text = ans.desc;
                    token.href = ans.url;
                    break;
                default:
                    break;
            }
        }
    }
    else {
        token.type = "text";
        token.content = content;
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
    // console.log("打印判断是否正确:\n" + JSON.stringify(ans, null, 2));
    return ans;
}
export { lexer };
