import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-clothes',
  templateUrl: './add-clothes.component.html',
})
export class AddClothesComponent {
  clothesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clothesForm = this.fb.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      color: [''],
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.clothesForm.valid) {
      console.log('Clothes data:', this.clothesForm.value);
      // Save clothes logic
    }
  }
}
