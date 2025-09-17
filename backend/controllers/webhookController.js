const Payment = require('../models/Payment');
const { verifyWebhook } = require('../utils/verifyWebhook');

const handleWebhook = async (req, res) => {
  const { encResp } = req.body; // CCAvenue typically sends an encrypted response
  const workingKey = process.env.CCA_WORKING_KEY;

  try {
    // In a real scenario, you would decrypt and verify the webhook payload
    // using CCAvenue's specified method (e.g., AES decryption, HMAC-SHA256 verification).
    // For this simulation, we'll assume encResp contains a base64 encoded JSON string
    // that includes transaction details and a simulated signature.

    const verificationResult = verifyWebhook(encResp, workingKey);

    if (!verificationResult.verified) {
      console.error('Webhook verification failed:', verificationResult.message);
      return res.status(400).send('Webhook verification failed');
    }

    const { transactionId, status } = verificationResult.data;

    const payment = await Payment.findOneAndUpdate(
      { transactionId: transactionId },
      { status: status, updatedAt: Date.now() },
      { new: true }
    );

    if (!payment) {
      console.error('Payment not found for transactionId:', transactionId);
      return res.status(404).send('Payment not found');
    }

    res.status(200).send('Webhook received and processed');

  } catch (err) {
    console.error('Error handling webhook:', err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { handleWebhook };