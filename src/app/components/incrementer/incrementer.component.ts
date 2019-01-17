import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html'
})
export class IncrementerComponent implements OnInit {
  @Input('nombre') legend: string = 'Leyenda';
  @Input() progress: number = 50;
  @Output('changeValue') changeValueEvent: EventEmitter<number> = new EventEmitter();
  @ViewChild('txtProgress') txtProgress: ElementRef;
  constructor() {
  }

  ngOnInit() {
  }

  onChanges(newValue: number) {
    if (newValue >= 100) {
      newValue = 100;
    } else if (newValue <= 0 ) {
      newValue = 0;
    }

    this.progress = newValue;
    this.txtProgress.nativeElement.value = newValue;
    this.changeValueEvent.emit(this.progress);
  }

  changeValue(valor: number) {

    this.progress = Number(this.progress) + valor;

    if (this.progress > 100) {
      this.progress = 100;
    }

    if (this.progress < 0 ) {
      this.progress = 0;
    }

    this.changeValueEvent.emit(this.progress);
    this.txtProgress.nativeElement.focus();
  }
}
