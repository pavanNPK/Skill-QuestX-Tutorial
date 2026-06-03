// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import {
    ContentBlock,
    ContentLesson,
    ContentModule,
    CourseContent,
    CourseContentService,
    NestedBulletItem
} from '../../../../core/services/course-content.service';

@Component({
    selector: 'sqx-chapter-detail',
    standalone: true,
    imports: [AccordionModule],
    templateUrl: './chapter-detail.html',
    styleUrl: './chapter-detail.scss'
})
export class ChapterDetail implements OnInit {
    chapterTitle = 'Recorded Classes';
    courseTitle = '';
    courseDescription = '';
    content: CourseContent | null = null;
    modules: ContentModule[] = [];
    selectedLesson: ContentLesson | null = null;
    loading = true;
    error = '';

    constructor(private route: ActivatedRoute, private contentService: CourseContentService) { }

    ngOnInit() {
        const chapterId = this.route.snapshot.paramMap.get('id');
        this.contentService.getAvailableCourses().subscribe({
            next: (courses) => {
                const courseId = courses[0]?.id;
                if (!courseId) {
                    this.loading = false;
                    this.error = 'No course content is available.';
                    return;
                }
                this.contentService.getContent(courseId).subscribe({
                    next: (content) => {
                        this.content = content;
                        this.courseTitle = content.title;
                        this.courseDescription = content.description;
                        const selectedModule = content.modules.find((module) => module.id === chapterId);
                        this.modules = selectedModule ? [selectedModule] : content.modules;
                        this.chapterTitle = selectedModule ? selectedModule.title : 'Recorded Classes';
                        this.loading = false;
                    },
                    error: () => {
                        this.loading = false;
                        this.error = 'Content is not published or you are not enrolled in this course.';
                    },
                });
            },
            error: () => {
                this.loading = false;
                this.error = 'Could not load course content.';
            },
        });
    }

    openLesson(lesson: ContentLesson) {
        this.selectedLesson = lesson;
        const target = lesson.blocks.find((block) => ['video', 'document', 'image', 'link'].includes(block.type) && block.url);
        if (target?.url) window.open(this.contentService.absoluteAssetUrl(target.url), '_blank', 'noopener');
    }

    primaryBlock(lesson: ContentLesson): ContentBlock | null {
        return lesson.blocks.find((block) => ['video', 'document', 'image', 'link'].includes(block.type)) ?? null;
    }

    blockText(block: ContentBlock): string {
        return block.title || block.text || block.type;
    }

    bulletText(items?: NestedBulletItem[]): string {
        return (items ?? []).map((item) => item.text).filter(Boolean).join(', ');
    }

    blockUrl(block: ContentBlock): string {
        return this.contentService.absoluteAssetUrl(block.url);
    }
}
