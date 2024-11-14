import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NumberGenerator } from '@components/number-generator/number-generator.dialog';
import { GeneratorFormValues } from '@models/number-generator-form.model';
import { GeneratorValues } from '@models/number-generator.model';
@Component({
  selector: 'czt-number-gen-form',
  templateUrl: './number-generator-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    NgFor,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule
  ],
})
export class NumberGeneratorForm {
  fb = inject(FormBuilder)
  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  formControl = this.fb.group<GeneratorFormValues>({
    desiredLength: this.fb.control<number | null>(
      null,
      Validators.compose([Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")])
    ),
    favouriteNumber: this.fb.control<number | null>(null, Validators.required),
  });
  constructor(private matDialog: MatDialog) { }
  get desiredLengthControl() {
    return this.formControl.get('desiredLength');
  }
  get favouriteNumberControl() {
    return this.formControl.get('favouriteNumber');
  }

  generateNumber() {
    if (!this.formControl.valid) {
      this.formControl.markAsDirty();
      this.formControl.markAllAsTouched();
      this.favouriteNumberControl?.markAsDirty();
      this.desiredLengthControl?.markAsDirty();
    } else {
      let values: GeneratorValues = {
        desiredLength: this.formControl.value.desiredLength ? this.formControl.value.desiredLength : 0,
        favouriteNumber: this.formControl.value.favouriteNumber ? this.formControl.value.favouriteNumber : 0
      }
      this.openNumGenPopup(values);
    }
  }

  openNumGenPopup(genValues: GeneratorValues) {
    this.matDialog.open(NumberGenerator, {
      data: genValues
    });
  }
}
