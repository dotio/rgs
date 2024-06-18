import {useEffect, useState} from 'react'

export const useDropdownOpenClose = () => {
  const [opened, setOpened] = useState(false)
  const [mouseInside, setMouseInside] = useState(false)
  const onClick = () => {
    setOpened(false)
  }
  useEffect(() => {
    if (opened && !mouseInside) {
      window.addEventListener('click', onClick)
      return () => {
        window.removeEventListener('click', onClick)
      }
    }
  }, [opened, mouseInside])

  return [opened, setOpened, setMouseInside]
}
