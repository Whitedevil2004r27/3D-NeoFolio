exports.handleContact = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  console.log('📬 New Message Received:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  // Here you would typically save to a database or send an email
  
  res.status(200).json({ 
    success: true, 
    message: 'Your message has been received! I will get back to you soon.' 
  });
};
