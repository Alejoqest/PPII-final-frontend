import { Categoria } from "./categoria.model";

export namespace Pelicula {
    export interface PeliculaDatos {
        id : number;
        nombre : string;
        formato : 'DVD' | 'BLURAY' | 'UHD';
        ano : number;
        descripcion : string;
        precio : number;
        stock : number;
    }

    export interface PeliculaBusqueda {
        id : number;
        nombre : string;
        formato : 'DVD' | 'BLURAY' | 'UHD';
        ano : number;
        precio : number;
    }

    export interface PeliculaCreacion {
        id ?: number;
        nombre : string;
        formato : 'DVD' | 'BLURAY' | 'UHD';
        ano : number;
        descripcion : string;
        precio : number;
        stock : number;
        categorias ?: Categoria[];
    }

    export interface PeliculaPortada {
        id : number;
        url : string;
    }
}