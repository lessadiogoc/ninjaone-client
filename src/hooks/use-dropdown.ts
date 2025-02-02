import { useEffect, useRef, useState } from 'react'

let counter = 0

export const useDropdown = () => {
  const [open, setOpen] = useState(false)
  const idRef = useRef(`dropdown-${++counter}`)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(`#${idRef.current}`)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return {
    id: idRef.current,
    open,
    toggle: () => setOpen(!open),
  }
}
