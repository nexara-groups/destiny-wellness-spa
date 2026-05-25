import Nav from '@/components/layout/Nav';
import GoldCurtain from '@/components/ui/GoldCurtain';
import HeroSection from '@/components/sections/HeroSection';
import PhilosophySection from '@/components/sections/PhilosophySection';
import TreatmentsSection from '@/components/sections/TreatmentsSection';
import RitualSection from '@/components/sections/RitualSection';
import MembershipSection from '@/components/sections/MembershipSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import GiftSection from '@/components/sections/GiftSection';
import BookingFooter from '@/components/sections/BookingFooter';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <GoldCurtain />
      <HeroSection />
      <PhilosophySection />
      <TreatmentsSection />
      <RitualSection />
      <MembershipSection />
      <SocialProofSection />
      <GiftSection />
      <BookingFooter />
    </main>
  );
}
