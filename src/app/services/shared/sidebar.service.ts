import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Graphics', url: '/graphics1' },
        { titulo: 'Promises', url: '/promises' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Administration',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Users', url: '/users' },
        { titulo : 'Hospitals', url: '/hospitals' },
        { titulo: 'Doctors', url: '/doctors' }
      ]
    }
  ];

  constructor() { }

}
