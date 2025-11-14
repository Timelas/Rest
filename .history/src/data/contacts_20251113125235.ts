export const CONTACTS = {
  address: 'Москва, Мичуринский проспект, 8',
  phone: '+7 (999) 123-45-67',
  email: 'hello@strapezo.ru',
  secondaryPhone: '+7 (495) 765-43-21',
  workingHours: 'Ежедневно с 11:00 до последнего гостя',
  socials: [
    { id: 'tg', label: 'Telegram', url: 'https://t.me/' },
    { id: 'inst', label: 'Instagram', url: 'https://instagram.com/' },
    { id: 'fb', label: 'Facebook', url: 'https://facebook.com/' },
  ],
  halls: [
    { title: 'Основной зал' },
    { title: 'Верхний VIP' },
    { title: 'Нижний VIP' },
    { title: 'Летняя веранда'},
  ],
};

export type Contacts = typeof CONTACTS;
