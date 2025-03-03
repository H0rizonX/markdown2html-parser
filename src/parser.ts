import { Token } from "./lexer"; // 导入 Token 类型

type ASTNode =
  | { type: "document"; children: ASTNode[] }
  | { type: "header"; level: number; content: string }
  | { type: "bold"; content: string }
  | { type: "italic"; content: string }
  | { type: "strikethrough"; content: string }
  | { type: "link"; href: string; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "code"; content: string }
  | { type: "code_block"; content: string }
  | { type: "blockquote"; children: ASTNode[] }
  | { type: "horizontal_rule" }
  | { type: "text"; value: string }
  | { type: "complex"; content: string; children: String[] } // 修改 complex 类型
  | { type: "newline" }
  | { type: "order_list"; content: String; start: number }
  | { type: "unorder_list"; content: String };

function parser(tokens: Token[]): ASTNode {
  let current = 0;

  function parse(): ASTNode {
    const children: ASTNode[] = [];

    while (current < tokens.length) {
      const token = tokens[current];

      switch (token.type) {
        case "text":
          // 处理 text 类型
          children.push({ type: "text", value: token.value! });
          current++;
          break;

        case "header":
          // 处理 header 类型
          children.push({
            type: "header",
            level: token.level!,
            content: token.content!,
          });
          current++;
          break;

        case "bold":
          // 处理 bold 类型
          children.push({ type: "bold", content: token.content! });
          current++;
          break;

        case "italic":
          // 处理 italic 类型
          children.push({ type: "italic", content: token.content! });
          current++;
          break;

        case "strikethrough":
          // 处理 strikethrough 类型
          children.push({ type: "strikethrough", content: token.content! });
          current++;
          break;

        case "link":
          // 处理 link 类型
          children.push({
            type: "link",
            href: token.href!,
            text: token.text!,
          });
          current++;
          break;

        case "image":
          // 处理 image 类型
          children.push({
            type: "image",
            src: token.src!,
            alt: token.alt!,
          });
          current++;
          break;

        case "code":
          // 处理 inline code 类型
          children.push({ type: "code", content: token.content! });
          current++;
          break;

        case "code_block":
          // 处理 code block 类型
          children.push({ type: "code_block", content: token.content! });
          current++;
          break;

        case "blockquote":
          // 处理 blockquote 类型
          children.push({
            type: "blockquote",
            children: [{ type: "text", value: token.content! }],
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
            content: token.content!,
            children: token.children!, // 保存组合的样式信息
          });
          current++;
          break;

        case "order_list":
          children.push({
            type: "order_list",
            content: token.value,
            start: token.start,
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

export { parser, ASTNode };
