import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() coinName: string = '';
  @Input() coinValue: string = '';
  @Input() coinPctChange: number = 0;
  @Input() coinLastUpdate: string = ''; 

  getClassBasedOnPrice(){
    const value = parseFloat(this.coinValue);

    if(value <= 1){
      return 'card__price--red'
    }
    else if(value > 1 && value <= 5){
      return 'card__price--green'
    }
    else{
      return 'card__price--blue'
    }
  }
}
