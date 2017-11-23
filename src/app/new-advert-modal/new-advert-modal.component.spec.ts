import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdvertModalComponent } from './new-advert-modal.component';

describe('NewAdvertModalComponent', () => {
  let component: NewAdvertModalComponent;
  let fixture: ComponentFixture<NewAdvertModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdvertModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdvertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
