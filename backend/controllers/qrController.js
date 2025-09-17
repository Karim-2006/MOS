const Payment = require('../models/Payment');
const { generateQRCode } = require('../utils/qrcodeGenerator');
const axios = require('axios');

const generateQr = async (req, res) => {
  const { amount, payerEmail } = req.body;

  try {
    // Generate a unique merchant order ID
    const merchantOrderId = `ORDER_${Date.now()}`;

    // Simulate CCAvenue API call for QR code generation
    // In a real scenario, you would make an actual API call to CCAvenue here.
    // The CCAvenue API documentation would provide details on the request format and response.
    // For now, we'll create a dummy UPI URL and use our fallback QR generator.
    
    const dummyUpiUrl = `upi://pay?pa=test@bank&pn=TestMerchant&mc=1234&tid=${merchantOrderId}&am=${amount}.00&cu=INR`;
    const qrCodeUrl = await generateQRCode(dummyUpiUrl);

    if (!qrCodeUrl) {
      return res.status(500).json({ msg: 'QR code generation failed' });
    }

    const newPayment = new Payment({
      transactionId: merchantOrderId, // CCAvenue would provide a real transaction ID
      amount,
      payerEmail,
      merchantOrderId,
      qrCodeUrl,
      status: 'pending',
    });

    await newPayment.save();

    res.json({ qrCodeUrl, transactionId: newPayment.transactionId });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getTransactionStatus = async (req, res) => {
  try {
    const payment = await Payment.findOne({ transactionId: req.params.id });

    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    res.json({ status: payment.status });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const history = await Payment.find().sort({ createdAt: -1 }).limit(100);
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { generateQr, getTransactionStatus, getTransactionHistory };