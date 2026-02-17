import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Student {
  id: number;
  name: string;
  avatar: string;
}

interface Batch {
  id: number;
  name: string;
  students: Student[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  batchId: number;
  batchName: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date;
  duration: string;
  assignedCount: number;
  submittedCount: number;
}

@Component({
  selector: 'sqx-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    DrawerModule,
    AvatarModule,
    AvatarGroupModule,
    TooltipModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  // State
  currentView = signal<'list' | 'board'>('board');
  isCreateDrawerOpen = signal(false);
  isEditing = signal(false);
  currentTaskId = signal<number | null>(null);

  // Data
  batches: Batch[] = [
    {
      id: 101,
      name: 'Python Masterclass - Batch A',
      students: [
        { id: 1, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Evan Wright', avatar: 'https://i.pravatar.cc/150?u=5' }
      ]
    },
    {
      id: 102,
      name: 'Web Development - Batch B',
      students: [
        { id: 6, name: 'Fiona Gallagher', avatar: 'https://i.pravatar.cc/150?u=6' },
        { id: 7, name: 'George Martin', avatar: 'https://i.pravatar.cc/150?u=7' },
        { id: 8, name: 'Hannah Abbott', avatar: 'https://i.pravatar.cc/150?u=8' }
      ]
    }
  ];

  tasks: Task[] = [
    {
      id: 1,
      title: 'Python Basics: Variables & Types',
      description: 'Complete the exercises on variable declaration and data types.',
      batchId: 101,
      batchName: 'Python Masterclass - Batch A',
      status: 'Pending',
      priority: 'High',
      dueDate: new Date('2024-03-25T23:59:00'),
      duration: '2 hours',
      assignedCount: 5,
      submittedCount: 2
    },
    {
      id: 2,
      title: 'Control Flow: If/Else',
      description: 'Implement a calculator using if/else statements.',
      batchId: 101,
      batchName: 'Python Masterclass - Batch A',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: new Date('2024-03-28T23:59:00'),
      duration: '1 day',
      assignedCount: 5,
      submittedCount: 1
    },
    {
      id: 3,
      title: 'HTML5 Structure',
      description: 'Create a semantic HTML page layout.',
      batchId: 102,
      batchName: 'Web Development - Batch B',
      status: 'Completed',
      priority: 'Low',
      dueDate: new Date('2024-03-20T23:59:00'),
      duration: '3 hours',
      assignedCount: 3,
      submittedCount: 3
    }
  ];

  // Filters
  filterBatch: Batch | null = null;
  filterStatus: 'Pending' | 'In Progress' | 'Completed' | null = null;
  filterDateRange: Date[] | null = null;
  searchText: string = '';

  filterStatusOptions = ['Pending', 'In Progress', 'Completed'];

  // Form Data
  newTask = {
    title: '',
    description: '',
    batch: null as Batch | null,
    dueDate: null as Date | null,
    duration: '',
    priority: 'Medium'
  };

  priorityOptions = ['Low', 'Medium', 'High'];

  // Computed / Helper Methods
  get selectedBatchStudents(): Student[] {
    return this.newTask.batch ? this.newTask.batch.students : [];
  }

  get filteredTasks(): Task[] {
    return this.tasks.filter(task => {
      const matchesSearch = !this.searchText || task.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesBatch = !this.filterBatch || task.batchId === this.filterBatch.id;
      const matchesStatus = !this.filterStatus || task.status === this.filterStatus;

      let matchesDate = true;
      if (this.filterDateRange && this.filterDateRange.length) {
        const start = this.filterDateRange[0];
        const end = this.filterDateRange[1];
        if (start && !end) {
          // Exact match or matches start if only one selected? Usually ranges imply >= start.
          // Im implementing >= start.
          matchesDate = task.dueDate >= start;
        } else if (start && end) {
          matchesDate = task.dueDate >= start && task.dueDate <= end;
        }
      }

      return matchesSearch && matchesBatch && matchesStatus && matchesDate;
    });
  }

  // Detailed State
  selectedTask = signal<Task | null>(null);
  isDetailsDrawerOpen = signal(false);

  // Mock Submissions Data Helper
  getTaskSubmissions(task: Task): any[] {
    if (!task) return [];

    // Find the batch for this task
    const batch = this.batches.find(b => b.id === task.batchId);
    if (!batch) return [];

    // Deterministic pseudo-random submissions based on task ID
    return batch.students.map((student, index) => {
      // Simulate some students having submitted
      // Mix logic so it's consistent for the same task/student
      const isSubmitted = (task.id + student.id) % 2 === 0;

      return {
        student: student,
        status: isSubmitted ? 'Submitted' : 'Pending',
        submittedAt: isSubmitted ? new Date(task.dueDate.getTime() - (Math.random() * 100000000)) : null
      };
    });
  }

  openTaskDetails(task: any) {
    if (!task) return;
    this.selectedTask.set(task);
    this.isDetailsDrawerOpen.set(true);
  }

  closeTaskDetails() {
    this.isDetailsDrawerOpen.set(false);
    this.selectedTask.set(null);
  }

  editTask() {
    const task = this.selectedTask();
    if (!task) return;

    // Close details drawer
    this.closeTaskDetails();

    // Populate form
    const batch = this.batches.find(b => b.id === task.batchId) || null;
    this.newTask = {
      title: task.title,
      description: task.description,
      batch: batch,
      dueDate: task.dueDate,
      duration: task.duration,
      priority: task.priority
    };

    // Set editing state
    this.isEditing.set(true);
    this.currentTaskId.set(task.id);
    this.openCreateDrawer();
  }

  confirmDelete(event: Event) {
    if (!this.selectedTask()) return;

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this task?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        // Mock Delete Logic
        this.tasks = this.tasks.filter(t => t.id !== this.selectedTask()!.id);
        this.isDetailsDrawerOpen.set(false);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Task deleted successfully' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }


  toggleView(view: 'list' | 'board') {
    this.currentView.set(view);
  }

  openCreateDrawer() {
    this.isCreateDrawerOpen.set(true);
    if (!this.isEditing()) {
      this.resetForm();
    }
  }

  closeCreateDrawer() {
    this.isCreateDrawerOpen.set(false);
    this.resetForm();
    this.isEditing.set(false);
    this.currentTaskId.set(null);
  }

  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      batch: null,
      dueDate: null,
      duration: '',
      priority: 'Medium'
    };
  }

  saveTask() {
    if (this.newTask.title && this.newTask.batch && this.newTask.dueDate) {
      if (this.isEditing() && this.currentTaskId()) {
        // Update existing task
        this.tasks = this.tasks.map(t => {
          if (t.id === this.currentTaskId()) {
            return {
              ...t,
              title: this.newTask.title,
              description: this.newTask.description,
              batchId: this.newTask.batch!.id,
              batchName: this.newTask.batch!.name,
              priority: this.newTask.priority as any,
              dueDate: this.newTask.dueDate!,
              duration: this.newTask.duration
            };
          }
          return t;
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated' });
      } else {
        // Create new task
        const task: Task = {
          id: this.tasks.length + 1,
          title: this.newTask.title,
          description: this.newTask.description,
          batchId: this.newTask.batch.id,
          batchName: this.newTask.batch.name,
          status: 'Pending',
          priority: this.newTask.priority as any,
          dueDate: this.newTask.dueDate,
          duration: this.newTask.duration,
          assignedCount: this.newTask.batch.students.length,
          submittedCount: 0
        };

        this.tasks = [...this.tasks, task];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task created' });
      }
      this.closeCreateDrawer();
    }
  }

  getTasksByStatus(status: string): Task[] {
    return this.filteredTasks.filter(t => t.status === status);
  }
}
