import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  nombre: string;
  marca: string;
  categoria: string;
  tipoProducto: string;
}

// Define interfaz para la respuesta del API
export interface ProductoRespuesta {
  precio_sugerido: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://tu-api.com/prediccion';  // Cambia a la URL real del API

  constructor(private http: HttpClient) { }

 predecirPrecio(producto: Producto): Observable<ProductoRespuesta> {
  const payload = {
    prod_name: producto.nombre,
    prod_brand: producto.marca,
    subcategory: producto.categoria,
    tags: producto.tipoProducto
  };

  return this.http.post<ProductoRespuesta>(this.apiUrl, payload);
}

}
