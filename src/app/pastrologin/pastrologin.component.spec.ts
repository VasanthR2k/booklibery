import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastrologinComponent } from './pastrologin.component';

describe('PastrologinComponent', () => {
  let component: PastrologinComponent;
  let fixture: ComponentFixture<PastrologinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastrologinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastrologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
