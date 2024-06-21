import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the company logo', () => {
    const logoElement = fixture.nativeElement.querySelector('.header__logo img');
    expect(logoElement).toBeTruthy();
    expect(logoElement.src).toContain('assets/logo.svg');
    expect(logoElement.alt).toEqual('Logo da Empresa');
  });

  it('should have the logo visible', () => {
    const logoElement = fixture.nativeElement.querySelector('.header__logo');
    expect(logoElement.style.display).not.toEqual('none');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
