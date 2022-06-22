import { gql, useQuery } from "@apollo/client"

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
      description,
      teacher {
        id
        name
      }
    }
  }
`

interface Lesson {
  id: string;
  title: string;
  description: string;
  teacher: {
    id: string;
    name: string;
  }
}

function App() {
  const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY)
  
  return (
    <ul>
      {
        data?.lessons.map(lesson => <li>{lesson.title}</li>)
      }
    </ul>
  )
}

export default App
