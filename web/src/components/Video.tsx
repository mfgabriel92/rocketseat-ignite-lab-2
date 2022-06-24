import '@vime/core/themes/default.css'

import { gql, useQuery } from '@apollo/client'
import { DefaultUi, Player, Youtube } from '@vime/react'
import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from 'phosphor-react'

const GET_LESSON_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
      id
      title
      description
      videoId
      teacher {
        id
        name
        avatarURL
        bio
      }
    }
  }
`

interface VideoProps {
  slug: string
}

interface Lesson {
  lesson: {
    videoId: string;
    title: string;
    description: string;
    teacher: {
      name: string;
      avatarURL: string;
      bio: string;
    }
  }
}

function Video(props: VideoProps) {
  const { data } = useQuery<Lesson>(GET_LESSON_QUERY, {
    variables: {
      slug: props.slug
    }
  })
  
  if (!data) {
    return (
      <div className="flex-1">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[80rem] max-h-[70vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="py-8 max-w-[80rem] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img 
                src={data.lesson.teacher.avatarURL} 
                className="rounded-full w-16 h-16 border-2 border-green-500" 
                alt="" 
              />

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a href="#" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppsercase gap-2 justify-center hover:bg-green-700 transition-all">
              <DiscordLogo size={24} />
              Discord Community
            </a>
            <a href="#" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppsercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-all">
              <Lightning size={24} />
              Access the Challenge
            </a>
          </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed flex-1">
              <strong className="text-2xl">Complementary Material</strong>
              <p className="text-sm text-gray-200 mt-2">
                Lorem ipsum dolor sit amet
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed flex-1">
              <strong className="text-2xl">Exclusive Wallpapers</strong>
              <p className="text-sm text-gray-200 mt-2">
                Lorem ipsum dolor sit amet
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Video
