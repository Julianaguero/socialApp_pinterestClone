import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Home from './container/Home'

import { GoogleOAuthProvider } from '@react-oauth/google'



function App() {
  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
