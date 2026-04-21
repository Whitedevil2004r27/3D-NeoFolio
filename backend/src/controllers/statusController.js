const startTime = Date.now();

let liveStatus = {
  text: "SYSTEM CORE OPERATIONAL",
  description: "Monitoring repository signals",
  isActive: true,
  lastUpdated: new Date()
};

exports.getStatus = (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  
  // Simulated telemetry for the dashboard
  const telemetry = {
    uptime,
    cpuUsage: Math.floor(Math.random() * 15) + 5, // 5-20%
    memoryUsage: Math.floor(Math.random() * 20) + 30, // 30-50%
    activeConnections: Math.floor(Math.random() * 50) + 120,
    signalStrength: 98 + Math.random() * 2
  };

  res.json({
    ...liveStatus,
    telemetry
  });
};

exports.updateStatus = (req, res) => {
  const { text, description, isActive } = req.body;
  
  liveStatus = {
    text: text || liveStatus.text,
    description: description || liveStatus.description,
    isActive: typeof isActive === 'boolean' ? isActive : liveStatus.isActive,
    lastUpdated: new Date()
  };
  
  res.json({ success: true, status: liveStatus });
};
