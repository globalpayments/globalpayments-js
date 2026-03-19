export declare const createModalComponent: (modalProps: {
    id: string;
    htmlContent?: HTMLElement | undefined;
}) => ModalComponent | undefined;
export interface ModalComponent {
    open: () => void;
    close: () => void;
    modalElement: HTMLDivElement;
}
