import { gql, useMutation } from '@apollo/client'
import Logo from '@components/Logo'
import ReactLogo from '@components/ReactLogo'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber ($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`

function Home() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [createSubscriber, { data, loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    
    await createSubscriber({ 
      variables: { name, email }
    })

    navigate('/watch')
  }
  
  return (
    <div className="min-h-screen bg-home bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[80rem] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[39rem]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] font-bold leading-tight">
            Build a <span className="text-blue-500">complete application</span>, from scratch, with <span className="text-blue-500">React</span>
          </h1>
          <ReactLogo className="absolute top-0 right-0 left-0 m-auto z-[-1]" />
          <p className="mt-4 text-gray-200 leading-relaxed">
            In only one week, you are going to dominate, hands-on, one the of the most used technologies with high demand to access the best opportunities in the market. 
          </p>
        </div>

        <div className="min-w-[24.43rem] p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Register for free</strong>
          <form className="flex flex-col gap-2 w-full" onSubmit={(e) => handleSubmit(e)}>
            <input 
              className="bg-gray-900 rounded px-5 h-14" 
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              className="bg-gray-900 rounded px-5 h-14" 
              placeholder="Your e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit"
              className="mt-4 bg-green-500 uppsercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors uppercase disabled:bg-green-900 disabled:text-gray-300 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Claim my spot
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/code-bg.png" className="mt-10" />
    </div>
  )
}

export default Home