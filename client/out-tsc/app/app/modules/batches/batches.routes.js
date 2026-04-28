import { BatchesComponent } from './batches.component';
import { BatchDetailComponent } from './batch-detail.component';
export const batchesRoutes = [
    {
        path: '',
        component: BatchesComponent
    },
    {
        path: ':id',
        component: BatchDetailComponent
    }
];
