import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
titlePage: string;

  constructor( private router: Router,
               private title: Title,
               private meta: Meta  ) {
    this.getDataRoute().subscribe(data => {
      this.titlePage = data;
      // Poner title en el navegador.
      this.title.setTitle( this.titlePage);
      const metaDescriptionTag: MetaDefinition = {
        name: 'description',
        content: this.titlePage
      };

      // Update Tag.
      this.meta.updateTag(metaDescriptionTag);
    });
  }

  ngOnInit() {

  }

  getDataRoute() {
    return this.router.events
    .pipe(   filter((event) => event instanceof ActivationEnd ),
             filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
             map((event: ActivationEnd) => event.snapshot.data.title)
    );
  }
}
