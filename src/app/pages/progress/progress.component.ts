import { Component, OnInit } from '@angular/core';
import { isNumber } from 'util';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  progress1: number = 20;
  progress2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  updateProgress(event: number) {
    console.log('Evento' , event);
  }
}
