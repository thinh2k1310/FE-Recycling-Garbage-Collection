import { roles } from '../../../constant';
import { Dashboard, History, Shop, User } from '../../icons';

export const configs = [
  {
    title: 'Dashboard',
    path: '/',
    icon: Dashboard,
    roles: [roles.ADMIN, roles.AGENT],
  },
  {
    title: 'Manage account',
    path: '/accounts',
    icon: User,
    roles: [roles.ADMIN],
  },
  {
    title: 'Quản lý salons',
    path: '/salons',
    icon: Shop,
    roles: [roles.ADMIN],
  },
  {
    title: 'Quản lý salon',
    path: '/salons/salon',
    icon: Shop,
    roles: [roles.AGENT],
  },
  {
    title: 'Garbage Transaction History',
    path: '/garbage/history',
    icon: History,
    roles: [roles.ADMIN, roles.AGENT],
  },
  // {
  //   title: 'Thông báo',
  //   path: '/notifications',
  //   icon: Bell,
  //   roles: [roles.SALON],
  // },
];
