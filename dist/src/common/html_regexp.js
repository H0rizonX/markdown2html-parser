// 匹配一级标题（#）
// 例如： # 一级标题
export const h1Regex = /^#\s(.*)$/gm;
// 匹配二级标题（##）
// 例如： ## 二级标题
export const h2Regex = /^##\s(.*)$/gm;
// 匹配三级标题（###）
// 例如： ### 三级标题
export const h3Regex = /^###\s(.*)$/gm;
// 匹配四级标题（####）
// 例如： #### 四级标题
export const h4Regex = /^####\s(.*)$/gm;
// 匹配五级标题（#####）
// 例如： ##### 五级标题
export const h5Regex = /^#####\s(.*)$/gm;
// 匹配六级标题（######）
// 例如： ###### 六级标题
export const h6Regex = /^######\s(.*)$/gm;
// 匹配加粗文本（**bold** 或 __bold__）
// 例如： **加粗文本**
export const boldRegex = /\*\*(.*)\*\*/gm;
// 匹配加粗文本（__bold__）替代格式
// 例如： __加粗文本__
export const boldAltRegex = /__(.*)__/gm;
// 匹配斜体文本（*italic* 或 _italic_）
// 例如： *斜体文本* 或 _斜体文本_
export const italicRegex = /\*(.*)\*/gm;
// 匹配斜体文本（_italic_）替代格式
// 例如： _斜体文本_
export const italicAltRegex = /_(.*)_/gm;
// 匹配删除线文本（~~strikethrough~~）
// 例如： ~~删除线文本~~
export const strikethroughRegex = /~~(.*)~~/gm;
// 匹配链接（[text](url)）
// 例如： [点击这里](https://example.com)
export const linkRegex = /\[(.*?)\]\((.*?)\)/gm;
// 匹配图片（![alt](url)）
// 例如： ![图片描述](https://example.com/image.jpg)
export const imageRegex = /!\[(.*?)\]\((.*?)\)/gm;
// 匹配行内代码（`code`）
// 例如： `console.log("Hello, world!");`
export const inlineCodeRegex = /`(.*?)`/gm;
// 匹配代码块（```code block```）
// 例如： ```
//  function hello() {
//      console.log("Hello");
//  }
// ```
export const codeBlockRegex = /```([\s\S]*?)```/gm;
// 匹配换行符（用于处理换行）
// 例如： \n
export const lineBreakRegex = /\n/gm;
// 匹配无序列表项（星号 *）
// 例如： * 列表项
export const unorderedListItemRegex = /^\*\s(.*)$/gm;
// 匹配无序列表项（加号 +）
// 例如： + 列表项
export const unorderedListItemAltRegex = /^\+\s(.*)$/gm;
// 匹配无序列表项（减号 -）
// 例如： - 列表项
export const unorderedListItemAlt2Regex = /^-\s(.*)$/gm;
// 匹配有序列表项（数字加点）
// 例如： 1. 列表项
export const orderedListItemRegex = /^\d+\.\s(.*)$/gm;
