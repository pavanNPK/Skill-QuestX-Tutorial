import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'sqx-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        CheckboxModule,
        RippleModule,
        CarouselModule,
        IconFieldModule,
        InputIconModule,
        FloatLabelModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    carouselItems = [
        {
            title: 'REDEFINE',
            description: 'Boost your learning and career path',
            author: 'Sam Halftime',
            role: 'System Designer at coinquake',
            quote: 'Skill Questx elevated my career and personal growth. Tailored content and feedback were key. Highly recommend for serious progress.'
        },
        {
            title: 'UPSKILL',
            description: 'Gain modern, in-demand technical expertise',
            author: 'Jane Doe',
            role: 'Frontend Architect',
            quote: 'The depth of content here is unmatched. I was able to transition to a senior role within months.'
        },
        {
            title: 'SUCCEED',
            description: 'Land your dream role or promotion',
            author: 'John Smith',
            role: 'Backend Engineer',
            quote: 'Practical assignments and real-world scenarios made all the difference in my interviewing process.'
        }
    ];

    activeIndex = 0;

    ngOnInit() {
        setInterval(() => {
            this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
        }, 5000);
    }
}
