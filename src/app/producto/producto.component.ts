import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoRespuesta, ProductoService } from '../servicios/producto.service';
import Swal from 'sweetalert2';


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

    Swal.fire({
      title: 'Enviando...',
      text: 'Calculando precio final',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.productoService.predecirPrecio(producto).subscribe({
      next: (respuesta: ProductoRespuesta) => {
        this.precioFinalCalculado = respuesta.precioFinal;

        Swal.fire({
          icon: 'success',
          title: 'Precio Calculado',
          text: `El precio final es: Q ${respuesta.precioFinal.toFixed(2)}`,
        });
      },
      error: (err) => {
        console.error('Error al llamar al API', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al obtener el precio final.',
        });
      }
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario incompleto',
      text: 'Por favor, completa todos los campos requeridos.',
    });
  }
}


}
