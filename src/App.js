import Handlebars from 'handlebars';
import * as Layout from './layout';
import * as Components from './components';
import * as Pages from './pages';

Object.entries(Layout).forEach(([name, component]) => {
  console.log(name, component)
  Handlebars.registerPartial(name, component);
});
Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

export default class App {
  PAGES = [
    {
      title: 'Авторизация',
      link: 'Auth',
    },
    {
      title: 'Регистрация',
      link: 'Registration',
    },
    {
      title: 'Список чатов',
      link: 'Chat',
    },
  ];

  constructor() {
    this.page = 'Auth'
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;
    const context = {
      title: this.getTitle(),
      pages: this.getPagesList(),
    };
    if (this.page === 'Registration') {
      template = Handlebars.compile(Pages.Auth);
      this.appElement.innerHTML = template(context);
    } else if (this.page === 'Chat') {
      template = Handlebars.compile(Pages.Chat);
      this.appElement.innerHTML = template(context);
    } else {
      template = Handlebars.compile(Pages.Auth);
      this.appElement.innerHTML = template(context);
    }
    this.addEventHandlers();
  }

  addEventHandlers() {
    const elementsLink = document.querySelectorAll('.nav__link');
    elementsLink.forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.link);
      });
    });
  }

  changePage(page) {
    this.page = page;
    this.render();
  }

  getPagesList() {
    return this.PAGES.map((item) => {
      const className = (this.page === item.link) ? 'active' : '';
      return {...item, class: className}
    })
  }

  getTitle() {
    const objPage = this.PAGES.find(item => item.link === this.page);
    return (objPage.title) ? objPage.title : '';
  }
}
