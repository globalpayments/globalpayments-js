import { createHtmlDivElement } from "../../helpers/html-element";

export const createModalComponent = (modalProps: { id: string, htmlContent?: HTMLElement }): ModalComponent | undefined => {
    const {
        id,
        htmlContent,
    } = modalProps;

    const existingModal = document.getElementById(id);
    if (existingModal) return;


    const modalComponentDiv = createHtmlDivElement({
        id,
        className: 'modal-overlay',
        attributes: [
            { style: 'display: none;' },
        ],
    });
    const modalWrapperDiv = createHtmlDivElement({ className: 'modal-wrapper' });
    modalComponentDiv.append(modalWrapperDiv);

    const modalContentDiv = createHtmlDivElement({ className: 'modal-content' });
    if (htmlContent) {
        modalContentDiv.append(htmlContent);
    }
    modalWrapperDiv.append(modalContentDiv);

    return {
        open: (): void => {
            setModalVisibility(id, true);
        },
        close: (): void => {
            setModalVisibility(id, false);
        },
        modalElement: modalComponentDiv,
    };
};

function setModalVisibility(id: string, visible: boolean): void {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.style.display = visible ? 'flex' : 'none';
}

export interface ModalComponent {
    open: () => void,
    close: () => void,
    modalElement: HTMLDivElement,
}