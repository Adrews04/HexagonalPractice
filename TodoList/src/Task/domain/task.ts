interface Task {
    id: number;
    userId: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export {Task};