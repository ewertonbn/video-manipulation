import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import videoFile1 from '../../assets/itau.mp4'
import videoFile2 from '../../assets/tramontina.mp4'
import videoFile3 from '../../assets/personnalite.mp4'

/*
  Ter duas tags vídeos com case atual e a prévia do próximo
  quando pegar o primeiro item do array, pegar junto o segundo e carregar na prévia
  Após 5 segundos o case atual é substituído pela prévia e assim sucessivamente.
*/

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

  // const currentCaseItem = casesList[0]
  // const nextCaseItem = casesList[1]

  // const loadingCase = useCallback(() => {

  //   const index = 0
  //   const nextVideo = 0

  //   // setInterval(() => {
  //   //   // for (let i = 0; i < 5; i++) {
  //   //   // index++
  //   //   // }
  //   //   if (current < 10) {
  //   //     setCurrent((state) => state + 1)
  //   //   }
  //   // }, 2000)

  //   // nextVideo = index + 1
  //   // currentVideo = array[index]

  //   // setNext(nextVideo)

  //   // console.log('Current: ' + current)
  //   // console.log('Next: ' + next)

  //   setCurrentCase(currentCaseItem)
  //   setNextCase(nextCaseItem)
  // }, [current])

  useEffect(() => {
    const interval = setInterval(() => {
      if (current < 3) {
        setCurrent((state) => state + 1)
        setNext((state) => state + 1)

        const newCurrentCase = casesList[current]
        const newNextCase = casesList[next]

        setCurrentCase(newCurrentCase)
        setNextCase(newNextCase)
        console.log(current + ' - ' + next)
      } else {
        setCurrent(0)
      }

      if (next <= 2) {
        setNext(1)
        console.log(next)
      }
      // Valor do next está sempre a frente do current, precisa resetar no momento certo para iniciar tudo novamente
    }, 5000)
    return () => clearInterval(interval)
  }, [current, next, currentCase])

  return (
    <>
      <Link to="/">Home</Link>
      <div className="videoContainer">
        <video key={currentCase.id} loop playsInline muted autoPlay controls>
          <source type="video/mp4" src={currentCase.src} />
        </video>
        <video key={nextCase.id} loop playsInline muted autoPlay controls>
          <source type="video/mp4" src={nextCase.src} />
        </video>
      </div>
    </>
  )
}
