import Nav from '@/components/layout/Nav';
import GoldCurtain from '@/components/ui/GoldCurtain';
import HeroSection from '@/components/sections/HeroSection';
import PhilosophySection from '@/components/sections/PhilosophySection';

export default function Home() {
  return (
    <main>
      <Nav />
      <GoldCurtain />
      <HeroSection />
      <PhilosophySection />
    </main>
  );
}
