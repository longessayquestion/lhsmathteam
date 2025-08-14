import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'info',
    loadComponent: () => import('./info/info.page').then( m => m.InfoPage)
  },
  {
    path: 'coaches',
    loadComponent: () => import('./coaches/coaches.page').then( m => m.CoachesPage)
  },
  {
    path: 'signin',
    loadComponent: () => import('./signin/signin.page').then( m => m.SignInPage)
  },
  {
    path: 'ictm',
    loadComponent: () => import('./ictm/ictm.page').then( m => m.ICTMPage)
  },
];
