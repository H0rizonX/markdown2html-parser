// render.ts
import { start } from "repl";
import { ASTNode } from "./parser";

// 渲染输出
function render(ast: ASTNode): string {
  switch (ast.type) {
    case "document":
      return ast.children.map((child) => render(child)).join("");

    case "header":
      return `<h${ast.level}>${ast.content}</h${ast.level}>`;

    case "bold":
      return `<strong>${ast.content}</strong>`;

    case "italic":
      return `<em>${ast.content}</em>`;

    case "strikethrough":
      return `<del>${ast.content}</del>`;

    case "text":
      return ast.value;

    case "link":
      return `<a href="${ast.href}" target="_blank" rel="nofollow">${ast.text}</a>`;

    case "image":
      return `<img src="${ast.src}" alt="${ast.alt}">`;

    case "blockquote":
      return `<blockquote>${ast.children
        .map((child) => render(child))
        .join("")}</blockquote>`;

    case "horizontal_rule":
      return `<hr>`;

    case "code":
      return `<code>${ast.content}</code>`;

    case "code_block":
      return `<pre><code>${ast.content}</code></pre>`;

    case "newline":
      // 确保处理换行符
      return `<br>`;

    case "order_list":
      return `<ol start = ${ast.start ?? "1"}><li>${ast.content}</li></ol>`;

    case "unorder_list":
      return `<ul><li>${ast.content}</li></ul>`;
    case "complex":
      return renderComplex(ast.content, ast.children);
    default:
      return "";
  }
}

function renderComplex(content: string, children: String[]): string {
  if (children.length === 0) {
    return content;
  }

  const style = children[0]; // 取出当前需要应用的样式
  const remainingStyles = children.slice(1); // 剩下的样式继续递归
  let ans = content.split(" ");
  switch (style) {
    case "bold":
      return `<strong>${renderComplex(content, remainingStyles)}</strong>`;
    case "italic":
      return `<em>${renderComplex(content, remainingStyles)}</em>`;
    case "strikethrough":
      return `<del>${renderComplex(content, remainingStyles)}</del>`;
    case "code":
      return `<code>${renderComplex(content, remainingStyles)}</code>`;
    case "link":
      return `<a href="${
        ans[1]
      }" target="_blank" rel="nofollow">${renderComplex(
        ans[0],
        remainingStyles
      )}</a>`;
    case "image":
      return `<img src="${ans[1]}" alt="${ans[0]}">`; // 图片不需要嵌套
    default:
      return renderComplex(content, remainingStyles); // 未知类型，继续递归
  }
}

export { render };
