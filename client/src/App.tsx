import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './pages/Layout'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App