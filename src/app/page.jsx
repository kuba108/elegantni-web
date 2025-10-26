'use client';

import { useRef } from "react";
import HeroSection from "@/components/home/HeroSection";
import WhyWorkWithUs from "@/components/home/WhyWorkWithUs";
import Services from "@/components/home/Services";
import Experience from "@/components/home/Experience";
import ContactForm from "@/components/home/ContactForm";
import CalendarSection from "@/components/home/CalendarSection";
import Footer from "@/components/home/Footer";
import ProjectsSection from "@/components/home/ProjectsSection";
import ConsultingSection from "@/components/home/ConsultingSection";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  const contactRef = useRef(null);
  const calendarRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        onScrollToContact={scrollToContact}
        onScrollToCalendar={scrollToCalendar}
      />

      <WhyWorkWithUs />

      <Services />

      <ConsultingSection />

      <Experience />

      <ProjectsSection />

      <div ref={calendarRef}>
        <CalendarSection />
      </div>

      <div ref={contactRef}>
        <ContactForm />
      </div>

      <Footer />

      <Toaster />
    </div>
  );
}
