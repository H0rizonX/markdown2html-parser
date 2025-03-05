import { Token } from "./lexer";
type ASTNode = {
    type: "document";
    children: ASTNode[];
} | {
    type: "header";
    level: number;
    content: string;
} | {
    type: "bold";
    content: string;
} | {
    type: "italic";
    content: string;
} | {
    type: "strikethrough";
    content: string;
} | {
    type: "link";
    href: string;
    text: string;
} | {
    type: "image";
    src: string;
    alt: string;
} | {
    type: "code";
    content: string;
} | {
    type: "code_block";
    content: string;
} | {
    type: "blockquote";
    children: ASTNode[];
} | {
    type: "horizontal_rule";
} | {
    type: "text";
    value: string;
} | {
    type: "complex";
    content: string;
    children: String[];
} | {
    type: "newline";
} | {
    type: "order_list";
    content: String;
    start: number;
    nestedItems?: ASTNode[];
} | {
    type: "unorder_list";
    content: String;
};
declare function parser(tokens: Token[]): ASTNode;
export { parser, ASTNode };
