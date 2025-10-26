'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Send, CheckCircle, Mail, Phone, MessageSquare } from "lucide-react";

const fakeSubmit = async (payload) => {
  console.info("Contact form submission (placeholder)", payload);
  await new Promise((resolve) => setTimeout(resolve, 400));
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_interest: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fakeSubmit(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service_interest: "",
        message: ""
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setIsSubmitting(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Napište mi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Spojme síly a posuňme váš byznys na novou úroveň
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-2xl bg-white">
              <CardContent className="p-8 md:p-12">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Děkuji za zprávu!
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Ozvú se vám do 24 hodin
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900 font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4 text-violet-600" />
                          Jméno *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                          placeholder="Jan Novák"
                          className="h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900 font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                          placeholder="jan@firma.cz"
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-900 font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4 text-orange-600" />
                          Telefon
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+420 123 456 789"
                          className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-gray-900 font-medium">
                          Co vás zajímá?
                        </Label>
                        <Select
                          value={formData.service_interest}
                          onValueChange={(value) => handleChange("service_interest", value)}
                        >
                          <SelectTrigger className="h-12 border-gray-200">
                            <SelectValue placeholder="Vyberte službu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="funnel">Prodejní funnel</SelectItem>
                            <SelectItem value="website">Webová stránka</SelectItem>
                            <SelectItem value="eshop">E-shop</SelectItem>
                            <SelectItem value="ai">AI integrace</SelectItem>
                            <SelectItem value="other">Jiné</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-900 font-medium flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-violet-600" />
                        Zpráva
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Popište váš projekt..."
                        rows={5}
                        className="border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold rounded-xl shadow-xl shadow-orange-500/30 transition-all hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105"
                    >
                      {isSubmitting ? (
                        "Odesílám..."
                      ) : (
                        <>
                          Odeslat zprávu
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
