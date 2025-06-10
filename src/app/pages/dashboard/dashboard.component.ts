import { Component, OnInit, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private fb = inject(FormBuilder);
  private fsService = inject(FirestoreService);

  itemForm!: FormGroup;
  availableSeasons = ['Summer', 'Winter', 'All'];
  isSubmitting = false;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.itemForm = this.fb.group({
      type: ['', Validators.required],
      seasons: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
      colors: this.fb.array([this.createColorGroup()], Validators.required),
    });
  }

  createColorGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      style: ['', Validators.required],
      imageFiles: [[], Validators.required],
    });
  }

  get colors(): FormArray {
    return this.itemForm.get('colors') as FormArray;
  }

  addColor() {
    this.colors.push(this.createColorGroup());
  }

  removeColor(index: number) {
    this.colors.removeAt(index);
  }

  addImage(colorIndex: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const currentFiles =
        this.colors.at(colorIndex).get('imageFiles')?.value || [];
      this.colors
        .at(colorIndex)
        .patchValue({
          imageFiles: [...currentFiles, ...Array.from(input.files)],
        });
    }
  }

  onSeasonChange(event: Event) {
    const seasonsArray: FormArray = this.itemForm.get('seasons') as FormArray;
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      seasonsArray.push(new FormControl(checkbox.value));
    } else {
      const index = seasonsArray.controls.findIndex(
        (x) => x.value === checkbox.value
      );
      seasonsArray.removeAt(index);
    }
  }

  submitItem() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      alert('Please fill all required fields.');
      return;
    }
    this.isSubmitting = true;
    const formValue = this.itemForm.value;
    this.fsService
      .addItemWithSeasons(formValue.type, formValue.colors, formValue.seasons)
      .then(() => {
        alert('Item added successfully!');
        this.itemForm.reset();
        this.colors.clear();
        this.addColor();
        (this.itemForm.get('seasons') as FormArray).clear();
        document
          .querySelectorAll('input[type=checkbox]')
          .forEach((el) => ((el as HTMLInputElement).checked = false));
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred!');
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }
}
