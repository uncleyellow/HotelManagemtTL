import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRoomStatusComponent } from './dialog-room-status.component';

describe('DialogRoomStatusComponent', () => {
  let component: DialogRoomStatusComponent;
  let fixture: ComponentFixture<DialogRoomStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRoomStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRoomStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
