import { markdownToHtml } from "./src/md2html.js";
const markdown = `
# 一级标题
- 列表项1
- 列表项2
**加粗文本** 和 *斜体文本*
[链接](https://example.com)
`;
// console.log("测试");
const htmlOutput = markdownToHtml(markdown);
// console.log(htmlOutput);
export function getHtml() {
    return htmlOutput;
}
