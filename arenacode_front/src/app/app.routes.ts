import { Routes } from '@angular/router';
import { LanginPage } from './pages/langin-page/langin-page';
import { Login } from './pages/login/login';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'landingPage'},
    {path: 'landingPage', component: LanginPage},
    {path: 'login', component: Login},
];
