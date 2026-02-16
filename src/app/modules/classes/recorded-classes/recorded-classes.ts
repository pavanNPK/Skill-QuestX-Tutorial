import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Chapter {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  color: string;
}

@Component({
  selector: 'sqx-recorded-classes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recorded-classes.html',
  styleUrl: './recorded-classes.scss'
})
export class RecordedClasses {
  courseTitle = 'Python for Data Science and Machine Learning Bootcamp';
  courseDescription = 'Description about Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more! Course';

  chapters: Chapter[] = [
    {
      id: 1,
      number: 1,
      title: 'Chapter 1',
      subtitle: 'Python for Data Science and Machine Learning Bootcamp',
      color: '#C7D2FE' // light blue
    },
    {
      id: 2,
      number: 2,
      title: 'Chapter 2',
      subtitle: 'Python for Data Science and Machine Learning Bootcamp',
      color: '#A5F3FC' // cyan
    },
    {
      id: 3,
      number: 3,
      title: 'Chapter 3',
      subtitle: 'Python for Data Science and Machine Learning Bootcamp',
      color: '#DDD6FE' // purple
    },
    {
      id: 4,
      number: 4,
      title: 'Chapter 4',
      subtitle: 'Python for Data Science and Machine Learning Bootcamp',
      color: '#FDE68A' // yellow
    },
    {
      id: 5,
      number: 5,
      title: 'Chapter 5',
      subtitle: 'Python for Data Science and Machine Learning Bootcamp',
      color: '#BBF7D0' // green
    },
    {
      id: 6,
      number: 6,
      title: 'Python for Data Science and Machine Learning Bootcamp',
      subtitle: 'Python for Data Science and Machine Learning Bootcamp',
      color: '#E5E7EB' // gray
    }
  ];

  constructor(private router: Router) { }

  viewChapter(chapter: Chapter) {
    console.log('Viewing chapter:', chapter);
    this.router.navigate(['/classes/recorded', chapter.id]);
  }
}
