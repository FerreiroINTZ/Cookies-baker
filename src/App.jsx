import { useState, useEffect } from 'react'
import SignIn from './components/signIn/signIn.jsx'
import LogedIn from './components/logedIn/logedIn.jsx'
import Footer from './components/footer/footer.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState("...")
  const [userInfo, setUserinfo] = useState({})

  useEffect(() =>{
    if(!document.cookie){
      fetch("http://localhost:3000/clearCookie", {credentials: "include"})
    }
    
    async function fetchData(){
      var cookiesData = await fetch("http://localhost:3000/findCookie",{
          credentials: 'include',
        })
        
        if(cookiesData.status == 200){
          setPage("habilitado")
          cookiesData = await cookiesData.json()
          setUserinfo(cookiesData)
        }else{
        fetch('http://localhost:3000/clearCookie')
        setPage("desabilitado")
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <h1>Cookie Baker</h1>
      {
        page == "habilitado"
        ? <SignIn userInfo={userInfo}/> 
        : page == "desabilitado" ? <LogedIn setPage={setPage}/> : <h3>Esperando...</h3>
      }
      <Footer />
    </>
  )
}

export default App
