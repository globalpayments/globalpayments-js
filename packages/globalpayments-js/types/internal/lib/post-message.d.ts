export default class PostMessage {
    post(data: any, target: string): void;
    receive(callback?: (data: any) => void): Promise<unknown>;
}
export declare const postMessage: PostMessage;
