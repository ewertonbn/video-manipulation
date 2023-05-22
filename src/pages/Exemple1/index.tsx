import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import videoFile from '../../assets/video.mp4'

export function Exemple1() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [url, setUrl] = useState<string>('')
  const [nameCase, setNameCase] = useState<string>('')
  const [isActive, setIsActive] = useState(false)

  const CasesList = {
    case1: {
      slug: 'tenda-tem-festa-no-tenda',
      name: 'Tenda - Tem festa no Tenda',
    },
    case2: {
      slug: 'itau-promocao-no-pic-da-selecao',
      name: 'Itaú - Promoção no Pic da Seleção',
    },
    case3: {
      slug: 'banrisul-destino-ban-ban-ban',
      name: 'Banrisul - Destino Ban Ban Ban',
    },
    case4: {
      slug: 'promocao-match-perfeito',
      name: 'Itaú Personnalité - Promoção Match Perfeito',
    },
  }

  const loadedMetadata = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0

    video.addEventListener('timeupdate', () => {
      const seconds = Math.floor(video.currentTime)

      if (seconds >= 0 && seconds <= 4) {
        setUrl(CasesList.case1.slug)
        setNameCase(CasesList.case1.name)
      }
      if (seconds >= 5 && seconds <= 9) {
        setUrl(CasesList.case2.slug)
        setNameCase(CasesList.case2.name)
      }
      if (seconds >= 10 && seconds <= 14) {
        setUrl(CasesList.case3.slug)
        setNameCase(CasesList.case3.name)
      }
      if (seconds >= 15 && seconds <= 19) {
        setUrl(CasesList.case4.slug)
        setNameCase(CasesList.case4.name)
      }
    })
  }, [])

  function handleOnFocusedVideo() {
    setIsActive(true)
    videoRef.current?.pause()
  }

  function handleNotFocusedVideo() {
    setIsActive(false)
    videoRef.current?.play()
  }

  useEffect(() => {
    loadedMetadata()
  }, [loadedMetadata])

  return (
    <>
      <Link to="/">Home</Link>
      <div className="videoContainer">
        <video
          loop
          playsInline
          muted
          autoPlay
          controls
          ref={videoRef}
          onLoadedMetadata={loadedMetadata}
          onMouseEnter={handleOnFocusedVideo}
          onMouseLeave={handleNotFocusedVideo}
        >
          <source type="video/mp4" src={videoFile} />
        </video>
        <div
          className={`modal ${isActive ? 'active' : ''}`}
          onMouseEnter={handleOnFocusedVideo}
          onMouseLeave={handleNotFocusedVideo}
        >
          <h1>{nameCase}</h1>
          <a href={`/case/${url}`} className={`${isActive ? 'active' : ''}`}>
            Acessar {nameCase}
          </a>
        </div>
      </div>
      <span>Url do case: {url}</span>
    </>
  )
}
