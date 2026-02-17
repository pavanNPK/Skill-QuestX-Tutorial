import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

interface Course {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    discount: number;
    unavailable?: boolean;
    accentColor?: string; // For the vertical bar
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
    imports: [CommonModule, ButtonModule, TooltipModule],
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
    courses: Course[] = [
        {
            id: 1,
            title: 'UI Design Course',
            description: 'Lorem ipsum dolor sit amet consectetur. Diam eget amet placerat eleifend.',
            thumbnail: 'assets/images/ui-design.jpg',
            price: 150.00,
            discount: 33, // approx to get $100
            accentColor: '#F59E0B' // Orange
        },
        {
            id: 2,
            title: 'Full-Stack Web Development',
            description: 'Lorem ipsum dolor sit amet consectetur. Diam eget amet placerat eleifend.',
            thumbnail: 'assets/images/web-dev.jpg',
            price: 150.00,
            discount: 13.33, // to get $130
            unavailable: true,
            accentColor: '#6B7280' // Gray
        },
        {
            id: 3,
            title: 'Machine Learning With Python',
            description: 'Lorem ipsum dolor sit amet consectetur. Diam eget amet placerat eleifend.',
            thumbnail: 'assets/images/ml.jpg',
            price: 150.00,
            discount: 0,
            accentColor: '#3B82F6' // Blue
        },
        {
            id: 4,
            title: 'Motion Graphics In After Effects',
            description: 'Lorem ipsum dolor sit amet consectetur. Diam eget amet placerat eleifend.',
            thumbnail: 'assets/images/motion.jpg',
            price: 150.00,
            discount: 0,
            accentColor: '#F97316' // Orange
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
