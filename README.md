# Markdown 解析器

本项目是一个 Markdown 解析器，包括词法分析（Lexer）和语法分析（Parser），将 Markdown 文本解析为抽象语法树（AST）。

## 目录结构

```
project-folder/
│
├── dist/                     # 编译后的输出目录
│   ├── index.js              # 编译自 index.ts
│   ├── src/                  # 编译后的 src 文件
│
├── src/                      # 源代码目录
│   ├── lexer.ts              # 词法分析器
│   ├── parser.ts             # 语法分析器
│   ├── token.ts              # Token 类型定义
│
└── index.ts                  # 主入口文件
```

## 功能概述

### 词法分析（Lexer）

词法分析器 (`lexer.ts`) 负责将 Markdown 文本解析为 Token 流，支持的 Markdown 语法包括：

- 标题（# H1, ## H2, ### H3...）
- 加粗（**bold**）
- 斜体（_italic_）
- 删除线（~~strikethrough~~）
- 链接（[text](url)）
- 图片（![alt](src)）
- 行内代码（`code`）
- 代码块（`code block`）
- 块引用（> blockquote）
- 水平分隔线（---）
- 换行符

### 语法分析（Parser）

语法分析器 (`parser.ts`) 负责将 Token 流转换为 AST 结构，AST 结构定义如下：

```typescript
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
  | { type: "list"; items: ASTNode[] }
  | { type: "list_item"; content: ASTNode[] }
  | { type: "blockquote"; children: ASTNode[] }
  | { type: "horizontal_rule" }
  | { type: "text"; value: string }
  | { type: "complex"; content: string; children: string[] }
  | { type: "newline" };
```

## 安装和使用

### 安装依赖

```
npm install markdown2html-parser
```

## 运行

<!-- demo版本暂时只支持内部运行，更新后支持导入使用 -->

## 许可

本项目遵循 ISC 许可证。

# 2025/3/3 0.0.2 版本更新日志

## 更新改动

### 优化导入方式

新增了两种导入方式的支持：

### 使用 ESM 导入：

```javascript
import {
  convertMarkdownToHtml,
  lexMarkdown,
  parseMarkdown,
} from "markdown2html-parser";
```

### 使用 CommonJS 导入：

```javascript
const {
  convertMarkdownToHtml,
  lexMarkdown,
  parseMarkdown,
} = require("markdown2html-parser");
```

### 使用默认导入：

```javascript
import convertMarkdownToHtml from "markdown2html-parser";
```

** 如果只需要解析 markdown 代码,则只需要导入 convertMarkdownToHtml 即可 **

```javascript
const htmlCode = convertMarkdownToHtml(coding);
```

### 新增列表解析功能

在本次版本中，新增了对列表解析的支持。用户可以通过以下方式输入列表内容：

- 支持 `1.`, `2.`, `3.` 等有序列表形式；
- 支持 `*`, `+`, `-` 等无序列表形式，三种方式均可解析。
