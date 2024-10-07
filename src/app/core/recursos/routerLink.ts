export interface LinkInter {
    nombre : string;
    link : string;
}

export const guestLinks : LinkInter [] = [
    {
        nombre : 'Registrar',
        link : '/registrar'
    },
    {
        nombre : 'Iniciar Sesion',
        link : '/login'
    }
]

export const accountLinks : LinkInter[] = [
    {
        nombre : 'Cuenta',
        link : '/cuenta'
    },
    {
        nombre : 'Carro',
        link: '/carro'
    }
]