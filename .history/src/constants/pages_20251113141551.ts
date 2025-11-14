export type PageSlug =
  | 'home'
  | 'about'
  | 'menu'
  | 'banquets'
  | 'kidsAnimation'
  | 'summerVeranda'
  | 'mainHall'
  | 'lowerVip'
  | 'upperVip'
  | 'contacts'
  | 'news'
  | 'newsDetail';

export const PAGE_DEFINITIONS: Record<
  PageSlug,
  { label: string; path: string; description: string }
> = {
  home: {
    label: 'Главная',
    path: '/',
    description: 'Вся витрина ресторана Trazpezo и основные акценты бренда',
  },
  about: {
    label: 'О ресторане',
    path: '/about',
    description: 'История, философия кухни и ценности сервиса',
  },
  menu: {
    label: 'Меню',
    path: '/menu',
    description: 'Основное, барное и сезонные предложения ресторана',
  },
  banquets: {
    label: 'Банкеты и корпоративы',
    path: '/banquets',
    description: 'Готовые сценарии мероприятий и условия аренды залов',
  },
  kidsAnimation: {
    label: 'Детская анимация',
    path: '/kids-animation',
    description: 'Семейные программы и анимационные форматы выходного дня',
  },
  summerVeranda: {
    label: 'Летняя веранда',
    path: '/summer-veranda',
    description: 'Открытое пространство с зеленью и вечерними программами',
  },
  mainHall: {
    label: 'Основной зал',
    path: '/main-hall',
    description: 'Главный зал ресторана и его сценография',
  },
  lowerVip: {
    label: 'Нижний VIP',
    path: '/lower-vip',
    description: 'Камерный зал с полным приватным сервисом',
  },
  upperVip: {
    label: 'Верхний VIP',
    path: '/upper-vip',
    description: 'Панорамные виды и авторский сет шефа',
  },
  contacts: {
    label: 'Контакты',
    path: '/contacts',
    description: 'Актуальные телефоны, адрес и схема проезда',
  },
  news: {
    label: 'Новости',
    path: '/news',
    description: 'Подборка событий ресторана и афиша',
  },
  newsDetail: {
    label: 'Страница новости',
    path: '/news/:slug',
    description: 'Развернутый материал отдельной новости',
  },
};

export const PRIMARY_NAVIGATION: PageSlug[] = [
  'about',
  'menu',
  'banquets',
  'kidsAnimation',
  'summerVeranda',
  'contacts',
];
