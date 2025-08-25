import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  imports:[ReactiveFormsModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css'
})
export class CategoriaForm {
categoriaForm: FormGroup;

  constructor(private location: Location, private fb: FormBuilder) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.categoriaForm.valid) {
    console.log(this.categoriaForm.value);
  } else {
    console.log('Formulario inválido');
  }
}


  goBack() {
    this.location.back();
  }


}
