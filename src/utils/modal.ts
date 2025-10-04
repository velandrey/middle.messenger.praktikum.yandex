export function openModalCallback(e: Event) {
    if (
        e.target instanceof HTMLElement
        && e.target.classList.contains('popup_link')
        && e.target.dataset
        && 'target' in e.target.dataset
        && typeof e.target.dataset.target === 'string'
    ) {
        e.preventDefault();
        const element: HTMLElement | null = document.getElementById(e.target.dataset.target);
        if (element) {
            element.classList.add('active');
        }
    }
    const openedModal = document.querySelector('.popup_modal.active');
    if (
        e.target instanceof HTMLElement
        && e.target.classList.contains('popup_modal_close')
        && openedModal
    ) {
        openedModal.classList.remove('active');
    }
}
