import './style.pcss';
export { default as Popup } from './template.hbs?raw';
export function initModal() {
    const popup_links = document.querySelectorAll('.popup_link');
    popup_links.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById(e.target.dataset.target).classList.add('active');
        });
    });
    const modals = document.querySelectorAll('.popup_modal');
    modals.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.target.classList.remove('active');
        });
    });
}