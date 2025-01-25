import { markdownToHtml } from "./src/md2html.js";
const demoMD = `
# 我的 Markdown 示例

这是一个简单的 Markdown 示例。它展示了常用的 Markdown 格式化语法。

## 1. 标题
使用 \`#\` 来创建标题。根据 # 的数量来确定标题的层级。

### 1.1 小标题
###用于创建三级标题。

## 2. 粗体与斜体
- **粗体文本**：使用 ** 包围文本。
- *斜体文本*：使用 * 包围文本。
- **_粗斜体文本_**：同时使用 ** 和 *。

## 3. 列表
### 3.1 无序列表
- 项目1
- 项目2
- 项目3

### 3.2 有序列表
1. 第一点
2. 第二点
3. 第三点

## 4. 链接与图片
- [访问百度](https://www.baidu.com)
- ![图片](https://www.example.com/image.jpg)

`;
// console.log("测试");
const htmlOutput = markdownToHtml(demoMD);
// console.log(htmlOutput);
export function getHtml() {
    return htmlOutput;
}
