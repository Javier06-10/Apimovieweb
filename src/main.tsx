import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Mainlayaut from './layaut/mains-layaut.tsx'
import About from './pages/views+popular/about.tsx'
import Home from './pages/views+popular/home.tsx'
import Populartvshows from './pages/views+popular/populartvshows.tsx'
import Showdetails from './pages/views+popular/showdetails.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
      <Routes>
      <Route element={<Mainlayaut/>}>
                <Route index  element={ <Navigate to={'/populartvshows'}/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/populartvshows' element={<Populartvshows/>}/>
                <Route path='/showdetails/:id' element={<Showdetails/>}/>
                </Route>
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    
  </StrictMode>,
)
