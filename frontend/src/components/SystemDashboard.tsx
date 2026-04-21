'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import { Activity, Zap, Server, Wifi } from "lucide-react";

export const SystemDashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/status');
        const json = await response.json();
        setData(json.telemetry);
      } catch (err) {
        console.error("Dashboard fetch failed");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  const metrics = [
    { label: "Core Uptime", value: `${data.uptime}s`, icon: Zap, color: "text-cyan-400" },
    { label: "Neural Load", value: `${data.cpuUsage}%`, icon: Activity, color: "text-purple-500" },
    { label: "Memory Pool", value: `${data.memoryUsage}%`, icon: Server, color: "text-blue-500" },
    { label: "Sync Signal", value: `${data.signalStrength.toFixed(1)}%`, icon: Wifi, color: "text-green-500" }
  ];

  return (
    <section className="section-padding pt-0">
      <div className="max-container">
        <SpotlightCard className="p-1">
          <div className="bg-black/90 p-8 md:p-12 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">System Telemetry</h3>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.4em]">Real-time kernel diagnostics and environment monitoring</p>
              </div>
              <div className="px-4 py-2 bg-cyan-400/5 border border-cyan-400/20 rounded-full flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,243,255,1)]" />
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Live Sync Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {metrics.map((m, i) => (
                <motion.div 
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-gray-500">
                    <m.icon size={14} className={m.color} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{m.label}</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-white tabular-nums tracking-tighter">{m.value}</div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className={`h-full bg-gradient-to-r ${m.color.replace('text-', 'from-').replace('-400', '-400/50')} to-transparent`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-x-12 gap-y-6">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [4, 12, 4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1 bg-cyan-400/30 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-[8px] text-gray-600 font-mono uppercase tracking-widest">Protocol Stream: Encrypted</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    animate={{ x: [-64, 64] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/2 bg-cyan-400/40"
                  />
                </div>
                <span className="text-[8px] text-gray-600 font-mono uppercase tracking-widest">Encryption Level: Quantum</span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
