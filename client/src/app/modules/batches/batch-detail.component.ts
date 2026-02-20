import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { type Batch, type Student, type BatchWithStudents } from './batch.interface';
import { HeaderService } from '../core/services/header.service';

@Component({
    selector: 'sqx-batch-detail',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        AvatarModule,
        TagModule,
        CardModule
    ],
    templateUrl: './batch-detail.component.html',
    styleUrl: './batch-detail.component.scss',
})
export class BatchDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private headerService = inject(HeaderService);

    batch = signal<BatchWithStudents | null>(null);
    students = signal<Student[]>([]);

    ngOnInit() {
        const batchId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadBatchData(batchId);
    }

    loadBatchData(batchId: number) {
        // Load from localStorage (in a real app, this would be a service)
        if (typeof window !== 'undefined') {
            const batchesData = localStorage.getItem('batchesData');
            const studentsData = localStorage.getItem('studentsData');

            if (batchesData && studentsData) {
                const batches: Batch[] = JSON.parse(batchesData);
                const allStudents: Student[] = JSON.parse(studentsData);

                const foundBatch = batches.find(b => b.id === batchId);
                if (foundBatch) {
                    const batchStudents = allStudents.filter(s => foundBatch.studentIds.includes(s.id));
                    this.batch.set({
                        ...foundBatch,
                        students: batchStudents,
                        studentCount: foundBatch.studentIds.length
                    });
                    this.students.set(batchStudents);

                    // Set custom breadcrumb with batch name
                    this.headerService.updateBreadcrumbs([
                        { label: 'Home', icon: 'pi pi-home', url: '/dashboard' },
                        { label: 'Batches', url: '/batches' },
                        { label: foundBatch.name, title: foundBatch.name }
                    ]);
                }
            }
        }
    }

    goBack() {
        this.router.navigate(['/batches']);
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getDateRange(): string {
        const batch = this.batch();
        if (!batch) return '';

        const start = this.formatDate(batch.startDate);
        const end = batch.endDate ? this.formatDate(batch.endDate) : 'Ongoing';
        return `${start} - ${end}`;
    }
}
