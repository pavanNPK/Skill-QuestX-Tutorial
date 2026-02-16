import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface VideoClass {
  id: number;
  title: string;
  description: string;
  duration: string;
  uploadDate: Date;
  thumbnailUrl?: string;
}

@Component({
  selector: 'sqx-recorded-classes',
  imports: [CommonModule, FormsModule],
  templateUrl: './recorded-classes.html',
  styleUrl: './recorded-classes.scss'
})
export class RecordedClasses {
  showUploadModal = signal(false);

  uploadForm = {
    title: '',
    description: '',
    videoFile: null as File | null
  };

  recordedClasses: VideoClass[] = [
    {
      id: 1,
      title: 'Introduction to Python Programming',
      description: 'Learn the basics of Python programming language',
      duration: '45:30',
      uploadDate: new Date('2023-01-15')
    },
    {
      id: 2,
      title: 'Data Structures in Python',
      description: 'Understanding lists, dictionaries, and more',
      duration: '52:15',
      uploadDate: new Date('2023-01-22')
    },
    {
      id: 3,
      title: 'Object-Oriented Programming',
      description: 'Learn OOP concepts with practical examples',
      duration: '48:45',
      uploadDate: new Date('2023-01-29')
    }
  ];

  openUploadModal() {
    this.showUploadModal.set(true);
  }

  closeUploadModal() {
    this.showUploadModal.set(false);
    this.resetForm();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.uploadForm.videoFile = target.files[0];
    }
  }

  submitUpload() {
    console.log('Uploading:', this.uploadForm);
    // Handle upload logic here
    this.closeUploadModal();
  }

  resetForm() {
    this.uploadForm = {
      title: '',
      description: '',
      videoFile: null
    };
  }
}
