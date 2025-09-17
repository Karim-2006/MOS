const crypto = require('crypto');

const verifyWebhook = (encResp, workingKey) => {
  try {
    // CCAvenue typically sends an AES encrypted response (encResp)
    // and expects decryption using the WorkingKey.
    // The exact decryption method (e.g., AES-128-CBC, AES-256-CBC) and IV
    // would be specified in CCAvenue's API documentation.
    // For demonstration, we'll simulate a basic decryption and verification.

    // In a real scenario, you would use the provided workingKey to decrypt encResp.
    // Example (conceptual, not actual CCAvenue decryption logic):
    // const decipher = crypto.createDecipheriv('aes-128-cbc', workingKey, iv);
    // let decrypted = decipher.update(encResp, 'hex', 'utf8');
    // decrypted += decipher.final('utf8');

    // For now, we'll assume encResp is a JSON string that needs to be parsed
    // and we'll simulate a checksum verification.

    const decryptedResponse = JSON.parse(Buffer.from(encResp, 'base64').toString('utf8'));

    // Simulate HMAC-SHA256 verification with WorkingKey
    const dataToHash = JSON.stringify(decryptedResponse.transactionDetails);
    const hmac = crypto.createHmac('sha256', workingKey);
    hmac.update(dataToHash);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === decryptedResponse.signature) {
      return { verified: true, data: decryptedResponse.transactionDetails };
    } else {
      return { verified: false, message: 'Signature mismatch' };
    }

  } catch (err) {
    console.error('Error verifying webhook:', err.message);
    return { verified: false, message: 'Decryption or parsing error' };
  }
};

module.exports = { verifyWebhook };