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
    case "text":
      return ast.value;
    case "list_item":
      return `<li>${ast.content}</li>`;
    default:
      return "";
  }
}

export { render };
