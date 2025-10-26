'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Star, Award, Code, Rocket, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import projects from "@/data/projects";

const categoryColors = {
  ecommerce: "from-blue-500 to-blue-600",
  inzert_web: "from-green-500 to-green-600",
  web: "from-violet-500 to-violet-600",
  funnel: "from-orange-500 to-orange-600",
  system: "from-green-500 to-green-600"
};

const categoryLabels = {
  ecommerce: "E-commerce",
  inzert_web: "Inzertní web",
  web: "Webové stránky",
  funnel: "Prodejní funnel",
  system: "Interní systémy"
};

export default function ProjectsSection() {
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Reference a projekty
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Přes 20 úspěšných projektů v oblasti webového vývoje a e-commerce
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-orange-500 fill-orange-500" />
              Hlavní projekty
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105 overflow-hidden bg-white">
                    {project.image_url && (
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <Image
                          src={project.image_url}
                          alt={project.name}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {project.name}
                          </h3>
                          {project.category && (
                            <Badge 
                              className={`bg-gradient-to-r ${categoryColors[project.category]} text-white border-0`}
                            >
                              {categoryLabels[project.category]}
                            </Badge>
                          )}
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5 text-gray-600" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="border-0 shadow-2xl bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-5 gap-8">
                {/* Photo Section */}
                <div className="md:col-span-2 bg-gradient-to-br from-blue-100 via-violet-100 to-orange-100 p-8 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-violet-600 rounded-3xl blur-2xl opacity-20"></div>
                    <div className="relative w-64 h-64 rounded-3xl shadow-2xl border-4 border-white overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop"
                        alt="Profil"
                        fill
                        sizes="256px"
                        className="rounded-3xl object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="md:col-span-3 p-8 md:p-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-violet-100 rounded-full mb-6">
                    <Code className="w-4 h-4 text-violet-700" />
                    <span className="text-violet-900 text-sm font-semibold">SW Architekt & Vývojář</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    elegantniweb.cz
                  </h3>

                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    <strong className="text-gray-900">15 let zkušeností</strong> v oblasti webového vývoje a e-commerce. 
                    Spoluzakladatel projektu Mixit.cz, kde jsem postavil systémy zpracovávající 
                    <strong className="text-orange-600"> 1 miliardu Kč</strong> objednávek ročně.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Komplexní řešení</h4>
                        <p className="text-gray-600 text-sm">
                          Od návrhu architektury přes vývoj až po dlouhodobou podporu
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Code className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Zkušenosti z praxe</h4>
                        <p className="text-gray-600 text-sm">
                          Napojení na dopravce, platební brány, účetní systémy (ABRA)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Individuální přístup</h4>
                        <p className="text-gray-600 text-sm">
                          Každý projekt je unikátní a zaslouží si maximální pozornost
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-700 italic">
                      &quot;Váš úspěch je mým úspěchem. Vytvářím řešení, která fungují
                      dlouhodobě a pomáhají firmám růst.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
