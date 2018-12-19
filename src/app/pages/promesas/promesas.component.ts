import { Component, OnInit } from '@angular/core';
import { containsTree } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

      this.contarTres()
        .then((data: boolean) => console.log('Ok', data) )
        .catch((err) => console.error('Error', err));
   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    return new Promise<boolean>( (resolve, reject) => {
      let contador = 0;
      const interval = setInterval( () => {
        contador += 1;
        console.log(contador);

        if (contador === 3) {
          resolve(true);
          // reject('Fin reject.');
          clearInterval(interval);
        }

      }, 1000);
    });
  }

}
