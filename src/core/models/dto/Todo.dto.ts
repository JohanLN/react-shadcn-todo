export default interface TodoDto {
    id: string
    title: string
    isCompleted: boolean
    description?: string | null
    dueDate?: Date | null
}
