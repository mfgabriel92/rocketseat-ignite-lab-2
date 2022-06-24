import cn from 'classnames'
import { format, isPast } from 'date-fns'
import { CheckCircle, Lock } from 'phosphor-react'
import { Link, useParams } from 'react-router-dom'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()
  const isLessonAvailable = isPast(props.availableAt)
  // eslint-disable-next-line quotes
  const formattedAvailableAt = format(props.availableAt, "EEEE' • ' MMMM eo' • 'hh:mm a")
  const isLessonActive = slug === props.slug

  return (
    <Link to={`/watch/${props.slug}`} className="group">
      <span className="text-gray-300">{formattedAvailableAt}</span>

      <div className={cn('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors', {
        'bg-green-500': isLessonActive
      })}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={cn('flex text-sm text-blue-500 font-medium gap-2', {
              'text-gray-100': isLessonActive
            })}>
              <CheckCircle size={20} />
              Released
            </span>
          ) : (
            <span className="flex text-sm text-orange-500 font-medium gap-2">
              <Lock size={20} />
              Soon
            </span>
          )}
          {props.type === 'live' ? (
            <span className={cn('text-xs text-green-500 rounded px-2 py-[0.125rem] border border-green-500 font-bold', { 
              'text-gray-100 border-gray-100': isLessonActive })
            }>
              LIVE CLASS
            </span>
          ) : (
            <span className={cn('text-xs text-orange-500 rounded px-2 py-[0.125rem] border border-orange-500 font-bold', { 
              'text-gray-100 border-gray-100': isLessonActive })
            }>
              PRACTICAL CLASS
            </span>
          )}
        </header>
        <strong className="text-gray-100 mt-5 block">{props.title}</strong>
      </div>
    </Link>
  )
}

export default Lesson
