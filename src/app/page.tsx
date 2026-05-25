import Nav from '@/components/layout/Nav';
import GoldCurtain from '@/components/ui/GoldCurtain';
import HeroSection from '@/components/sections/HeroSection';
import PhilosophySection from '@/components/sections/PhilosophySection';
import TreatmentsSection from '@/components/sections/TreatmentsSection';

export default function Home() {
  return (
    <main>
      <Nav />
      <GoldCurtain />
      <HeroSection />
      <PhilosophySection />
      <TreatmentsSection />
    </main>
  );
}
