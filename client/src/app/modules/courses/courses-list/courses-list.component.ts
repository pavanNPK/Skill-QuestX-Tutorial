import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CarouselModule } from 'primeng/carousel';

interface Course {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    discount: number;
    unavailable?: boolean;
    accentColor?: string;
}

interface MyCourse {
    name: string;
    instructor: string;
    progress: number;
    progressColor: string;
    status: string;
    startDate: string;
    endDate: string;
    nextLiveClass: string;
}

@Component({
    selector: 'app-courses-list',
    standalone: true,
    imports: [CommonModule, ButtonModule, TooltipModule, CarouselModule],
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

    courses: Course[] = [
        {
            id: 1,
            title: 'Program Overview',
            description: 'Medical Coding is a core healthcare profession that involves translating clinical documentation such as diagnoses, procedures, and services into standardized medical codes.',
            thumbnail: 'assets/images/medical-coding.jpg',
            price: 150.00,
            discount: 33,
            accentColor: '#6730de'
        },
        {
            id: 2,
            title: 'Course Highlights',
            description: 'Comprehensive coverage of ICD-10-CM, ICD-10-PCS, CPT, and HCPCS Level II coding systems with trainer-led live sessions.',
            thumbnail: 'assets/images/course-highlights.jpg',
            price: 150.00,
            discount: 20,
            accentColor: '#f59e0b'
        },
        {
            id: 3,
            title: 'Who Should Enroll',
            description: 'Life Science graduates, Pharmacy, Nursing, Allied Health professionals, and those transitioning into healthcare IT and RCM roles.',
            thumbnail: 'assets/images/who-enroll.jpg',
            price: 150.00,
            discount: 0,
            accentColor: '#10b981'
        },
        {
            id: 4,
            title: 'Curriculum Summary',
            description: 'Healthcare fundamentals, medical terminology, anatomy, diagnosis coding using ICD-10-CM, inpatient procedure coding using ICD-10-PCS.',
            thumbnail: 'assets/images/curriculum.jpg',
            price: 150.00,
            discount: 15,
            accentColor: '#3b82f6'
        },
        {
            id: 5,
            title: 'Certification Prepared',
            description: 'CPC – Certified Professional Coder (AAPC), CIC – Certified Inpatient Coder, CCS – Certified Coding Specialist (AHIMA).',
            thumbnail: 'assets/images/certification.jpg',
            price: 150.00,
            discount: 0,
            accentColor: '#8b5cf6'
        },
        {
            id: 6,
            title: 'Career Opportunities',
            description: 'Medical Coder, Inpatient/Outpatient Coder, Coding Auditor, Medical Billing Analyst, AR Analyst, Clinical Documentation Specialist.',
            thumbnail: 'assets/images/career.jpg',
            price: 150.00,
            discount: 25,
            accentColor: '#ec4899'
        },
        {
            id: 7,
            title: 'Specialty & Advanced Training',
            description: 'Inpatient DRG Coding, DRG Validation, Clinical Documentation Improvement (CDI), Ambulatory & Outpatient Coding, E&M Coding.',
            thumbnail: 'assets/images/specialty.jpg',
            price: 150.00,
            discount: 10,
            accentColor: '#14b8a6'
        },
        {
            id: 8,
            title: 'Coding Best Practices & Tips',
            description: 'Code strictly from provider documentation, ensure proper linkage between diagnosis and procedures for medical necessity.',
            thumbnail: 'assets/images/best-practices.jpg',
            price: 150.00,
            discount: 0,
            accentColor: '#f97316'
        },
        {
            id: 9,
            title: 'CMS & Industry Updates',
            description: 'Latest CMS ICD-10-CM and ICD-10-PCS guideline updates, OPPS and APC fundamentals, Medicare compliance requirements.',
            thumbnail: 'assets/images/cms-updates.jpg',
            price: 150.00,
            discount: 20,
            accentColor: '#ef4444'
        }
    ];

    myCourses: MyCourse[] = [
        {
            name: 'UI/UX Design',
            instructor: 'John Doe',
            progress: 50,
            progressColor: '#3B82F6',
            status: 'In Progress',
            startDate: 'Jan 10, 2025',
            endDate: 'Mar 15, 25',
            nextLiveClass: 'Feb 5, 2025'
        },
        {
            name: 'UI/UX Design',
            instructor: 'John Doe',
            progress: 15,
            progressColor: '#3B82F6',
            status: 'In Progress',
            startDate: 'Jan 10, 2025',
            endDate: 'Mar 15, 25',
            nextLiveClass: 'Feb 5, 2025'
        }
    ];

    constructor(private router: Router) { }

    navigateToAddCourse() {
        this.router.navigate(['/courses/add']);
    }

    calculateDiscountedPrice(price: number, discount: number): string {
        if (!discount || discount <= 0) return price.toFixed(2);
        const discounted = price - (price * (discount / 100));
        return discounted.toFixed(2);
    }
}
