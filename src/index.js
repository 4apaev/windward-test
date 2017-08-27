const App = require('./app');
document.addEventListener('DOMContentLoaded', () => {
  const app = window.app = new App;
  app.init({
    lat: 35,
    lng: 22
  });
})