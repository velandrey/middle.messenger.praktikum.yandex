import App from "./App.js";

document.addEventListener('DOMContentLoaded', async () => {
    const app = new App();
    await app.load();
});
