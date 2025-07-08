import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type DialogData = {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onAccept?: Function;
  onCancel?: Function;
};

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent<DialogData>;
  let fixture: ComponentFixture<ConfirmDialogComponent<DialogData>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfirmDialogComponent,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Test Title',
            message: 'Test Message',
            confirmText: 'Confirm',
            cancelText: 'Cancel',
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
