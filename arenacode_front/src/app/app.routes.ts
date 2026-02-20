import { Routes } from '@angular/router';
import { LanginPage } from './pages/langin-page/langin-page';
import { Login } from './pages/login/login';
import { PerfilUser } from './pages/perfil-user/perfil-user';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Error404 } from './pages/error404/error404';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'landingPage'},
    {path: 'landingPage', component: LanginPage},
    {path: 'login', component: Login},
    {
        path: 'dashboard', component: Dashboard, canActivate:[authGuard], children:
        [
            {path:'', pathMatch:'full', redirectTo:'home'},
            {path: 'perfilUser', component: PerfilUser},
        ]
    },
    {path: 'error404', component: Error404},
    {path: '**', redirectTo: 'error404' }
    
];
