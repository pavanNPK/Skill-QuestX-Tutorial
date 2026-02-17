import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  id: number;
  text: string;
  type?: 'mcq' | 'text'; // Default to mcq if undefined
  options?: { value: string; label: string }[]; // Optional for text questions
  selectedOption?: string;
  textAnswer?: string; // For text questions
  pdfUrl?: string; // Optional PDF reference
}

@Component({
  selector: 'sqx-online-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './online-assessment.html',
  styleUrl: './online-assessment.scss',
})
export class OnlineAssessment {
  currentQuestionIndex = signal(0);

  questions: Question[] = [
    {
      id: 1,
      type: 'mcq',
      text: 'What is the correct way to declare a variable in Python?',
      options: [
        { value: 'a', label: 'var x = 5' },
        { value: 'b', label: 'x = 5' },
        { value: 'c', label: 'int x = 5' },
        { value: 'd', label: 'declare x = 5' }
      ]
    },
    {
      id: 2,
      type: 'mcq',
      text: 'Which collection is ordered, changeable, and allows duplicate members?',
      options: [
        { value: 'a', label: 'Tuple' },
        { value: 'b', label: 'Set' },
        { value: 'c', label: 'List' },
        { value: 'd', label: 'Dictionary' }
      ]
    },
    {
      id: 3,
      type: 'mcq',
      text: 'How do you insert COMMENTS in Python code?',
      options: [
        { value: 'a', label: '# This is a comment' },
        { value: 'b', label: '// This is a comment' },
        { value: 'c', label: '/* This is a comment */' },
        { value: 'd', label: '<!-- This is a comment -->' }
      ]
    },
    {
      id: 4,
      type: 'text',
      text: 'Explain the difference between a list and a tuple in Python. Refer to the attached document if needed.',
      pdfUrl: 'assets/docs/python-data-structures.pdf', // Mock URL
      textAnswer: ''
    },
    {
      id: 5,
      type: 'mcq',
      text: 'What is the correct file extension for Python files?',
      options: [
        { value: 'a', label: '.pt' },
        { value: 'b', label: '.pyt' },
        { value: 'c', label: '.py' },
        { value: 'd', label: '.python' }
      ]
    }
  ];

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex()];
  }

  get isFirstQuestion() {
    return this.currentQuestionIndex() === 0;
  }

  get isLastQuestion() {
    return this.currentQuestionIndex() === this.questions.length - 1;
  }

  nextQuestion() {
    if (!this.isLastQuestion) {
      this.currentQuestionIndex.update(i => i + 1);
    }
  }

  prevQuestion() {
    if (!this.isFirstQuestion) {
      this.currentQuestionIndex.update(i => i - 1);
    }
  }

  submitAssessment() {
    console.log('Assessment Submitted');
    const answers = this.questions.map(q => ({
      questionId: q.id,
      selectedOption: q.selectedOption,
      textAnswer: q.textAnswer
    }));
    console.log('Answers:', answers);
    // Handle submission logic
  }
}
