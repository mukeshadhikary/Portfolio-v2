"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  CheckCircle,
  Github,
  Twitter,
  Facebook,
  Mail,
  MessageCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/constants";
import { sendContactEmail } from "@/components/email_context";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  {
    icon: Github,
    href: siteConfig.links.github,
    label: "GitHub",
    description: "Check out my code repositories",
    color: "hover:text-white hover:border-white",
  },
  {
    icon: Facebook,
    href: siteConfig.links.facebook,
    label: "Facebook",
    description: "Connect with me socially",
    color: "hover:text-blue-500 hover:border-blue-500",
  },
  {
    icon: Twitter,
    href: siteConfig.links.twitter,
    label: "Twitter",
    description: "Follow my tech journey",
    color: "hover:text-sky-400 hover:border-sky-400",
  },
  {
    icon: Mail,
    href: `mailto:${siteConfig.links.email}`,
    label: "Email",
    description: "Direct communication",
    color: "hover:text-red-400 hover:border-red-400",
  },
];

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setEmailError(null);

    try {
      // Send email via AWS SES
      const emailResult = await sendContactEmail({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });

      if (!emailResult.success) {
        throw new Error(emailResult.message);
      }

      setIsSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setEmailError(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-400 mb-4">
            LET&apos;S CONNECT
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you!
          </p>
          <div className="w-24 h-1 mx-auto mt-4 bg-linear-to-r from-cyan-400 via-purple-500 to-yellow-400 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative p-8 bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-3xl backdrop-blur-md overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">
                    Send me a message
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
                      >
                        <CheckCircle className="w-10 h-10 text-green-400" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-white/60">
                        Thank you for reaching out. I&apos;ll get back to you as
                        soon as possible!
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <Input
                        label="Name"
                        placeholder="Your name"
                        error={errors.name?.message}
                        {...register("name")}
                        required
                      />

                      <Input
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        error={errors.email?.message}
                        {...register("email")}
                        required
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+1 234 567 890 (optional)"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />

                      <Textarea
                        label="Message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        error={errors.message?.message}
                        {...register("message")}
                        required
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Send Message
                            <Send className="w-5 h-5" />
                          </span>
                        )}
                      </Button>

                      {emailError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{emailError}</span>
                        </motion.div>
                      )}

                      <p className="text-xs text-white/40 text-center">
                        Your message will be sent directly to my inbox
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Or connect with me on
            </h3>

            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className={`flex items-center gap-4 p-5 bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl backdrop-blur-md transition-all duration-300 ${social.color} group`}
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-current transition-colors">
                  <social.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-current transition-colors">
                    {social.label}
                  </h4>
                  <p className="text-sm text-white/60">{social.description}</p>
                </div>
              </motion.a>
            ))}

            {/* WhatsApp Direct Link */}
            <motion.a
              href={`https://wa.me/${siteConfig.links.whatsapp.replace(
                /[^0-9]/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="flex items-center gap-4 p-5 bg-linear-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl backdrop-blur-md transition-all duration-300 hover:text-green-400 hover:border-green-400 group"
            >
              <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/30 group-hover:border-green-400 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-green-400 transition-colors">
                  WhatsApp
                </h4>
                <p className="text-sm text-white/60">
                  Instant messaging & quick response
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
