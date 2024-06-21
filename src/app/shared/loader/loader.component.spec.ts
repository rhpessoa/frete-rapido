import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from '../services/loader.service';
import { BehaviorSubject } from 'rxjs';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [LoaderService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set showLoader to true when loaderService emits true', () => {
    loaderService.showLoader();
    fixture.detectChanges();
    expect(component.showLoader).toBeTrue();
  });

  it('should set showLoader to false when loaderService emits false', () => {
    component.showLoader = true;
    loaderService.hideLoader();
    fixture.detectChanges();

    expect(component.showLoader).toBeFalse();
  });
});
