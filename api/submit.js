module.exports = async function handler(req, res) {
  // Enforce HTTPS and POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const body = req.body;
    
    // Retrieve Web3Forms access key from server environment variables
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error: WEB3FORMS_ACCESS_KEY is not set.' 
      });
    }

    // Inject the secure access key into the payload
    const formData = {
      ...body,
      access_key: accessKey,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error in secure submit handler:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
