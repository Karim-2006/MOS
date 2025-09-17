document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    const qrCodeDisplay = document.getElementById('qrCodeDisplay');
    const transactionIdDisplay = document.getElementById('transactionIdDisplay');

    if (paymentForm) {
        paymentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const amount = document.getElementById('amount').value;
            const payerEmail = document.getElementById('payerEmail').value;

            try {
                const response = await fetch(`http://localhost:7658/api/qr/generate-qr`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount, payerEmail }),
                });

                const data = await response.json();

                if (response.ok) {
                    qrCodeDisplay.innerHTML = `<img src="${data.qrCodeUrl}" alt="QR Code">`;
                    transactionIdDisplay.textContent = `Transaction ID: ${data.transactionId}`;
                    // Optionally redirect to a status page or show a link
                    // window.location.href = `payment-status.html?transactionId=${data.transactionId}`;
                } else {
                    qrCodeDisplay.innerHTML = `<p style="color: red;">${data.message || 'Failed to generate QR code.'}</p>`;
                    transactionIdDisplay.textContent = '';
                }
            } catch (error) {
                console.error('Error:', error);
                qrCodeDisplay.innerHTML = `<p style="color: red;">An error occurred. Please try again.</p>`;
                transactionIdDisplay.textContent = '';
            }
        });
    }
});