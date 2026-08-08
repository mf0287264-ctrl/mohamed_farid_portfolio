import Navbar from "@/mycomponent/Navbar";
import RobotSection from "@/mycomponent/RobotSection";
import MenuDropdown from "@/mycomponent/MenuDropdown";
import WhatsAppButton from "@/mycomponent/WhatsAppButton";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
      <Navbar />
      <MenuDropdown />
      <RobotSection />
      <WhatsAppButton />
    </main>
  );
}
