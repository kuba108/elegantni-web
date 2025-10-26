'use client';

import React from "react";
import { motion } from "framer-motion";
import { Globe, TrendingUp, ShoppingCart, Sparkles, Lightbulb } from "lucide-react"; // Added Lightbulb
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: TrendingUp,
    title: "Prodejní funnely",
    description: "Optimalizované prodejní cesty, které konvertují návštěvníky na zákazníky. Maximální návratnost investice.",
    highlights: ["Landing pages", "Checkout optimalizace", "A/B testování", "Analytics"],
    gradient: "from-orange-500 to-orange-600"
  },
  {
    icon: Globe,
    title: "Webové stránky",
    description: "Moderní one-page a vícestránkové weby šité na míru vašemu byznysu. Rychlé, responzivní, SEO optimalizované.",
    highlights: ["Responzivní design", "SEO optimalizace", "Rychlé načítání"],
    gradient: "from-blue-500 to-blue-600"
  },
  // {
  //   icon: ShoppingCart,
  //   title: "E-shopy",
  //   description: "Kompletní e-commerce řešení s napojením na dopravce, platební brány a účetní systémy jako ABRA.",
  //   highlights: ["Platební brány", "Dopravci", "Účetní SW", "Admin systém"],
  //   gradient: "from-violet-500 to-violet-600"
  // },
  {
    icon: Sparkles,
    title: "AI integrace",
    description: "Implementace umělé inteligence pro automatizaci procesů, personalizaci obsahu a zvýšení efektivity.",
    highlights: ["Chatboti", "Personalizace", "Automatizace", "Predikce"],
    gradient: "from-blue-500 to-violet-600"
  },
  { // New service item for consulting and SW architecture
    icon: Lightbulb,
    title: "Konzultace & SW Architektura",
    description: "Nabízím individuální přístup k řešení vašich technických výzev. Od prvotního návrhu až po detailní SW architekturu a optimalizaci stávajících systémů.",
    highlights: ["Analýza potřeb", "Technické poradenství", "Návrh architektury", "Optimalizace procesů"],
    gradient: "from-purple-500 to-indigo-600"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Služby na míru
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specializuji se na řešení, která přinášejí měřitelné výsledky.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105 bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                        <span className="text-sm font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
