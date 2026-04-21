let liveStatus = {
  text: "Available for Hire",
  description: "Working on new Next.js projects",
  isActive: true,
  lastUpdated: new Date()
};

exports.getStatus = (req, res) => {
  res.json(liveStatus);
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
