import { useState, useEffect } from "react"

function TypeWriter({text}){

const [display,setDisplay] = useState("")

useEffect(()=>{

let i = 0

const interval = setInterval(()=>{

setDisplay(text.slice(0,i))
i++

if(i > text.length){
clearInterval(interval)
}

},50)

},[text])

return <div className="typewriter">{display}</div>

}

export default TypeWriter