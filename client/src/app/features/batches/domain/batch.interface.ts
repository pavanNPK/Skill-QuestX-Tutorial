// use of this file is:
// Feature domain file. It stores models, DTOs, enums, and contracts used by this feature.
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
