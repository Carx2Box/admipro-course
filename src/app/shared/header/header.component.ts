import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { Router } from '@angular/router';

declare var $: any;



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  searcher(term: string) {

    console.log(term);
    if (term ===  '' ||  term=== null) {
      return;
    }

    $('.app-search').hide();

    this.router.navigate(['/finder',term]);
  }
}
