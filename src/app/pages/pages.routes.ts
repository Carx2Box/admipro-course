import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medics/medic.component';
import { FinderComponent } from './finder/finder.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'graphics1', component: Graficas1Component, data: { title: 'Gráficas' } },
            { path: 'promises', component: PromesasComponent, data: { title: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
            { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
            { path: 'finder/:term', component: FinderComponent, data: { title: 'Finder' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { title: 'Custom Theme' } },
            // Admin
            { path: 'users', component: UsersComponent, canActivate: [AdminGuard], data: { title: 'Users mantenaince' } },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals mantenaince' } },
            { path: 'doctors', component: MedicsComponent, data: { title: 'Doctors mantenaince' } },
            { path: 'doctor/:id', component: MedicComponent, data: { title: 'Doctor update' } },

            // Default
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
