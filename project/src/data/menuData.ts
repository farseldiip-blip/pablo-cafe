export type MenuItem = {
  name: string;
  description: string;
  image: string;
  price?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  note: string;
  items: MenuItem[];
};

const coffee = 'https://images.pexels.com/photos/6612662/pexels-photo-6612662.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const matcha = 'https://images.pexels.com/photos/30494513/pexels-photo-30494513.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const dessert = 'https://images.pexels.com/photos/33384164/pexels-photo-33384164.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const pastry = 'https://images.pexels.com/photos/34773646/pexels-photo-34773646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const menuCategories: MenuCategory[] = [
  { id: 'coffee', label: 'Coffee', note: 'Slow mornings, made better.', items: [
    { name: 'Hot Coffee', description: 'Classic coffee, served your way.', image: coffee },
    { name: 'Iced Americano', description: 'Bright, cold, and uncomplicated.', image: coffee },
    { name: 'Iced Salted Caramel Latte', description: 'Silky espresso with a sweet finish.', image: coffee },
  ]},
  { id: 'drinks', label: 'Cold Drinks', note: 'Colour in every sip.', items: [
    { name: 'Iced Matcha', description: 'A vibrant, cool ritual for any hour.', image: matcha },
    { name: 'Fresh Lemonade', description: 'Citrus, ice, and a little sunshine.', image: matcha },
    { name: 'Seasonal Cooler', description: 'Ask us what is pouring today.', image: matcha },
  ]},
  { id: 'desserts', label: 'Desserts', note: 'The slice you have been waiting for.', items: [
    { name: 'Cheesecake', description: 'Creamy, delicate, and made for sharing.', image: dessert },
    { name: 'Cinnamon Roll', description: 'Warm pastry with a soft, sweet centre.', image: pastry },
    { name: 'Daily Dessert', description: 'Something special from our counter.', image: dessert },
  ]},
  { id: 'food', label: 'Food', note: 'Good food. Good mood.', items: [
    { name: 'Breakfast', description: 'A generous start to the day.', image: pastry },
    { name: 'Sandwiches', description: 'Made fresh for easy afternoons.', image: pastry },
    { name: 'Light Bites', description: 'The perfect companion to your cup.', image: dessert },
  ]},
];
