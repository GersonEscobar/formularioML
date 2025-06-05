import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoRespuesta, ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  productoForm: FormGroup;
  precioFinalCalculado?: number;

  constructor(private fb: FormBuilder, private productoService: ProductoService) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      categoria: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      precioSugerido: [0, [Validators.required, Validators.min(0)]]
    });
  }

   onSubmit() {
    if (this.productoForm.valid) {
      const producto = this.productoForm.value;

      this.productoService.predecirPrecio(producto)
        .subscribe({
          next: (respuesta: ProductoRespuesta) => {
            this.precioFinalCalculado = respuesta.precioFinal;
          },
          error: (err) => {
            console.error('Error al llamar al API', err);
            alert('Error al obtener el precio final');
          }
        });
    }
  }

}
