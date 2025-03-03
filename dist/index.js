import { markdownToHtml } from "./src/md2html.js";
// **ESM 导出**
export { markdownToHtml };
export default markdownToHtml;
// **CommonJS 兼容**
if (typeof module !== "undefined" && module.exports) {
    module.exports = markdownToHtml;
    module.exports.markdownToHtml = markdownToHtml;
}
