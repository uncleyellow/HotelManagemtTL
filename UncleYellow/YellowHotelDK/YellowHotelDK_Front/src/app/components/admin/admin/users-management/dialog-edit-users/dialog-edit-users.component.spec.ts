import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUsersComponent } from './dialog-edit-users.component';

describe('DialogEditUsersComponent', () => {
  let component: DialogEditUsersComponent;
  let fixture: ComponentFixture<DialogEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
