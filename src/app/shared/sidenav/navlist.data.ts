export interface NavListItem {
  routerLink: string;
  name: string;
  icon: string;
  isMatIcon: boolean;
  condition: boolean;
  onAuthenticate: boolean;
}
export const NavList: NavListItem[] = [
  {
    routerLink: '/auth/login',
    name: 'Login',
    icon: 'login',
    isMatIcon: true,
    condition: true,
    onAuthenticate: false,
  },
  {
    routerLink: '/auth/signup',
    name: 'Signup',
    icon: 'create',
    isMatIcon: true,
    condition: true,
    onAuthenticate: false,
  },
];
