import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/login/login.component').then(a => a.LoginComponent)},
    {path: 'browse', loadComponent: () => import('./pages/browse/browse.component').then(a => a.BrowseComponent)},
    { path: 'browse/movie/:id', loadComponent: () => import('./pages/movie-details/movie-details.component').then(a => a.MovieDetailsComponent)},
    { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
