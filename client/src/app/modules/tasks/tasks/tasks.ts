import { Component, signal, inject, OnInit } from '@angular/core';
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
import { AuthService } from '../../core/services/auth.service';

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
  /** For student view: task PDF filename. */
  attachmentFilename?: string;
  /** For student view: task created date. */
  createdAt?: Date;
}

/** Week group for student task list. */
interface WeekGroup {
  weekLabel: string;
  weekNumber: number;
  tasks: Task[];
}

/** Single feedback entry for student view. */
interface TaskFeedback {
  authorName: string;
  authorAvatar?: string;
  time: string;
  text: string;
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
export class Tasks implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  readonly auth = inject(AuthService);

  /** Student sees week-wise list + month/week filters; instructor sees board/list + create. */
  get isStudentView(): boolean {
    return this.auth.currentUser()?.role === 'student';
  }

  ngOnInit(): void {
    this.buildMonthOptions();
    if (this.isStudentView && this.monthOptionsListCache.length > 0 && !this.selectedMonthValue) {
      const now = new Date();
      const currentMonthOption = this.monthOptionsListCache.find(
        (m) => m.value.getMonth() === now.getMonth() && m.value.getFullYear() === now.getFullYear()
      );
      this.selectedMonthValue = currentMonthOption ?? this.monthOptionsListCache[0];
      const currentWeekNum = this.getWeekOfMonth(now);
      this.selectedWeekValue =
        this.weekOptionsForSelectedMonth.find((w) => w.value === currentWeekNum) ?? this.weekOptionsForSelectedMonth[0];
      this.selectFirstTaskForFilter();
    }
  }

  /** All 12 months for current year and previous year (most recent first). Future: add year dropdown for real-time year + month selection. */
  private buildMonthOptions(): void {
    const now = new Date();
    const currentYear = now.getFullYear();
    const list: { label: string; value: Date }[] = [];
    for (const year of [currentYear, currentYear - 1]) {
      for (let month = 11; month >= 0; month--) {
        const d = new Date(year, month, 1);
        list.push({
          label: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          value: new Date(d),
        });
      }
    }
    this.monthOptionsListCache = list;
  }

  // State
  currentView = signal<'list' | 'board'>('board');
  isCreateDrawerOpen = signal(false);
  isEditing = signal(false);
  currentTaskId = signal<number | null>(null);

  // Student view: month & week filters
  selectedMonthValue: { label: string; value: Date } | null = null;
  selectedWeekValue: { label: string; value: number | 'all' } | null = null;
  monthOptions: { label: string; value: Date }[] = [];
  weekOptions: { label: string; value: number | 'all' }[] = [
    { label: 'All Weeks', value: 'all' },
    { label: '1st Week', value: 1 },
    { label: '2nd Week', value: 2 },
    { label: '3rd Week', value: 3 },
    { label: '4th Week', value: 4 },
    { label: '5th Week', value: 5 },
  ];

  /** Cached so select selection stays stable (built from tasks in ngOnInit). */
  monthOptionsListCache: { label: string; value: Date }[] = [];

