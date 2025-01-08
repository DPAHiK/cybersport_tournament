import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css'; // Импорт глобальных стилей
import App from './app.js'; // Импорт главного компонента приложения
import { Provider } from 'react-redux'; // Импорт компонента Provider из react-redux
import store from './redux/store.js'; // Импорт Redux store

// Создание корневого элемента для рендеринга
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеринг приложения
root.render(
  <Provider store={store}> {/* Обертывание приложения в Provider для доступа к Redux store */}
    <App />
  </Provider>
);
