const QRCode = require('qrcode');

const generateQRCode = async (data) => {
  try {
    const qrCodeImage = await QRCode.toDataURL(data);
    return qrCodeImage;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
};

module.exports = { generateQRCode };