// App State
let appState = {
    flatNumber: 'A-304',
    parcels: [
        {
            id: 1,
            boxNumber: 'Box 1',
            receivedTime: '2:30 PM',
            receivedDate: 'Today',
            status: 'waiting'
        }
    ],
    history: [
        {
            id: 101,
            boxNumber: 'Box 3',
            collectedDate: 'Jan 20, 2026',
            collectedTime: '4:15 PM'
        },
        {
            id: 102,
            boxNumber: 'Box 1',
            collectedDate: 'Jan 18, 2026',
            collectedTime: '6:30 PM'
        },
        {
            id: 103,
            boxNumber: 'Box 2',
            collectedDate: 'Jan 15, 2026',
            collectedTime: '1:45 PM'
        }
    ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderFlatNumber();
    renderParcelStatus();
    renderActionButton();
    renderHistory();

    // Simulate notification on load (for demo purposes)
    setTimeout(() => {
        if (appState.parcels.length > 0) {
            showNotification(`Your parcel is safe and sound in ${appState.parcels[0].boxNumber}`);
        }
    }, 1000);
});

// Render Flat Number
function renderFlatNumber() {
    const flatNumberEl = document.getElementById('flatNumber');
    if (flatNumberEl) {
        flatNumberEl.textContent = appState.flatNumber;
    }
}

// Render Parcel Status
function renderParcelStatus() {
    const statusEl = document.getElementById('parcelStatus');

    if (appState.parcels.length === 0) {
        // Empty State
        statusEl.className = 'parcel-status';
        statusEl.innerHTML = `
            <span class="status-icon">📭</span>
            <h2 class="status-title">No parcels right now</h2>
            <p class="status-subtitle">We'll notify you when a parcel arrives</p>
        `;
    } else {
        // Has Parcels
        const parcelCount = appState.parcels.length;
        const parcel = appState.parcels[0]; // Show first parcel

        statusEl.className = 'parcel-status has-parcel';
        statusEl.innerHTML = `
            <span class="status-icon">📦</span>
            <h2 class="status-title">${parcelCount} ${parcelCount === 1 ? 'parcel' : 'parcels'} waiting</h2>
            <div class="parcel-details">
                <div class="detail-item">
                    <span class="detail-icon">🔒</span>
                    <div class="detail-content">
                        <div class="detail-label">Located in</div>
                        <div class="detail-value">${parcel.boxNumber}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">⏰</span>
                    <div class="detail-content">
                        <div class="detail-label">Received</div>
                        <div class="detail-value">${parcel.receivedDate} at ${parcel.receivedTime}</div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Render Action Button
function renderActionButton() {
    const actionEl = document.getElementById('actionArea');

    if (appState.parcels.length > 0) {
        actionEl.innerHTML = `
            <button class="access-button" onclick="accessBox()">
                Access ${appState.parcels[0].boxNumber}
            </button>
        `;
    } else {
        actionEl.innerHTML = `
            <button class="access-button" disabled>
                No parcel to collect
            </button>
        `;
    }
}

// Render History
function renderHistory() {
    const historySection = document.getElementById('historySection');
    const historyListEl = document.getElementById('historyList');

    // Hide history section if there are pending parcels
    if (appState.parcels.length > 0) {
        historySection.style.display = 'none';
        return;
    }

    historySection.style.display = 'block';

    if (appState.history.length === 0) {
        historyListEl.innerHTML = `
            <div class="empty-history">No delivery history yet</div>
        `;
    } else {
        historyListEl.innerHTML = appState.history.map(item => `
            <div class="history-item">
                <div class="history-info">
                    <div class="history-box">${item.boxNumber}</div>
                    <div class="history-date">${item.collectedDate} at ${item.collectedTime}</div>
                </div>
                <div class="history-status">Collected</div>
            </div>
        `).join('');
    }
}

// Access Box Function
function accessBox() {
    if (appState.parcels.length === 0) return;

    const parcel = appState.parcels[0];

    // Simulate unlocking the box
    const button = document.querySelector('.access-button');
    button.textContent = 'Opening...';
    button.disabled = true;

    setTimeout(() => {
        // Move parcel to history
        appState.history.unshift({
            id: Date.now(),
            boxNumber: parcel.boxNumber,
            collectedDate: 'Today',
            collectedTime: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
        });

        // Remove from active parcels
        appState.parcels.shift();

        // Show confirmation modal
        showConfirmationModal();

        // Update UI
        setTimeout(() => {
            renderParcelStatus();
            renderActionButton();
            renderHistory();
        }, 2000);
    }, 1500);
}

// Show Notification
function showNotification(message) {
    const notificationEl = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');

    notificationText.textContent = message;
    notificationEl.classList.add('show');

    setTimeout(() => {
        notificationEl.classList.remove('show');
    }, 4000);
}

// Show Confirmation Modal
function showConfirmationModal() {
    const modal = document.getElementById('confirmModal');
    modal.classList.add('show');
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('show');
}

// Demo Functions (for testing different states)
function toggleParcelState() {
    if (appState.parcels.length === 0) {
        // Add a parcel
        appState.parcels.push({
            id: Date.now(),
            boxNumber: 'Box 2',
            receivedTime: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }),
            receivedDate: 'Today',
            status: 'waiting'
        });
        showNotification(`Your parcel is safe and sound in Box 2`);
    } else {
        appState.parcels = [];
    }

    renderParcelStatus();
    renderActionButton();
}

// Make demo function available globally (for testing)
window.toggleParcelState = toggleParcelState;
