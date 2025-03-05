type Token = {
    type: "text" | "header" | "bold" | "italic" | "strikethrough" | "link" | "image" | "code" | "code_block" | "newline" | "list_item" | "horizontal_rule" | "blockquote" | "complex" | "order_list" | "unorder_list";
    content?: string;
    value?: string;
    level?: number;
    href?: string;
    text?: string;
    src?: string;
    alt?: string;
    children?: String[];
    start?: number;
    listArr?: Array<{
        value: string;
        type: "order_list" | "unorder_list";
        start: number;
        isFirst: number;
    }>;
    isFirst?: number;
};
declare function lexer(input: string): Token[];
export { Token, lexer };
