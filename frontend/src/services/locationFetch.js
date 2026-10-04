const getLocation = (setLocation)=>{
    navigator.geolocation.getCurrentPosition(async(position)=>{
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const limit = 1
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`)
        const data = await res.json()
        const city = data[0].name
        const state = data[0].state        
        setLocation({city,state})

        const updateLocation = ""
    },
    (error)=>{
        console.log("Location error:", error.message)
    }
)
    
}

export {getLocation}



        
        

    