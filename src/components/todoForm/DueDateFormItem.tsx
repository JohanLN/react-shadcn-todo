import { formatDate } from '@/core/date/dateFormatter'
import { cn } from '@/lib/utils'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Control } from 'react-hook-form'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { FormField, FormItem, FormLabel } from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface IDueDateFormItemProps {
  formControl: Control<{
    todoTitle: string;
    todoDescription?: string | undefined;
    dueDate?: Date | null | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}, any>
}

const DueDateFormItem = (props: IDueDateFormItemProps) => {
  const {formControl} = props;
  
  return (
    <FormField
      control={formControl}
      name="dueDate"
      render={({ field }) => (
          <FormItem className="flex flex-col">
              <FormLabel>Todo task due date</FormLabel>
              <Popover>
                  <PopoverTrigger asChild>
                      <Button
                          variant="outline"
                          className={cn(
                              'flex w-fit flex-row gap-3 px-4 text-start',
                              !field.value &&
                                  'text-muted-foreground'
                          )}
                      >
                          {field.value ? (
                              formatDate(field.value)
                          ) : (
                              <span>Pick a date</span>
                          )}
                          <CalendarIcon />
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent
                      className="w-auto rounded bg-white p-0"
                      align="start"
                  >
                      <Calendar
                          mode="single"
                          selected={field.value ?? new Date()}
                          onSelect={field.onChange}
                          disabled={(date) =>
                              date < new Date('1900-01-01')
                          }
                          {...field}
                      />
                  </PopoverContent>
              </Popover>
          </FormItem>
      )}
  />
  )
}

export default DueDateFormItem
