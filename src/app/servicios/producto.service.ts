import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  nombre: string;
  marca: string;
  categoria: string;
  tipoProducto: string;
  precioSugerido?: number
}

// Define interfaz para la respuesta del API
export interface ProductoRespuesta {
  precio_sugerido: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8000/api/sugerir-precio'; 
  private  url = 'http://localhost:8000/api/productos';

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

/* guardarProducto(producto: Producto): Observable<any> {
  const payload = {
    prod_name: producto.nombre,
    prod_brand: producto.marca,
    subcategory: producto.categoria,
    tags: producto.tipoProducto,
    precio_sugerido: producto.precioSugerido
  };

  return this.http.post<any>(this.url, payload);
} */
guardarProducto(producto: any): Observable<any> {
  return this.http.post<any>(this.url, producto);
}



}
