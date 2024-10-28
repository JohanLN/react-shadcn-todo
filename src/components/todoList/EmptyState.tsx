import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'

interface IEmptyStateProps {
  filterCondition: 'all' | 'done' | 'undone'
}

const EmptyState = (props: IEmptyStateProps) => {
  const {filterCondition} = props;
  
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h4>This list is empty</h4>
      {filterCondition === 'all' ? (
          <DialogTrigger asChild>
              <Button variant="outline">
                  <Plus />
                  Start by creating a new task
              </Button>
          </DialogTrigger>
      ) : null}
  </div>
  )
}

export default EmptyState
