document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('historyList');

    async function fetchHistory() {
        try {
            const response = await fetch(`http://localhost:7658/api/qr/history`);
            const data = await response.json();

            if (response.ok) {
                if (data.length > 0) {
                    const ul = document.createElement('ul');
                    data.forEach(transaction => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <span>ID: ${transaction.transactionId}</span>
                            <span>Amount: ${transaction.amount}</span>
                            <span>Status: ${transaction.status}</span>
                            <span>Date: ${new Date(transaction.createdAt).toLocaleString()}</span>
                        `;
                        ul.appendChild(li);
                    });
                    historyList.appendChild(ul);
                } else {
                    historyList.innerHTML = '<p>No transactions found.</p>';
                }
            } else {
                historyList.innerHTML = `<p style="color: red;">${data.message || 'Failed to fetch history.'}</p>`;
            }
        } catch (error) {
            console.error('Error fetching history:', error);
            historyList.innerHTML = '<p style="color: red;">An error occurred while fetching history.</p>';
        }
    }

    fetchHistory();
});