'use client';

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, LineChart, CheckCircle2, Wrench, Code2, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const consultingServices = [
  {
    icon: Code2,
    title: "SW Architektura",
    description: "Návrh škálovatelných systémů s ohledem na budoucí růst a technologické trendy.",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: LineChart,
    title: "Revize systémů",
    description: "Analýza současného stavu, identifikace problémů a návrh optimalizací.",
    gradient: "from-violet-500 to-violet-600"
  },
  {
    icon: Lightbulb,
    title: "Technologické poradenství",
    description: "Pomoc s výběrem správných technologií a nástrojů pro váš projekt.",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    icon: Wrench,
    title: "Dlouhodobá podpora",
    description: "Technická podpora na míru, údržba a rozvoj vašich systémů.",
    gradient: "from-green-500 to-green-600"
  }
];

export default function ConsultingSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
            <Shield className="w-4 h-4 text-orange-600" />
            <span className="text-orange-900 text-sm font-semibold">SW Architekt a poradce</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Individuální přístup ke každému klientovi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nabízím nejen vývoj, ale i poradenství a dlouhodobou podporu. 
            Každý projekt je jedinečný a zaslouží si individuální řešení.
          </p>
        </motion.div>

        {/* Main value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-violet-600 flex items-center justify-center shadow-xl">
                    <Lightbulb className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Váš technologický partner, ne jen dodavatel
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Jako SW architekt s 15 lety zkušeností rozumím nejen kódu, ale především vašemu byznysu. 
                    Pomůžu vám navrhnout systém, který bude fungovat dnes i za 5 let.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">
                        <strong>Detailní analýza</strong> vašich požadavků a byznis procesů
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">
                        <strong>Pravidelná komunikace</strong> a transparentní reporting průběhu projektu
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">
                        <strong>Flexibilní přístup</strong> - umím se přizpůsobit vašim potřebám a tempu
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Consulting services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {consultingServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 bg-white">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Potřebujete konzultaci k existujícímu projektu?
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Rád se podívám na váš současný systém, identifikuji potenciální problémy 
              a navrhnu konkrétní kroky k optimalizaci.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Audit kódu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Performance analýza</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Bezpečnostní revize</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Návrh refaktoringu</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