  /** Student view: timer shows only after Download Task or Start Task. Task id when timer is active. */
  timerStartedForTaskId = signal<number | null>(null);
  /** Display value for timer (e.g. 01:00:58). */
  timerDisplay = signal<string>('01:00:58');

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
      title: 'Introduction to Python, Course. introduction and Learnings.',
      description: 'Download the Daily Task as PDF. Right after downloading, the timer starts with allotted time by mentor. Finish the task in allotted time, Submit it as PDF.',
      batchId: 101,
      batchName: 'Python Masterclass - Batch A',
      status: 'In Progress',
      priority: 'High',
      dueDate: new Date('2026-02-01T23:59:00'),
      duration: '2 hours',
      assignedCount: 5,
      submittedCount: 2,
      attachmentFilename: 'Assignment01.pdf',
      createdAt: new Date('2026-02-03'),
    },
    {
      id: 2,
      title: 'Control Flow: If/Else',
      description: 'Implement a calculator using if/else statements.',
      batchId: 101,
      batchName: 'Python Masterclass - Batch A',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: new Date('2026-02-02T23:59:00'),
      duration: '1 day',
      assignedCount: 5,
      submittedCount: 1,
      attachmentFilename: 'Assignment02.pdf',
      createdAt: new Date('2026-02-01'),
    },
    {
      id: 3,
      title: 'HTML5 Structure',
      description: 'Create a semantic HTML page layout.',
      batchId: 102,
      batchName: 'Web Development - Batch B',
      status: 'Completed',
      priority: 'Low',
      dueDate: new Date('2026-02-03T23:59:00'),
      duration: '3 hours',
      assignedCount: 3,
      submittedCount: 3,
      attachmentFilename: 'Assignment03.pdf',
      createdAt: new Date('2026-02-02'),
    },
    {
      id: 4,
      title: 'Python Basics: Variables & Types',
      description: 'Complete the exercises on variable declaration and data types.',
      batchId: 101,
      batchName: 'Python Masterclass - Batch A',
      status: 'Pending',
      priority: 'High',
      dueDate: new Date('2026-02-08T23:59:00'),
      duration: '2 hours',
      assignedCount: 5,
      submittedCount: 0,
      attachmentFilename: 'Assignment04.pdf',
      createdAt: new Date('2026-02-05'),
    },
    {
      id: 5,
      title: 'Functions and Modules',
      description: 'Write reusable functions and organize code into modules.',
      batchId: 101,
      batchName: 'Python Masterclass - Batch A',
      status: 'Pending',
      priority: 'Medium',
      dueDate: new Date('2026-02-15T23:59:00'),
      duration: '1 day',
      assignedCount: 5,
      submittedCount: 0,
      attachmentFilename: 'Assignment05.pdf',
      createdAt: new Date('2026-02-10'),
    },
  ];

  // Filters
  filterBatch: Batch | null = null;
  filterStatus: 'Pending' | 'In Progress' | 'Completed' | null = null;
  filterDateRange: Date[] | null = null;
  searchText: string = '';

  filterStatusOptions = ['Pending', 'In Progress', 'Completed'];

  get monthOptionsList(): { label: string; value: Date }[] {
    return this.monthOptionsListCache;
  }

  get effectiveMonth(): { label: string; value: Date } | null {
    if (this.selectedMonthValue) return this.selectedMonthValue;
    return this.monthOptionsListCache.length ? this.monthOptionsListCache[0] : null;
  }

  /** Effective week for filter; validates against selected month (real-time weeks). */
  get effectiveWeek(): { label: string; value: number | 'all' } {
    const options = this.weekOptionsForSelectedMonth;
    if (!this.selectedWeekValue) return options[0];
    const found = options.find((o) => o.value === this.selectedWeekValue!.value);
    return found ?? options[0];
  }

  /** Week number in month (1–5). Day 1–7 = week 1, 8–14 = week 2, etc. */
  getWeekOfMonth(d: Date): number {
    const date = new Date(d);
    const dayOfMonth = date.getDate();
    return Math.ceil(dayOfMonth / 7) || 1;
  }

  /** Number of weeks in the given month (real-time: 4 or 5 based on last day). */
  getWeeksInMonth(year: number, monthIndex: number): number {
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    return this.getWeekOfMonth(new Date(year, monthIndex, lastDay));
  }

  /** Week options for the selected month (real-time: only weeks that exist in that month). */
  get weekOptionsForSelectedMonth(): { label: string; value: number | 'all' }[] {
    const month = this.effectiveMonth;
    const base: { label: string; value: number | 'all' }[] = [{ label: 'All Weeks', value: 'all' }];
    if (!month) return [...base, ...this.weekOptions.slice(1)];
    const year = month.value.getFullYear();
    const monthIndex = month.value.getMonth();
    const numWeeks = this.getWeeksInMonth(year, monthIndex);
    const labels: Record<number, string> = { 1: '1st Week', 2: '2nd Week', 3: '3rd Week', 4: '4th Week', 5: '5th Week' };
    for (let w = 1; w <= numWeeks; w++) {
      base.push({ label: labels[w] ?? `${w}th Week`, value: w });
    }
    return base;
  }

  /** Tasks filtered by selected month/week for student list. */
  get tasksForStudent(): Task[] {
    const month = this.effectiveMonth;
    const week = this.effectiveWeek;
    if (!month) return [];
    return this.tasks
      .filter((t) => {
        const due = new Date(t.dueDate);
        if (due.getMonth() !== month.value.getMonth() || due.getFullYear() !== month.value.getFullYear()) {
          return false;
        }
        if (week.value === 'all') return true;
        return this.getWeekOfMonth(due) === week.value;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  /** Grouped by week for left list (student view). */
  get tasksGroupedByWeek(): WeekGroup[] {
    const weekMap = new Map<number, Task[]>();
    this.tasksForStudent.forEach((t) => {
      const w = this.getWeekOfMonth(new Date(t.dueDate));
      if (!weekMap.has(w)) weekMap.set(w, []);
      weekMap.get(w)!.push(t);
    });
    const labels: Record<number, string> = { 1: '1st Week', 2: '2nd Week', 3: '3rd Week', 4: '4th Week', 5: '5th Week' };
    return Array.from(weekMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([weekNumber, tasks]) => ({ weekLabel: labels[weekNumber] ?? `${weekNumber}th Week`, weekNumber, tasks }));
  }

  /** Mock feedbacks for selected task (student view). */
  getFeedbacksForTask(task: Task | null): TaskFeedback[] {
    if (!task) return [];
    return [
      { authorName: 'Charil Polamraju', time: '9:45 PM', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Good progress on the first section.' },
    ];
  }

  formatTaskDate(d: Date): string {
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/');
  }

  /** When month changes, normalize week to a valid option for that month, then select first task. */
  onMonthChange(): void {
    const options = this.weekOptionsForSelectedMonth;
    const valid = options.some((o) => o.value === this.selectedWeekValue?.value);
    if (!valid) this.selectedWeekValue = options[0];
    this.selectFirstTaskForFilter();
  }

  /** Student view: select first task for current filter (month/week). Call on filter change and init. */
  selectFirstTaskForFilter(): void {
    const list = this.tasksForStudent;
    this.selectedTask.set(list.length > 0 ? list[0] : null);
  }

  /** Student view: show timer after Download Task or Start Task. */
  startTimerForTask(taskId: number): void {
    this.timerStartedForTaskId.set(taskId);
    this.timerDisplay.set('01:00:58');
  }

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

    // Set editing state FIRST
    this.isEditing.set(true);
    this.currentTaskId.set(task.id);

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

    // Open drawer (won't reset because isEditing is true)
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
    // Only reset if we're starting fresh (not editing)
    if (!this.isEditing()) {
      this.resetForm();
    }
    this.isCreateDrawerOpen.set(true);
  }

  closeCreateDrawer() {
    this.isCreateDrawerOpen.set(false);
    // Reset editing state FIRST, then reset form
    this.isEditing.set(false);
    this.currentTaskId.set(null);
    this.resetForm();
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
