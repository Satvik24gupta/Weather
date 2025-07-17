import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';


function App() {
  const [tempValue, setTempValue] = useState(500);
  const [location, setLocation] = useState("Delhi")
  const [humidity, setHumidity] = useState(123)
  const [minimum, setMinimum] = useState(124)
  const [maximum, setMaximum] = useState(125)
  const [inputTerm, setInputTerm] = useState('')

  const [historyArray, setHistoryArray] = useState([])


  const WeatherAPIKEY = import.meta.env.VITE_Weather_API_KEY;
  const user = useSelector((state)=>state.user.value)

  const handleChange = (e)=>{
    setInputTerm(e.target.value)
  }

  const toCelcius = (kelvin)=>{
    return Math.round(kelvin - 273.15);
  }
  const navigate = useNavigate();

  const handleSearch = ()=>{
    setLocation(inputTerm)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputTerm}&appid=${WeatherAPIKEY}`)
    .then(response => response.json())
    .then(data=>{
      setTempValue(toCelcius(data.main.temp))
      setHumidity(data.main.humidity)
      setMinimum(toCelcius(data.main.temp_min))
      setMaximum(toCelcius(data.main.temp_max))
    })

    console.log("first")
    fetch(`http://localhost:4444/history`, {
      method:'POST',
      body:JSON.stringify({
        "user":user,
        "data":[
            {
                "location":inputTerm,
                "temp":tempValue,
                "minimum":minimum,
                "maximum":maximum,
                "humidity":humidity
            }
        ]
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })   
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
    })

  }
  
  useEffect(()=>{
    // if(!localStorage.getItem('user')){
    //   navigate('/login')
    // }
    if(!user){
        navigate('/login')
    }
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WeatherAPIKEY}`)
      .then(response => response.json())
      .then(data=>{
        setTempValue(toCelcius(data.main.temp))
        setHumidity(data.main.humidity)
        setMinimum(toCelcius(data.main.temp_min))
        setMaximum(toCelcius(data.main.temp_max))
      })

      fetch(`http://localhost:4444/history?email=${user}`)
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        setHistoryArray(data.data)
      })

  }, [])

  return (
    <>
      <h1>Welcome to our weather app</h1>
      <div className='Container'>
        <div className=''>
            <div className='flex searchContainer'>
              <div className='searchBar'>
                <input type="text" value={inputTerm} onChange={(e)=>handleChange(e)}/>
              </div>
              <div className='SearchBtn'>
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>

            <div className='location'>
              Results for {location}
            </div>

            <div className='tempValue'>
              {tempValue}<sup>o</sup>C
            </div>

            <div className='extra-details'>
              <ul>
                <li>Humidity: {humidity}%</li>
                <li>Minimum: {minimum}<sup>o</sup>C</li>
                <li>Maximum: {maximum}<sup>o</sup>C</li>
              </ul>
            </div>
        </div>

          <h2 style={{position:"absolute"}}>previous Search Record</h2>     
        <div className='history_container flex'>      
          {
            historyArray.map((element, index)=>{
              return(
                <>
                <div className='history border'>
                  <div className='location'>
                    Results for {element.location}
                  </div>

                  <div className='tempValue'>
                    {element.temp}<sup>o</sup>C
                  </div>

                  <div className='extra-details'>
                    <ul>
                      <li>Humidity: {element.humidity}%</li>
                      <li>Minimum: {element.minimum}<sup>o</sup>C</li>
                      <li>Maximum: {element.maximum}<sup>o</sup>C</li>
                    </ul>
                  </div>
                </div>
                </>
              )
            })
          }
        </div>

      </div>
    </>
  )
}

export default App
