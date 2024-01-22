import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteRecordAnyComponent } from './dialog-delete-record-any.component';

describe('DialogDeleteRecordAnyComponent', () => {
  let component: DialogDeleteRecordAnyComponent;
  let fixture: ComponentFixture<DialogDeleteRecordAnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteRecordAnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteRecordAnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
