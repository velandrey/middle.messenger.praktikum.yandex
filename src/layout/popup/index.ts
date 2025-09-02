import './style.pcss';
export { default as Popup } from './template.hbs?raw';
export function initModal() {
    const popup_links = document.querySelectorAll('.popup_link');
    popup_links.forEach(element => {
        element.addEventListener('click', (e:Event):void => {
            e.preventDefault();

            if (e.target instanceof HTMLElement
                && e.target.dataset
                && 'link' in e.target.dataset
                && typeof e.target.dataset.target === 'string'
            ){
                const element:HTMLElement | null = document.getElementById(e.target.dataset.target);
                if(element){
                    element.classList.add('active');
                }
            }
        });
    });
    const modals = document.querySelectorAll('.popup_modal');
    modals.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target instanceof HTMLElement){
                e.target.classList.remove('active');
            }
        });
    });
}
