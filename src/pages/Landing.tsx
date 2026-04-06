import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Problem from '../components/sections/Problem';
import Solution from '../components/sections/Solution';
import Testimonials from '../components/sections/Testimonials';
import LeadForm from '../components/sections/LeadForm';
import TrustSignals from '../components/sections/TrustSignals';
import FAQ from '../components/sections/FAQ';

const Landing: React.FC = () => {
  const pageTitle = "Implantes Dentales en Madrid – Clínica Dental Sonrisa Real";
  const pageDescription = "Especialistas en implantes dentales en Madrid. Tecnología 3D, financiación sin intereses y garantía de calidad para tu nueva sonrisa. ¡Solicita tu valoración GRATUITA!";
  const canonicalUrl = "https://clinicasonrisareal.com/";
  const ogImageUrl = "https://clinicasonrisareal.com/og-image.jpg"; // Placeholder

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={ogImageUrl} />
        
        {/* Schema LocalBusiness placeholder */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Clínica Dental Sonrisa Real",
            "image": ogImageUrl,
            "url": canonicalUrl,
            "telephone": "+34912345678",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Calle de la Salud 123",
              "addressLocality": "Madrid",
              "postalCode": "28001",
              "addressCountry": "ES"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 40.416775,
              "longitude": -3.703790
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "20:00"
            }
          })}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Problem />
          <TrustSignals />
          <Solution />
          <Testimonials />
          <LeadForm />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Landing;
