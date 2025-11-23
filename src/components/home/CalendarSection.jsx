'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CalendarSection() {
  const handleCalendarClick = () => {
    window.open("https://calendar.app.google/tr2d6jb3mYNFnGkq7", "_blank");
  };

  return (
    <section id="calendar" className="py-24 bg-gradient-to-br from-blue-900 via-violet-900 to-blue-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Pojďme si promluvit
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Rezervujte si 15minutový call přímo v mém kalendáři
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-900">15 minut</p>
                    <p className="text-sm text-gray-600">Konzultace</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-3">
                      <Video className="w-6 h-6 text-violet-600" />
                    </div>
                    <p className="font-medium text-gray-900">Online</p>
                    <p className="text-sm text-gray-600">Google Meet</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                    <p className="font-medium text-gray-900">Flexibilně</p>
                    <p className="text-sm text-gray-600">Váš termín</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleCalendarClick}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-10 py-6 rounded-full shadow-xl shadow-orange-500/30 transition-all hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105"
                >
                  Otevřít kalendář
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
