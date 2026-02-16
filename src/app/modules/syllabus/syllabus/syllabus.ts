import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';

interface Topic {
  number: number;
  title: string;
}

interface Module {
  title: string;
  topics: Topic[];
}

@Component({
  selector: 'sqx-syllabus',
  standalone: true,
  imports: [CommonModule, AccordionModule],
  templateUrl: './syllabus.html',
  styleUrl: './syllabus.scss',
})
export class Syllabus {
  courseTitle = 'Python for Data Science and Machine Learning Bootcamp';
  courseDescription = 'Master Python, Data Science, and Machine Learning with comprehensive hands-on training covering fundamentals to advanced topics.';

  modules: Module[] = [
    {
      title: 'Introduction: Python',
      topics: [
        { number: 1, title: 'Introduction to Python' },
        { number: 2, title: 'Introduction to Data Sciences and machine learnings' },
        { number: 3, title: 'Basics of Python' },
        { number: 4, title: 'Basics of Data science' },
        { number: 5, title: 'Master critical data science skills.' },
        { number: 6, title: 'Replicate real-world situations and data reports.' },
        { number: 7, title: 'Conduct feature engineering on real world case studies.' }
      ]
    },
    {
      title: 'Python in Data Sciences and Machine Learning',
      topics: [
        { number: 1, title: 'Python Programming Fundamentals' },
        { number: 2, title: 'NumPy for Numerical Computing' },
        { number: 3, title: 'Pandas for Data Analysis' },
        { number: 4, title: 'Matplotlib and Seaborn for Data Visualization' },
        { number: 5, title: 'Statistical Analysis with Python' },
        { number: 6, title: 'Machine Learning Algorithms' },
        { number: 7, title: 'Scikit-learn Library' }
      ]
    },
    {
      title: 'End Chapter: Learning bootcamp and Improvisations',
      topics: [
        { number: 1, title: 'Real-world Project Implementation' },
        { number: 2, title: 'Building Complete ML Pipelines' },
        { number: 3, title: 'Model Deployment Strategies' },
        { number: 4, title: 'Best Practices and Code Optimization' },
        { number: 5, title: 'Career Preparation and Interview Tips' },
        { number: 6, title: 'Advanced Topics and Future Learning Paths' }
      ]
    }
  ];
}
