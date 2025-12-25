import Hero from '@/components/home/Hero';
import ServicesCarousel from '@/components/ServicesCarousel';
import ServicesOverview from '@/components/home/ServicesOverview';
import AboutPreview from '@/components/home/AboutPreview';
import InteractiveWorldMap from '@/components/InteractiveWorldMap';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ClientsTeaser from '@/components/home/ClientsTeaser';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </div>
          <ServicesCarousel />
        </div>
      </section>
      <AboutPreview />
      <InteractiveWorldMap />
      <TestimonialsCarousel />
      <ClientsTeaser />
      <CTASection />
    </>
  );
}
