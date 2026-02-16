import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface CourseModule {
  id: number;
  title: string;
  description?: string;
}

@Component({
  selector: 'sqx-materials',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './materials.html',
  styleUrl: './materials.scss',
})
export class Materials {
  courseTitle = 'Python for Data Science and Machine Learning Bootcamp';

  modules: CourseModule[] = [
    {
      id: 1,
      title: 'Introduction: Python'
    },
    {
      id: 2,
      title: 'Python in Data Sciences and Machine Learning'
    },
    {
      id: 3,
      title: 'End Chapter: Learning bootcamp and Improvisations'
    }
  ];

  viewModule(module: CourseModule) {
    console.log('Viewing module:', module);
    // Navigate to module content or open modal/drawer
  }
}
