import { Token } from "./lexer"; // 导入 Token 类型

type ASTNode =
  | { type: "document"; children: ASTNode[] }
  | { type: "header"; level: number; content: string }
  | { type: "bold"; content: string }
  | { type: "italic"; content: string }
  | { type: "text"; value: string }
  | { type: "list"; items: ASTNode[] }
  | { type: "list_item"; content: ASTNode[] }
  | { type: "link"; href: string; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "blockquote"; children: ASTNode[] }
  | { type: "horizontal_rule" }
  | { type: "code"; content: string };

function parser(tokens: Token[]): ASTNode {
  let current = 0;

  function parse(): ASTNode {
    const children: ASTNode[] = [];

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
  function parseList(): ASTNode {
    const items: ASTNode[] = [];

    while (current < tokens.length && tokens[current].type === "list_item") {
      const token = tokens[current];
      current++; // 跳过 list_item

      const content: ASTNode[] = [];
      while (
        current < tokens.length &&
        tokens[current].type !== "list_item" &&
        tokens[current].type !== "newline"
      ) {
        content.push(parse());
      }

      items.push({ type: "list_item", content });
    }

    return { type: "list", items };
  }

  // 解析区块引用（支持嵌套）
  function parseBlockquote(): ASTNode {
    const children: ASTNode[] = [];
    current++; // 跳过 blockquote token

    while (current < tokens.length && tokens[current].type === "blockquote") {
      children.push(parse());
    }

    return { type: "blockquote", children };
  }

  return parse();
}

export { parser, ASTNode };
