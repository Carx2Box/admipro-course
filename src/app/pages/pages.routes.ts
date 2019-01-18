import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medics/medic.component';
import { FinderComponent } from './finder/finder.component';

// Guards
import { AdminGuard, ChecktokenGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ChecktokenGuard],
        data: { title: 'Dashboard' }
    },
    { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
    { path: 'graphics1', component: Graficas1Component, data: { title: 'Gráficas' } },
    { path: 'promises', component: PromesasComponent, data: { title: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
    { path: 'finder/:term', component: FinderComponent, canActivate: [ChecktokenGuard], data: { title: 'Finder' } },
    { path: 'account-settings', component: AccoutSettingsComponent, data: { title: 'Custom Theme' } },
    // Admin
    { path: 'users', component: UsersComponent, canActivate: [AdminGuard, ChecktokenGuard ], data: { title: 'Users mantenaince' } },
    { path: 'hospitals', component: HospitalsComponent, canActivate: [ChecktokenGuard ], data: { title: 'Hospitals mantenaince' } },
    { path: 'doctors', component: MedicsComponent,  canActivate: [ChecktokenGuard ], data: { title: 'Doctors mantenaince' } },
    { path: 'doctor/:id', component: MedicComponent,  canActivate: [ChecktokenGuard ], data: { title: 'Doctor update' } },
    // Default
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
