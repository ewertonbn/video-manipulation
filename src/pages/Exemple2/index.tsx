import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import videoFile1 from '../../assets/itau.mp4'
import videoFile2 from '../../assets/tramontina.mp4'
import videoFile3 from '../../assets/personnalite.mp4'

interface CaseProps {
  id: string
  src: string
  name: string
  slug: string
}

const casesList: Array<CaseProps> = [
  {
    id: '1',
    src: videoFile1,
    name: 'Promoção Itaú',
    slug: 'promocao-itau',
  },
  {
    id: '2',
    src: videoFile2,
    name: 'Promoção Tramontina',
    slug: 'promocao-tramontina',
  },
  {
    id: '3',
    src: videoFile3,
    name: 'Promoção Itaú Personnalité',
    slug: 'promocao-itau-personnalite',
  },
]

export function Exemple2() {
  const [currentCase, setCurrentCase] = useState<CaseProps>(casesList[0])
  const [nextCase, setNextCase] = useState<CaseProps>(casesList[1])

  const [current, setCurrent] = useState<number>(1)
  const [next, setNext] = useState<number>(2)

  const [isActive, setIsActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [pause, setPause] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        if (current <= casesList.length) {
          setCurrent((state) => state + 1)
          setNext((state) => state + 1)

          const newCurrentCase = casesList[current]
          const newNextCase = casesList[next]

          setCurrentCase(newCurrentCase)
          setNextCase(newNextCase)
          console.log(current + ' - ' + next)
        }

        if (current === casesList.length - 1) {
          setCurrent(0)
        }

        if (next === casesList.length - 1) {
          setNext(0)
        }
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [current, next, pause])

  function handleOnFocusedVideo() {
    setIsActive(true)
    videoRef.current?.pause()
    setPause(true)
  }

  function handleNotFocusedVideo() {
    setIsActive(false)
    videoRef.current?.play()
    setPause(false)
  }

  return (
    <>
      <Link to="/">Home</Link>
      <div className="videoContainer">
        <div>
          <video
            key={currentCase.id}
            loop
            playsInline
            muted
            autoPlay
            controls
            ref={videoRef}
            onMouseEnter={handleOnFocusedVideo}
            onMouseLeave={handleNotFocusedVideo}
          >
            <source type="video/mp4" src={currentCase.src} />
          </video>
          <div
            className={`modal ${isActive ? 'active' : ''}`}
            onMouseEnter={handleOnFocusedVideo}
            onMouseLeave={handleNotFocusedVideo}
          >
            <h1>{currentCase.name}</h1>
            <a
              href={`/case/${currentCase.slug}`}
              className={`${isActive ? 'active' : ''}`}
            >
              Acessar {currentCase.name}
            </a>
          </div>
        </div>

        <div>
          <video key={nextCase.id} loop playsInline muted autoPlay controls>
            <source type="video/mp4" src={nextCase.src} />
          </video>
        </div>
      </div>
    </>
  )
}
