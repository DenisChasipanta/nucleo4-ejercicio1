import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { InformacionComponent } from './screens/informacion/informacion.component';
import { InicioComponent } from './screens/inicio/inicio.component';
import { ProductoComponent } from './screens/producto/producto.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'productos', component: ProductoComponent },
    { path: 'producto/:id', component: ProductoComponent },
    { path: 'informacion', component: InformacionComponent },
    { path: '**', redirectTo: '' }
];
