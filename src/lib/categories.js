import { FcDoughnutChart, FcBrokenLink, FcSportsMode, FcFilm } from 'react-icons/fc'

export const categories = [
  { name: 'Business', icon: <FcDoughnutChart />, href: 'business' },
  { name: 'Technology', icon: <FcBrokenLink />, href: 'technology' },
  { name: 'Sports', icon: <FcSportsMode />, href: 'sports' },
  { name: 'Entertainment', icon: <FcFilm />, href: 'entertainment' },
];

export function getCategoryByHref(href) {
  return categories.find(category => category.href === href) || { name: 'Unknown', icon: null };
}
