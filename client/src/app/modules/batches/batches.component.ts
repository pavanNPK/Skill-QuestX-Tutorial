import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { type Batch, type Student, type BatchWithStudents } from './batch.interface';

@Component({
    selector: 'sqx-batches',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        AvatarModule,
        AvatarGroupModule,
        TagModule,
        CardModule,
        TooltipModule
    ],
    templateUrl: './batches.component.html',
    styleUrl: './batches.component.scss',
})
export class BatchesComponent implements OnInit {
    private router = inject(Router);

    // State
    searchQuery = signal('');

    // Mock Students Data
    students: Student[] = [
        { id: 1, name: 'Fiona Gallagher', avatar: 'https://i.pravatar.cc/150?img=1', email: 'fiona@example.com' },
        { id: 2, name: 'George Martin', avatar: 'https://i.pravatar.cc/150?img=2', email: 'george@example.com' },
        { id: 3, name: 'Hannah Lee', avatar: 'https://i.pravatar.cc/150?img=3', email: 'hannah@example.com' },
        { id: 4, name: 'Ian Cooper', avatar: 'https://i.pravatar.cc/150?img=4', email: 'ian@example.com' },
        { id: 5, name: 'Julia Roberts', avatar: 'https://i.pravatar.cc/150?img=5', email: 'julia@example.com' },
        { id: 6, name: 'Kevin Brown', avatar: 'https://i.pravatar.cc/150?img=6', email: 'kevin@example.com' },
        { id: 7, name: 'Laura Davis', avatar: 'https://i.pravatar.cc/150?img=7', email: 'laura@example.com' },
        { id: 8, name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=8', email: 'michael@example.com' },
        { id: 9, name: 'Nina Patel', avatar: 'https://i.pravatar.cc/150?img=9', email: 'nina@example.com' },
        { id: 10, name: 'Oliver Smith', avatar: 'https://i.pravatar.cc/150?img=10', email: 'oliver@example.com' },
        { id: 11, name: 'Patricia Wilson', avatar: 'https://i.pravatar.cc/150?img=11', email: 'patricia@example.com' },
        { id: 12, name: 'Quinn Taylor', avatar: 'https://i.pravatar.cc/150?img=12', email: 'quinn@example.com' },
        { id: 13, name: 'Rachel Green', avatar: 'https://i.pravatar.cc/150?img=13', email: 'rachel@example.com' },
        { id: 14, name: 'Samuel Jackson', avatar: 'https://i.pravatar.cc/150?img=14', email: 'samuel@example.com' },
        { id: 15, name: 'Tina Turner', avatar: 'https://i.pravatar.cc/150?img=15', email: 'tina@example.com' },
    ];

    // Mock Batches Data
    rawBatches: Batch[] = [
        {
            id: 101,
            name: 'Web Development - Batch A',
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-06-15'),
            description: 'Full-stack web development course covering HTML, CSS, JavaScript, React, and Node.js. Students will build real-world projects and learn industry best practices.',
            studentIds: [1, 2, 3, 4, 5]
        },
        {
            id: 102,
            name: 'Web Development - Batch B',
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-07-01'),
            description: 'Full-stack web development course with focus on modern frameworks including React, Angular, and Vue.js. Includes advanced topics like state management and testing.',
            studentIds: [6, 7, 8, 9, 10]
        },
        {
            id: 103,
            name: 'Data Science - Batch A',
            startDate: new Date('2024-03-01'),
            endDate: new Date('2024-08-01'),
            description: 'Comprehensive data science program covering Python, Machine Learning, Deep Learning, and AI. Hands-on projects with real datasets.',
            studentIds: [11, 12, 13, 14, 15]
        },
        {
            id: 104,
            name: 'Mobile App Development',
            startDate: new Date('2024-01-20'),
            endDate: new Date('2024-06-20'),
            description: 'iOS and Android development using React Native and Flutter. Build cross-platform mobile applications with modern tools and frameworks.',
            studentIds: [1, 3, 5, 7, 9, 11]
        },
        {
            id: 105,
            name: 'Cloud Computing - AWS',
            startDate: new Date('2024-02-15'),
            description: 'AWS cloud architecture and deployment strategies. Learn EC2, S3, Lambda, and other AWS services. Prepare for AWS certification.',
            studentIds: [2, 4, 6, 8]
        },
        {
            id: 106,
            name: 'UI/UX Design Fundamentals',
            startDate: new Date('2024-03-10'),
            description: 'Design thinking, Figma, and user research methodologies. Create beautiful and functional user interfaces with industry-standard tools.',
            studentIds: [10, 12, 14, 15]
        }
    ];

    // Computed batches with students
    batches = computed<BatchWithStudents[]>(() => {
        return this.rawBatches.map(batch => ({
            ...batch,
            students: this.students.filter(s => batch.studentIds.includes(s.id)),
            studentCount: batch.studentIds.length
        }));
    });

    // Filtered batches based on search
    filteredBatches = computed(() => {
        const query = this.searchQuery().toLowerCase();
        if (!query) return this.batches();

        return this.batches().filter(batch =>
            batch.name.toLowerCase().includes(query) ||
            batch.description.toLowerCase().includes(query)
        );
    });

    ngOnInit() {
        // Store batches data in a service or state management solution
        // For now, we'll use localStorage as a simple solution
        if (typeof window !== 'undefined') {
            localStorage.setItem('batchesData', JSON.stringify(this.rawBatches));
            localStorage.setItem('studentsData', JSON.stringify(this.students));
        }
    }

    // Navigate to batch details
    viewBatchDetails(batchId: number) {
        this.router.navigate(['/batches', batchId]);
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}
