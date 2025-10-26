'use client';

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Target, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Target,
    title: "Prověřené výsledky",
    description: "Systémy, které jsem vytvořil, zpracovávají objednávky v hodnotě 1 miliardy Kč ročně. To není teorie, to jsou reálná čísla.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Zap,
    title: "Komplexní řešení",
    description: "Od designu přes vývoj až po napojení na dopravce, platební brány a účetní systémy. Vše z jedné ruky.",
    color: "from-violet-500 to-violet-600"
  },
  {
    icon: Shield,
    title: "15 let zkušeností",
    description: "Jako spoluzakladatel Mixit.cz jsem postavil celou digitální infrastrukturu úspěšného e-commerce projektu.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: CheckCircle,
    title: "AI na vaší straně",
    description: "Využívám nejmodernější AI technologie pro optimalizaci vašich procesů a zvýšení konverzí.",
    color: "from-blue-500 to-violet-600"
  }
];

export default function WhyWorkWithUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Proč se mnou spolupracovat?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nejsem jen vývojář. Jsem partner, který rozumí vašemu byznysu a pomůže vám růst.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <reason.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
