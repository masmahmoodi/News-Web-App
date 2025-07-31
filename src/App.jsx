import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Sources from "./pages/Sources"
import Article from "./pages/Article"
import Layout from "./components/Layout"
export default function App(){
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route  index element={<Home />}/>
        <Route  path="sources" element={<Sources />}/>
        <Route  path="article" element={<Article />}/>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}