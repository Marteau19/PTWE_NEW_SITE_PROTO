import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import TurnkeySolution from './sections/TurnkeySolution'
import ImpactCounter from './sections/ImpactCounter'
import Journey from './sections/Journey'
import DisappearSequence from './sections/DisappearSequence'
import AppTeaser from './sections/AppTeaser'
import ServiceMap from './sections/ServiceMap'
import Trust from './sections/Trust'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="relative overflow-clip">
      <Navbar />
      <main>
        <Hero />
        <TurnkeySolution />
        <ImpactCounter />
        <Journey />
        <DisappearSequence />
        <AppTeaser />
        <ServiceMap />
        <Trust />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
