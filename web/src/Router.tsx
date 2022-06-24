import Event from '@pages/Event'
import { Route, Routes } from 'react-router-dom'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Event />} />
      <Route path="/watch/:slug" element={<Event />} />
    </Routes>
  )
}

export default Router