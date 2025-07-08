import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export type DialogData = {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onAccept?: Function;
  onCancel?: Function;
};

@Component({
  selector: 'confirm-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ConfirmDialogComponent<T extends DialogData> {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent<T>>);
  readonly data = inject<T>(MAT_DIALOG_DATA);

  onAccept() {
    this.data.onAccept!();
  }

  onCancel() {
    this.data.onCancel!();
  }
}
