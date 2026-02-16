import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';

interface Video {
    id: number;
    day: number;
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    locked: boolean;
    videoCount?: number;
}

interface Module {
    id: number;
    title: string;
    videos: Video[];
}

@Component({
    selector: 'sqx-chapter-detail',
    standalone: true,
    imports: [CommonModule, AccordionModule],
    templateUrl: './chapter-detail.html',
    styleUrl: './chapter-detail.scss'
})
export class ChapterDetail {
    chapterTitle = 'Recorded Classes - Chapter 1';
    courseTitle = 'Python for Data Science and Machine Learning Bootcamp';
    courseDescription = 'Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more! Course';

    modules: Module[] = [
        {
            id: 1,
            title: 'Introduction: Python',
            videos: [
                {
                    id: 1,
                    day: 1,
                    title: 'Introduction to Python, Course introduction and Learnings.',
                    description: '',
                    duration: '16 min',
                    thumbnail: '',
                    locked: false,
                    videoCount: 3
                },
                {
                    id: 2,
                    day: 1,
                    title: 'Introduction to Python, Course introduction and Learnings.',
                    description: '',
                    duration: '16 min',
                    thumbnail: '',
                    locked: false,
                    videoCount: 3
                },
                {
                    id: 3,
                    day: 3,
                    title: 'Introduction to Python, Course introduction and Learnings.',
                    description: '',
                    duration: '',
                    thumbnail: '',
                    locked: true,
                    videoCount: 3
                },
                {
                    id: 4,
                    day: 4,
                    title: 'Introduction to Python, Course introduction and Learnings.',
                    description: '',
                    duration: '',
                    thumbnail: '',
                    locked: true,
                    videoCount: 3
                }
            ]
        }
    ];

    constructor(private route: ActivatedRoute) {
        // Get chapter ID from route params
        const chapterId = this.route.snapshot.paramMap.get('id');
        console.log('Chapter ID:', chapterId);
    }

    playVideo(video: Video) {
        if (!video.locked) {
            console.log('Playing video:', video);
            // Navigate to video player
        }
    }
}
