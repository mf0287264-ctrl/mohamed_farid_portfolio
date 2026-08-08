import Navbar from "@/mycomponent/Navbar";
import RobotSection from "@/mycomponent/RobotSection";
import MarqueeTicker from "@/mycomponent/MarqueeTicker";
import WhatIDoSection from "@/mycomponent/WhatIDoSection";
import SkillsSection from "@/mycomponent/SkillsSection";
import CareerExperienceSection from "@/mycomponent/CareerExperienceSection";
import ProjectsSection from "@/mycomponent/ProjectsSection";
import AboutSection from "@/mycomponent/AboutSection";
import ContactSection from "@/mycomponent/ContactSection";
import MenuDropdown from "@/mycomponent/MenuDropdown";
import WhatsAppButton from "@/mycomponent/WhatsAppButton";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-clip">
      <Navbar />
      <MenuDropdown />
      <RobotSection />
      <MarqueeTicker />
      <WhatIDoSection />
      <SkillsSection />
      <CareerExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <WhatsAppButton />
    </main>
  );
}
