document.addEventListener('DOMContentLoaded', () => {
    const statusMessage = document.getElementById('statusMessage');
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get('transactionId');

    if (transactionId) {
        statusMessage.textContent = `Checking status for Transaction ID: ${transactionId}...`;
        pollPaymentStatus(transactionId);
    } else {
        statusMessage.textContent = 'No transaction ID provided.';
    }

    async function pollPaymentStatus(id) {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`http://localhost:7658/api/transaction/${id}`);
                const data = await response.json();

                if (response.ok) {
                    statusMessage.textContent = `Status: ${data.status.toUpperCase()}`;
                    if (data.status === 'successful' || data.status === 'failed') {
                        clearInterval(interval);
                    }
                } else {
                    statusMessage.textContent = `Error: ${data.message || 'Could not retrieve status.'}`;
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Error polling status:', error);
                statusMessage.textContent = 'An error occurred while checking status.';
                clearInterval(interval);
            }
        }, 3000); // Poll every 3 seconds
    }
});