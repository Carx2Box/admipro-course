import { NgModule } from '@angular/core';

import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        BreadcrumsComponent,
        NopagefoundComponent,
        SidebarComponent,
        HeaderComponent
    ],
    imports: [],
    exports: [
        BreadcrumsComponent,
        NopagefoundComponent,
        SidebarComponent,
        HeaderComponent
    ],
    providers: [],
})
export class SharedModule {}
