import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarGallery from "@/components/CarGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-black text-white selection:bg-brand selection:text-white">
      <Navbar />
      <Hero />
      <CarGallery />
      <Footer />
    </div>
  );
}
