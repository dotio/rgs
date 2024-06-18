import {useEffect, useState} from 'react'

export const useFilterOpenClose = () => {
  const [opened, setOpened] = useState(false)
  const [mouseInside, setMouseInside] = useState(false)
  const onClick = (e) => {
    const clickedInsideReactCalendar = e.target.parentElement.classList.contains('react-calendar__navigation') ||
        e.target.parentElement.classList.contains('react-calendar__tile') ||
        e.target.classList.contains('react-calendar__tile')

    !clickedInsideReactCalendar && setOpened(false)
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
