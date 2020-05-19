import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDialogComponent } from './insert-dialog.component';

describe('InsertDialogComponent', () => {
  let component: InsertDialogComponent;
  let fixture: ComponentFixture<InsertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
