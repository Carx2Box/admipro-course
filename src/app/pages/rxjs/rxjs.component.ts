// tslint:disable-next-line:import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    /*
    this.regresaObservable()
    .pipe(
      retry(2)
    )
    .subscribe(
      (contador) => console.log('Subs', contador),
      (err) => console.error('Subs', err),
      () => console.log('Complete')
    );*/

    // this.regresaObservableMap()
    // .subscribe(
    //   (contador) => console.log('Subs', contador),
    //   (err) => console.error('Subs', err),
    //   () => console.log('Complete')
    // );

    this.subscription = this.regresaObservableFilterInfinito()
    .subscribe(
      (contador) => console.log('Subs', contador),
      (err) => console.error('Subs', err),
      () => console.log('Complete')
    );


   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    // Cancelar observable
    this.subscription.unsubscribe();
  }

  regresaObservableFilterInfinito(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);
      }, 1000);
    }).pipe(map((data) => data.valor),
      filter( (valor, index) => valor % 2 === 1));
  }


  regresaObservableFilter(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        if (contador === 3) {
          clearInterval(interval);
          observer.complete();
        }
      }, 1000);
    }).pipe(map((data) => data.valor),
      filter( (valor, index) => valor % 2 === 1));
  }


  regresaObservableMap(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        if (contador === 3) {
          clearInterval(interval);
          observer.complete();
        }
      }, 1000);
    }).pipe(map((data) => data.valor));
  }

  regresaObservable(): Observable<number> {
    return new Observable( (observer: Subscriber<number>) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador += 1;
        observer.next(contador);

        if (contador === 3) {
          clearInterval(interval);
          observer.complete();
        }

        if (contador === 2) {
          // clearInterval(interval);
          observer.error('Auxilio');
        }
      }, 1000);
    });
  }

}
