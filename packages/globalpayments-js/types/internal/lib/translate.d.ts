declare function translateMessage(lang: string, message: string): any;
declare function translateObj(lang: string, object: any): {
    [key: string]: string;
};
export { translateMessage, translateObj };
