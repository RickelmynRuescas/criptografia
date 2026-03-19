import { useEffect, useState } from "react"

function TerminalInput({ value, setValue, placeholder, type = "text" }) {
  const [display, setDisplay] = useState("")

  useEffect(() => {
    let i = 0
    setDisplay("")

    const interval = setInterval(() => {
      if (i >= placeholder.length) {
        clearInterval(interval)
        return
      }

      setDisplay((prev) => prev + placeholder.charAt(i))
      i++
    }, 35)

    return () => clearInterval(interval)
  }, [placeholder])

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={display}
    />
  )
}

export default TerminalInput