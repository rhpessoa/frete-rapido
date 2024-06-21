import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-host-component',
  template: `
    <app-card
      [coinName]="coinName"
      [coinValue]="coinValue"
      [coinPctChange]="coinPctChange"
      [coinLastUpdate]="coinLastUpdate"
    ></app-card>
  `,
})
class TestHostComponent {
  coinName: string = 'CAD';
  coinValue: string = '4,00';
  coinPctChange: number = 1.5;
  coinLastUpdate: string = '2024-06-17T19:03';
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the coin name', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.card__title');
    expect(titleElement.textContent).toContain('CAD');
  });

  it('should render the coin value with correct styling', () => {
    const priceElement: HTMLElement = fixture.nativeElement.querySelector('.card__price');
    expect(priceElement.textContent).toContain('R$4,00');
    expect(priceElement.classList).toContain('card__price--green');
  });

  it('should render the percentage change', () => {
    const pctChangeElement: HTMLElement = fixture.nativeElement.querySelector('.card__info-value');
    expect(pctChangeElement.textContent).toContain('1.5');
  });

  it('should render the last update date', () => {
    const lastUpdateElement: HTMLElement = fixture.nativeElement.querySelector('.card__info-data');
    expect(lastUpdateElement.textContent).toContain('2024-06-17T19:03');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
