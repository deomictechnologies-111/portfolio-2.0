exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    
    // Retrieve Web3Forms access key from server environment variables
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Server configuration error: WEB3FORMS_ACCESS_KEY is not set.' 
        }),
      };
    }

    // Inject the secure access key into the payload
    const formData = {
      ...body,
      access_key: accessKey,
    };

    // Use global fetch (Node 18+) or fallback to node-fetch
    const activeFetch = typeof globalThis.fetch === 'function' ? globalThis.fetch : require('node-fetch');

    const response = await activeFetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error in Netlify secure submit handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Internal server error' }),
    };
  }
};
