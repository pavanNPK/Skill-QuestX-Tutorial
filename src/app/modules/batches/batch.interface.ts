export interface Student {
    id: number;
    name: string;
    avatar: string;
    email?: string;
}

export interface Batch {
    id: number;
    name: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    studentIds: number[];
}

export interface BatchWithStudents extends Batch {
    students: Student[];
    studentCount: number;
}
