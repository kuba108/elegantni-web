'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection({ onScrollToContact, onScrollToCalendar }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-violet-900 to-blue-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-violet-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-white/90 text-sm font-medium">Digitální řešení nové generace</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Weby a funnely,
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              které prodávají
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Vytvářím prémiové online řešení na míru s AI optimalizacemi. 
            15 let zkušeností, systémy za miliardy korun ročně.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={onScrollToCalendar}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 text-lg px-8 py-6 rounded-full shadow-xl shadow-orange-500/30 transition-all hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105"
            >
              Rezervovat konzultaci
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={onScrollToContact}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full transition-all hover:scale-105"
            >
              Napsat zprávu
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/10"
        >
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">15+</div>
            <div className="text-white/70">let zkušeností</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">1 mld</div>
            <div className="text-white/70">Kč objednávek</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
            <div className="text-white/70">na míru</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">AI</div>
            <div className="text-white/70">optimalizace</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
