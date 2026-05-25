import Nav from '@/components/layout/Nav';

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="h-screen flex items-center justify-center">
        <p className="font-cormorant text-4xl" style={{ color: '#C9A84C' }}>Destiny Wellness & Spa</p>
      </div>
    </main>
  );
}
