import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxPipesComponent } from './checkbox-pipes.component';

describe('CheckboxPipesComponent', () => {
  let component: CheckboxPipesComponent;
  let fixture: ComponentFixture<CheckboxPipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxPipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
