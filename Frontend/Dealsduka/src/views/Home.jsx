import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <HeroSection />
      <Services />
      <Footer />
    </div>
  );
};

export default Home;
