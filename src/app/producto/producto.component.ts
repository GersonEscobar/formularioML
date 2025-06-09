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
      precioFinal: [{value: null, disabled: true}, [Validators.required, Validators.min(0)]], 
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
          this.precioFinalCalculado = respuesta.precio_sugerido;
          this.productoForm.get('precioFinal')?.setValue(this.precioFinalCalculado);
          this.productoForm.get('precioFinal')?.enable();

          Swal.close();

          Swal.fire({
            icon: 'success',
            title: 'Precio Calculado',
            html: `<h4>Q ${respuesta.precio_sugerido.toFixed(2)}</h4>`,
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


  onGuardar() {
  if (this.productoForm.valid) {
    const producto = this.productoForm.value;

    Swal.fire({
      title: 'Guardando...',
      text: 'Enviando datos al servidor',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.productoService.guardarProducto(producto).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado exitoso',
          text: 'El producto fue guardado correctamente.'
        });
      },
      error: (err) => {
        console.error('Error al guardar el producto', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo guardar el producto.'
        });
      }
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario incompleto',
      text: 'Completa todos los campos antes de guardar.'
    });
  }
}


}