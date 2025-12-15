import './globals.css'
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './assets/components/ThemeToggle';
import HomeSection from "./assets/components/HomeSection";
import ExpProjectsSection from "./assets/components/ExpProjectsSection";
import SkillsSection from "./assets/components/SkillsSection";
import ContactSection from "./assets/components/ContactSection";
import Terminal from "./assets/components/Terminal";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <video autoPlay muted loop playsInline className="bg-video" poster="/bg.png">
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <HomeSection />
        <Terminal />
        <ExpProjectsSection />
        <ContactSection />
      </div>
    </ThemeProvider>
  )
}

export default App
