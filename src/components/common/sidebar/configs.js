import { roles } from "../../../constant";
import { Dashboard, History, Shop, User, Gift } from "../../icons";

export const configs = [
  {
    title: "Dashboard",
    path: "/",
    icon: Dashboard,
    roles: [roles.ADMIN, roles.AGENT],
  },
  {
    title: "Manage account",
    path: "/accounts",
    icon: User,
    roles: [roles.ADMIN],
  },
  {
    title: "Quản lý salons",
    path: "/salons",
    icon: Shop,
    roles: [roles.ADMIN],
  },
  {
    title: "Quản lý salon",
    path: "/salons/salon",
    icon: Shop,
    roles: [roles.AGENT],
  },
  {
    title: "My Gift",
    path: "/gift/owner",
    icon: Gift,
    roles: [roles.AGENT],
  },
  {
    title: "My Staff",
    path: "/agent/mystaff",
    icon: User,
    roles: [roles.AGENT],
  },
  {
    title: "Garbage Transaction History",
    path: "/history/garbage",
    icon: History,
    roles: [roles.AGENT, roles.ADMIN],
  },
  {
    title: "Gift Transaction History",
    path: "/history/gift",
    icon: History,
    roles: [roles.AGENT, roles.ADMIN],
  },
  // {
  //   title: 'Thông báo',
  //   path: '/notifications',
  //   icon: Bell,
  //   roles: [roles.SALON],
  // },
];
