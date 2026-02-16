import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string }[];
  selectedOption?: string;
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
      text: 'What is the correct file extension for Python files?',
      options: [
        { value: 'a', label: '.pt' },
        { value: 'b', label: '.pyt' },
        { value: 'c', label: '.py' },
        { value: 'd', label: '.python' }
      ]
    },
    {
      id: 5,
      text: 'How do you create a variable with the numeric value 5?',
      options: [
        { value: 'a', label: 'x = 5' },
        { value: 'b', label: 'x = int(5)' },
        { value: 'c', label: 'Both the other answers are correct' },
        { value: 'd', label: 'None of the other answers are correct' }
      ]
    },
    {
      id: 6,
      text: 'What is the correct syntax to output the type of a variable or object in Python?',
      options: [
        { value: 'a', label: 'print(typeof(x))' },
        { value: 'b', label: 'print(type(x))' },
        { value: 'c', label: 'print(typeOf(x))' },
        { value: 'd', label: 'print(typeof x)' }
      ]
    },
    {
      id: 7,
      text: 'What is the correct way to create a function in Python?',
      options: [
        { value: 'a', label: 'function my_function():' },
        { value: 'b', label: 'create my_function():' },
        { value: 'c', label: 'def my_function():' },
        { value: 'd', label: 'func my_function():' }
      ]
    },
    {
      id: 8,
      text: 'In Python, identifying indentation (whitespace at the beginning of a line) is:',
      options: [
        { value: 'a', label: 'Optional' },
        { value: 'b', label: 'For readability only' },
        { value: 'c', label: 'Indication of a new block of code' },
        { value: 'd', label: 'Not significant' }
      ]
    },
    {
      id: 9,
      text: 'Which operator is used to multiply numbers?',
      options: [
        { value: 'a', label: '%' },
        { value: 'b', label: '/' },
        { value: 'c', label: '#' },
        { value: 'd', label: '*' }
      ]
    },
    {
      id: 10,
      text: 'Which operator can be used to compare two values?',
      options: [
        { value: 'a', label: '><' },
        { value: 'b', label: '&|' },
        { value: 'c', label: '==' },
        { value: 'd', label: '=' }
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
      selectedOption: q.selectedOption
    }));
    console.log('Answers:', answers);
    // Handle submission logic
  }
}
