import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDelivererComponent } from './add-deliverer.component';

describe('AddDelivererComponent', () => {
  let component: AddDelivererComponent;
  let fixture: ComponentFixture<AddDelivererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDelivererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDelivererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
