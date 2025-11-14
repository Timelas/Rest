export const CONTACTS = {
  address: 'Москва, Мичуринский пр-т дом 32, Олимпийская деревня, 3',
  addressMini: 'Мичуринский пр-т дом 32, Олимпийская деревня, 3',
  phone: '+7 (495) 150-90-24',
  email: 'info@satrapezo.ru',
  workingHours: 'Ежедневно с 11:00 до последнего гостя',
  socials: [
    { id: 'tg', label: 'Telegram', url: 'https://t.me/' },
    { id: 'inst', label: 'Instagram', url: 'https://instagram.com/' },
    { id: 'fb', label: 'Facebook', url: 'https://facebook.com/' },
  ],
  halls: [
    { title: 'Основной зал' },
    { title: 'Верхний вип' },
    { title: 'Нижний вип' },
    { title: 'Летняя веранда'},
  ],
};

export type Contacts = typeof CONTACTS;
