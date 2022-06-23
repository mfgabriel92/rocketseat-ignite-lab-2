import { format, isPast } from 'date-fns'
import { CheckCircle, Lock } from 'phosphor-react'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

function Lesson(props: LessonProps) {
  const isLessonAvailable = isPast(props.availableAt)
  // eslint-disable-next-line quotes
  const formattedAvailableAt = format(props.availableAt, "EEEE' • ' MMMM eo' • 'hh:mm a")

  return (
    <a href="#">
      <span className="text-gray-300">{formattedAvailableAt}</span>
      <div className="rounded border border-gray-500 p-4 mt-2">
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className="flex text-sm text-blue-500 font-medium">
              <CheckCircle size={20} className="mr-2" />
              Released
            </span>
          ) : (
            <span className="flex text-sm text-orange-500 font-medium">
              <Lock size={20} className="mr-2" />
              Soon
            </span>
          )}
          {props.type === 'live' ? (
            <span className="text-xs text-green-500 rounded px-2 py-[0.125rem] border border-green-500 font-bold">
              LIVE CLASS
            </span>
          ) : (
            <span className="text-xs text-orange-500 rounded px-2 py-[0.125rem] border border-orange-500 font-bold">
              PRACTICAL CLASS
            </span>
          )}
        </header>
        <strong className="text-gray-200 mt-5 block">{props.title}</strong>
      </div>
    </a>
  )
}

export default Lesson
