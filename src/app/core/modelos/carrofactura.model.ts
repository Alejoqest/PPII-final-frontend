export namespace CarroFactura {
    export interface CarroCompras {
        id : number;
        cantidadDeElementos : number;
        precioTotal : number;
    }

    export interface CarroElemento {
        id ?: number;
        peliculaId : number;
        peliculaNombre : string;
        peliculaFormato : 'DVD' | 'BLURAY' | 'UHD';
        unidades : number;
        subTotal : number;
    }

    export interface Factura {
        id : number;
        cantidadDeElementos : number;
        fechaFactura : string;
        precioTotal : number;
    }

    export interface DetallesFactura {
        id : number;
        peliculaId : number;
        peliculaNombre : string;
        peliculaFormato : 'DVD' | 'BLURAY' | 'UHD';
        unidades : number;
        subTotal : number;
    }

    export interface FacturaIntento {
        precioTotal : number;
        detalles : [{
            pelicula : {
                id : number;
            };
            unidades : number;
            subTotal: number;
        }]
    }
}