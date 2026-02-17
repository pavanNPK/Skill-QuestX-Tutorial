import { Routes } from '@angular/router';
import { BatchesComponent } from './batches.component';
import { BatchDetailComponent } from './batch-detail.component';

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
