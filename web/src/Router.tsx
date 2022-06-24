import Event from '@pages/Event'
import Home from '@pages/Home'
import { Route, Routes } from 'react-router-dom'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watch/" element={<Event />} />
      <Route path="/watch/:slug" element={<Event />} />
    </Routes>
  )
}

export default Router