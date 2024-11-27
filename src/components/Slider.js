import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { ButtonIcon } from './ButtonIcon'
import { enumButtonColor } from '../enums/enumButtonColor'

const CARD_WIDTH = 226

export const Slider = ({ elements, noElementsMessage }) => {
  const eventsSliderRef = useRef(null)
  const containerEventsRef = useRef(null)

  const [currentOffsetSlider, setCurrentOffsetSlider] = useState(0)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const elementsWidth = eventsSliderRef.current.offsetWidth
      const containerWidth = containerEventsRef.current.offsetWidth

      if (elementsWidth <= containerWidth) setShowRightButton(false)
      else setShowRightButton(true)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleLeftButton = () => {
    const elementsWidth = eventsSliderRef.current.offsetWidth
    const containerWidth = containerEventsRef.current.offsetWidth

    let newOffset
    if (currentOffsetSlider - CARD_WIDTH > 0) {
      newOffset = currentOffsetSlider - CARD_WIDTH
      setShowRightButton(true)
    } else {
      setShowLeftButton(false)
      newOffset = 0
    }

    if (newOffset === elementsWidth - containerWidth) setShowRightButton(false)

    setCurrentOffsetSlider(newOffset)
    eventsSliderRef.current.style.transform = `translateX(-${newOffset}px)`
  }

  const handleRightButton = () => {
    const elementsWidth = eventsSliderRef.current.offsetWidth
    const containerWidth = containerEventsRef.current.offsetWidth

    let newOffset
    if (currentOffsetSlider + CARD_WIDTH < elementsWidth - containerWidth) {
      newOffset = currentOffsetSlider + CARD_WIDTH
      setShowLeftButton(true)
    } else {
      setShowRightButton(false)
      newOffset = currentOffsetSlider + (elementsWidth - containerWidth - currentOffsetSlider)
    }

    if (newOffset === 0) setShowLeftButton(false)

    setCurrentOffsetSlider(newOffset)
    eventsSliderRef.current.style.transform = `translateX(-${newOffset}px)`
  }

  return (
    <div className="flex items-center relative" ref={containerEventsRef}>
      <div className="flex gap-4 whitespace-nowrap transition-transform" ref={eventsSliderRef}>
        {elements}
      </div>
      {elements.length === 0 && <p className="text-center w-full">{noElementsMessage}</p>}
      {showLeftButton && (
        <div className="absolute top-1/3 left-0">
          <ButtonIcon color={enumButtonColor.primary} size={16} Icon={ArrowLeft} onClick={handleLeftButton} />
        </div>
      )}
      {showRightButton && (
        <div className="absolute top-1/3 right-0">
          <ButtonIcon color={enumButtonColor.primary} size={16} Icon={ArrowRight} onClick={handleRightButton} />
        </div>
      )}
    </div>
  )
}
