// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';
import { BatchesComponent } from './pages/batches.component';
import { BatchDetailComponent } from './pages/batch-detail.component';

export const batchesRoutes: Routes = [
    {
        path: '',
        component: BatchesComponent
    },
    {
        path: ':id',
        component: BatchDetailComponent
    }
];
