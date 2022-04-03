import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss'],
})
export class AddUpdateComponent implements OnInit {
  pageType = '';
  addUpdateForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.pageType = this.data.pageType;
    this.addUpdateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', [Validators.required]],
    });
    if (this.pageType === 'edit') {
      this.populateForm();
    }
  }
  populateForm() {
    this.addUpdateForm.get('name')?.patchValue(this.data.data.name);
    this.addUpdateForm.get('email')?.patchValue(this.data.data.email);
    this.addUpdateForm.get('location')?.patchValue(this.data.data.location);
  }
  closeDialog(): void {
    this.dialogRef.close({ pageType: this.pageType, data: this.addUpdateForm.value });
  }
}
