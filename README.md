# CBS React Firebase ITVDN 2020 Remastered

Це проєкт, створений у рамках вебінару ITVDN (Firebase. Організація віддаленої роботи з даними - https://itvdn.com/ua/webinars/description/firebase#), який використовує React і Firebase для створення веб-додатку. У проєкті реалізовано базові операції з базою даних Firebase, як-от читання і запис даних, а також авторизація.

## Опис

Цей проєкт являє собою застосунок, у якому користувачі можуть авторизуватися через Firebase і взаємодіяти з базою даних. Додаток дає змогу:

- Створити акаунт для роботи з Firebase.
- Авторизуватися через Firebase (якщо вже є акаунт).
- Працювати з даними в реальному часі (з використанням Firebase Realtime Database).
- Зберігати і відображати дані, пов'язані з користувачами або іншими сутностями.

## Технології

- **React** — для побудови користувацького інтерфейсу.
- **Firebase** — для аутентифікації користувачів і роботи з базою даних.
- **React Hooks** — для управління станом компонента.

## Установка

1. Клонуйте сховище:

   ```
   git clone https://github.com/OlegBon/cbs-react-firebase-itvdn-2020-remastered.git
   cd cbs-react-firebase-itvdn-2020-remastered
   ```

2. Встановіть залежності:

   ```
   npm install
   ```

   або

   ```
    npm i
   ```

3. Створіть файл .env у корені проєкту і додайте такі змінні оточення (отримайте їх із Firebase - https://console.firebase.google.com/):

   ```
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_DATABASE_URL=your-database-url
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

   **Примітка.** Якщо з firebase при перегляді версіі чи init, чи ще з якоюсь командою отримаємо помилку:

   ```
   firebase : The term 'firebase' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
   At line:1 char:1
   + firebase init
   + ~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (firebase:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
   ```

   Треба перевірити поточну політику виконання. Зазвичай її встановлено в Restricted, що забороняє запуск будь-яких скриптів.

   ```
   Get-ExecutionPolicy
   ```

   Тимчасово дозволити виконання скриптів

   ```
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```

   Якщо потрібно дозволити постійно

   ```
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```

   Далі робимо що нап потрібно. Дивимось версію, встановлюємо Firebase CLI, підключаємось до аккаунту,

   ```
   firebase --version
   npm install -g firebase-tools
   firebase login
   firebase init
   ```

   Та потім повертаємо політику виконання в початковий стан, щоб система залишалася захищеною

   ```
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Restricted
   ```

   **Альтернатива: Використовуємо cmd замість PowerShell**

4. Запустіть проєкт:

   ```
   npm start
   ```

   або

   ```
    npm run start
   ```

5. Відкрийте браузер і перейдіть на сторінку http://localhost:3000.

## Структура проекту

- **src/components/** — компоненти для відображення користувацького інтерфейсу.
- **src/firebase-config.js** — конфігурація бази даних та ініціалізація додатків.
- **src/App.js** — основний компонент програми.
- **src/App.css** — стилі для додатка.

## Як використовувати

Під час першого запуску програми ви можете створити акаунт або увійти в систему з використанням Firebase Authentication.
Після авторизації відкриється інтерфейс для роботи з даними з Firebase Realtime Database.

## Вклад

Якщо у вас є ідеї для поліпшення проекту, будь ласка, створіть pull request або відкрийте issue.

## Подяки

- Влад Тисячний - дякую за крутий вебінар (Firebase. Організація віддаленої роботи з даними - https://itvdn.com/ua/webinars/description/firebase#)
- Віталій Мазяр, Богдан Мартиненко, Олексій Татаренков - дякую за навчання, передачу знань та навичок, завдання потрібних векторів

## Ліцензія

Цей проєкт ліцензується на умовах ліцензії MIT. Докладніше див. у файлі LICENSE.
