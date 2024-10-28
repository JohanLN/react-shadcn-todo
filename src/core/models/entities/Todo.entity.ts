import TodoDto from '../dto/Todo.dto'

export default class Todo {
    constructor(
        public id: string,
        public title: string,
        public isCompleted: boolean,
        public description?: string | null,
        public dueDate?: Date | null
    ) {}

    static fromDto(dto: TodoDto): Todo {
        return new Todo(
            dto.id,
            dto.title,
            dto.isCompleted ? dto.isCompleted : false,
            dto.description,
            dto.dueDate
        )
    }
}
