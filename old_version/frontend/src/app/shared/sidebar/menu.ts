import {MenuItem} from './menu.model';

export const MENU: MenuItem[] = [
/*  {
    id: 0,
    label: 'Home',
    icon: 'bx bxs-home',
    link: '/',
  },*/
  {
    id: 1,
    label: 'GREENHOUSE',
    isTitle: true
  },/*,
  {
    id: 2,
    label: 'Dashboard',
    icon: 'bx bxs-dashboard',
    link: '/greenhouse/dashboard',
  },
  {
    id: 3,
    label: 'Time Charts',
    icon: 'bx bx-line-chart',
    link: '/greenhouse/time-charts',
  },
  {
    id: 4,
    label: 'Water Consumption',
    icon: ' bx bx-water',
    link: '/greenhouse/water-consumption',
  },
  {
    id: 5,
    label: 'Energy Consumption',
    icon: ' bx bx-plug',
    link: '/greenhouse/energy-consumption',
  },

  {
    id: 6,
    label: 'Irrigation Control',
    icon: 'fas fa-faucet',
    link: '/greenhouse/irrigation-control',
  },*/
  {
    id: 2,
    label: 'Fertigation',
    icon: 'bx bx-water',
    link: '/greenhouse/fertigation',
  },

  {
    id: 7,
    label: 'Open-air fields',
    isTitle: true
  },{
    id: 8,
    label: 'Overview',
    icon: 'bx bxs-dashboard',
    link: '/openair-fields/overview',
  },
  {
    id: 9,
    label: 'Manage fields',
    icon: 'bx bxs-map-pin',
    link: '/openair-fields/fields',
  },
  {
    id: 10,
    label: 'Fields statistics',
    icon: 'bx bxs-spa',
    link: '/openair-fields/fields/statistics',
  }
];

