import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
  dueDate: Date;
}

@Component({
  selector: 'sqx-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1 - Programming with Python',
      description: 'Complete the Python programming exercises',
      status: 'Pending',
      dueDate: new Date('2023-02-21T12:00:00')
    },
    {
      id: 2,
      title: 'Task 2 - Flow Structures',
      description: 'Introduction with flow structures in python language',
      status: 'Completed',
      dueDate: new Date('2023-02-28T12:00:00') // Fixed invalid date 31/02 to 28/02
    },
    {
      id: 3,
      title: 'Task 3 - Basic Functions',
      description: 'Learn and implement basic functions in Python language',
      status: 'Pending',
      dueDate: new Date('2023-03-05T12:00:00')
    }
  ];
}
