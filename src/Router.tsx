import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Case1 } from './pages/Case1'
import { Case3 } from './pages/Case3'
import { Case2 } from './pages/Case2'
import { Case4 } from './pages/Case4'
import { Exemple1 } from './pages/Exemple1'
import { Exemple2 } from './pages/Exemple2'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exemple1" element={<Exemple1 />} />
      <Route path="/exemple2" element={<Exemple2 />} />
      <Route path="/case/tenda-tem-festa-no-tenda" element={<Case1 />} />
      <Route path="/case/itau-promocao-no-pic-da-selecao" element={<Case2 />} />
      <Route path="/case/banrisul-destino-ban-ban-ban" element={<Case3 />} />
      <Route path="/case/promocao-match-perfeito" element={<Case4 />} />
    </Routes>
  )
}
