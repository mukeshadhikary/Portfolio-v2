"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 bg-red-500/20 rounded-full flex items-center justify-center"
        >
          <span className="text-5xl">💥</span>
        </motion.div>

        {/* Error Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Oops! Something went wrong
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 mb-8 max-w-md mx-auto"
        >
          {error.message || "An unexpected error occurred. Please try again."}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button onClick={reset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button variant="secondary" onClick={() => (window.location.href = "/")}>
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
