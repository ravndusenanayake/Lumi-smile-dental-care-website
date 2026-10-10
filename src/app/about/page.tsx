import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* We can add a simple header if we want, or just let AboutSection handle it */}
        <div className="pt-24 pb-12 bg-slate-50 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900">About Us</h1>
        </div>
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
