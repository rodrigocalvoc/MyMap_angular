import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagInfoComponent } from './flag-info.component';

describe('FlagInfoComponent', () => {
  let component: FlagInfoComponent;
  let fixture: ComponentFixture<FlagInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlagInfoComponent]
    });
    fixture = TestBed.createComponent(FlagInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
