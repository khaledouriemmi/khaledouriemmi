import './globals.css'
import HomeSection        from "./assets/components/HomeSection";
import ExpProjectsSection from "./assets/components/ExpProjectsSection";
import ContactSection     from "./assets/components/ContactSection";
import Terminal          from "./assets/components/Terminal";

function App() {
  return (
    <div className="App">
      <video autoPlay muted loop playsInline className="bg-video" poster="/bg.png">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <HomeSection/>
      <Terminal/>
      <ExpProjectsSection/>
      <ContactSection/>
    </div>
  )
}

export default App
