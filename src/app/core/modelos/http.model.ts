export namespace Http {
  export interface Response {
    detalles : string;
    mensaje : string;
  }

  export interface SearchQueries {
    nombre : string;
    formato ?: string;
    sinStock ?: string;
    categoriaId ?: string;
    ordenPrecio ?: string;
    ordenTiempo ?: string;
    numPag ?: string;
  }
}