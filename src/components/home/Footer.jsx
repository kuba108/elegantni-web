'use client';

import React from "react";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-violet-400 bg-clip-text text-transparent">
              elegantniweb.cz
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Prémiová webová řešení s AI optimalizacemi. 
              15 let zkušeností z reálného e-commerce byznysu.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Služby</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Prodejní funnely</li>
              <li>Webové stránky</li>
              <li>AI integrace</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Kontakt</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>kuba@elegantniweb.cz</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} elegantniweb.cz - Všechna práva vyhrazena</p>
          <p className="mt-2">Vytvořeno s ❤️ pro váš úspěch</p>
        </div>
      </div>
    </footer>
  );
}
