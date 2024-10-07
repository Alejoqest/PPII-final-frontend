export namespace Usuario {
    export interface UsuarioDatos {
        id : number;
        nombre : string;
        apellido : string;
        apodo : string;
        email : string;
        telefono : string;
        dinero ?: number;
        rol : 'CLIENTE' | 'ADMIN';
    }

    export interface UsuarioResultado {
        id : number;
        apodo : string;
        email : string;
        rol : 'GUEST' | 'CLIENTE' | 'ADMIN';
    }

    export interface UsuarioCreacion {
        nombre : string;
        apellido : string;
        apodo : string;
        email : string;
        contrasena : string;
        telefono : string;
        rol : 'CLIENTE' | 'ADMIN';
    }

    export interface UsuarioContrasena {
        id : number;
        contrasena : string;
        viejaContrasena : string;
    }

    export interface UsuarioDinero {
        id : number;
        dinero ?: number;
    }

    export interface UsuarioFoto {
        id : number;
        nombreArchivo : string;
    }
}