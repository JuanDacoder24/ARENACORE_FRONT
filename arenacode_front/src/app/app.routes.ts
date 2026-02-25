import { Routes } from '@angular/router';
import { LanginPage } from './pages/langin-page/langin-page';
import { Login } from './pages/login/login';
import { PerfilUser } from './pages/perfil-user/perfil-user';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Error404 } from './pages/error404/error404';
import { PageJuegos } from './pages/page-juegos/page-juegos';
import { PageTorneos } from './pages/page-torneos/page-torneos';
import { Faqs } from './pages/faqs/faqs';
import { FormTorneo } from './pages/form-torneo/form-torneo';
import { Info } from './pages/info/info';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'landingPage'},
    {path: 'landingPage', component: LanginPage},
    {path: 'login', component: Login},
    {
        path: 'dashboard', component: Dashboard, canActivate:[authGuard], children:
        [
            {path:'', pathMatch:'full', redirectTo:'home'},
            {path: 'perfilUser', component: PerfilUser},
            {path: 'pageJuegos', component: PageJuegos},
            {path: 'pageTorneos', component: PageTorneos},
            {path: 'faqs', component: Faqs},
            {path: 'formTorneo', component: FormTorneo},
            {path: 'info', component: Info},
        ]
    },
    {path: 'error404', component: Error404},
    {path: '**', redirectTo: 'error404' }
    
];
