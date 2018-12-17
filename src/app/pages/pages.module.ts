import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { ChartsModule } from 'ng2-charts';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { ProgressComponent } from './progress/progress.component';
// Temporal
import { IncrementerComponent } from '../components/incrementer/incrementer.component';
import { DoughnutchartComponent } from '../components/doughnutchart/doughnutchart.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphic1Component,
        IncrementerComponent,
        DoughnutchartComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphic1Component
    ],
    providers: [],
})
export class PagesModule { }
