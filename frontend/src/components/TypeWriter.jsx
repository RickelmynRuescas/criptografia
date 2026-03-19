import { useEffect, useState } from "react"

function TypeWriter({ text }) {
  const [display, setDisplay] = useState("")

  useEffect(() => {
    let i = 0
    setDisplay("")

    const interval = setInterval(() => {
      setDisplay(text.slice(0, i))
      i++

      if (i > text.length) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [text])

  return <div className="typewriter">{display}</div>
}

export default TypeWriter