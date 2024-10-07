import { Routes } from '@angular/router';
import { GeneratorComponent } from './compartido/componentes/generator/generator.component';
import { ModificarPeliculaComponent } from './paginas/modificar-pelicula/modificar-pelicula.component';

export const routes: Routes = [
    {
        path : 'home',
        loadComponent : () => import('./paginas/principal/principal.page').then(p => p.PrincipalPage),
    },
    {
        path : '',
        redirectTo : '/home',
        pathMatch : 'full',
    },
    {
        path : 'explorar', 
        loadComponent : () => import('./paginas/busqueda/busqueda.page').then(p => p.BusquedaPage),
    },
    {
        path : 'pelicula/:id',
        loadComponent: () => import('./paginas/pelicula/peliculaInfo.page').then(p => p.PeliculaInfoPage),
    },
    {path : 'editar/:id', component: ModificarPeliculaComponent},
    {path : 'admin/pelicula', component : GeneratorComponent},
    {
        path : 'registrar', 
        loadComponent : () => import('./paginas/registrar/registrar.page').then(p => p.RegistrarPage),
    },
    {
        path : 'login',
        loadComponent : () => import('./paginas/login/login.page').then(p => p.LoginPage),
    },
    {
        path : 'cuenta',
        loadComponent : () => import('./paginas/usuario/usuario.page').then(p => p.UsuarioPage),
    },
    {
        path : 'carro',
        loadComponent : () => import('./paginas/carro/carro.page').then(p => p.CarroPage),
    },
    {
        path : '**',
        loadComponent : () => import('./paginas/error/error.component').then(p => p.ErrorComponent),
    }
];
