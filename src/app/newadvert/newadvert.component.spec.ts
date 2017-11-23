/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewadvertComponent } from './newadvert.component';

describe('NewadvertComponent', () => {
  let component: NewadvertComponent;
  let fixture: ComponentFixture<NewadvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewadvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewadvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
