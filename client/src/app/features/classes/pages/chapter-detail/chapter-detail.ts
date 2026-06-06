// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { Component, OnInit, signal } from '@angular/core';

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
    readonly chapterTitle = signal('Recorded Classes');
    readonly courseTitle = signal('');
    readonly courseDescription = signal('');
    readonly content = signal<CourseContent | null>(null);
    readonly modules = signal<ContentModule[]>([]);
    readonly selectedLesson = signal<ContentLesson | null>(null);
    readonly loading = signal(true);
    readonly error = signal('');

    constructor(private route: ActivatedRoute, private contentService: CourseContentService) { }

    ngOnInit() {
        const chapterId = this.route.snapshot.paramMap.get('id');
        this.contentService.getAvailableCourses().subscribe({
            next: (courses) => {
                const courseId = courses[0]?.id;
                if (!courseId) {
                    this.loading.set(false);
                    this.error.set('No course content is available.');
                    return;
                }
                this.contentService.getContent(courseId).subscribe({
                    next: (content) => {
                        this.content.set(content);
                        this.courseTitle.set(content.title);
                        this.courseDescription.set(content.description);
                        const selectedModule = content.modules.find((module) => module.id === chapterId);
                        this.modules.set(selectedModule ? [selectedModule] : content.modules);
                        this.chapterTitle.set(selectedModule ? selectedModule.title : 'Recorded Classes');
                        this.loading.set(false);
                    },
                    error: () => {
                        this.loading.set(false);
                        this.error.set('Content is not published or you are not enrolled in this course.');
                    },
                });
            },
            error: () => {
                this.loading.set(false);
                this.error.set('Could not load course content.');
            },
        });
    }

    openLesson(lesson: ContentLesson) {
        this.selectedLesson.set(lesson);
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
