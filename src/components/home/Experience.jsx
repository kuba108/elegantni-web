import React from "react";
import { motion } from "framer-motion";
import { Building2, Code, Boxes, TrendingUp } from "lucide-react";

export default function Experience() {
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
            Zkušenosti z reálného byznysu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Spoluzakladatel a technický ředitel projektu Mixit.cz
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Mixit.cz</h3>
                <p className="text-gray-600">15 let aktivní spolupráce</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">
                    1 miliarda Kč ročně
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Systémy, které jsem vytvořil, dnes zpracovávají objednávky v této hodnotě. 
                    To znamená stabilitu, škálovatelnost a důvěru tisíců zákazníků denně.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">
                    Komplexní vývoj
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Zodpovědnost za webovou prezentaci, administrační rozhraní a především 
                    interní systémy pro řízení celé firmy. Od skladu po účetnictví.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Boxes className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">
                    Integrace s externími systémy
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Napojení na dopravce (PPL, DPD, Zásilkovna), platební brány (GoPay, Comgate) 
                    a účetní software (ABRA). Zkušenosti s reálnými podmínkami a provozem.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong className="text-gray-900">Tyhle zkušenosti přináším do vašeho projektu.</strong> 
                {' '}Vím, co funguje a co ne. Znám úskalí e-commerce a vím, jak postavit systémy, 
                které vydrží růst vašeho byznysu.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}