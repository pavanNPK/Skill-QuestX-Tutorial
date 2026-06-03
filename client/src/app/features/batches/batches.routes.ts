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
