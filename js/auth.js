/**
 * AG_Test02 - Authentication Manager
 * Handles Google Identity Services (GIS) Token Model
 */

let tokenClient;
let accessToken = null;

/**
 * Initialize Google Identity Services
 */
function initGIS() {
    if (!CONFIG.CLIENT_ID || CONFIG.CLIENT_ID.includes('YOUR_')) {
        console.warn('CONFIG.CLIENT_ID is missing. Auth will not work until configured.');
        return;
    }

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CONFIG.CLIENT_ID,
        scope: CONFIG.SCOPES,
        callback: (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
                console.log('Access Token Received:', tokenResponse);
                accessToken = tokenResponse.access_token;
                onLoginSuccess();
            }
        },
    });

    // Check if we have a stored token/session (Optional, though GIS Token model is usually user-initiated)
    // For now, we rely on manual login.
    updateAuthUI(false);
}


/**
 * Handle Login Click
 */
function handleAuthClick() {
    // MOCK AUTH Logic
    if (CONFIG.USE_MOCK_AUTH) {
        console.log('Mock Auth: Logging in as Test User...');
        // Simulate a token response
        accessToken = 'mock_token_12345';
        onLoginSuccess();
        return;
    }

    if (!tokenClient) {
        alert('Authentication is not initialized. Please check config.js.');
        return;
    }

    // Force account selection every time as per requirements
    tokenClient.requestAccessToken({ prompt: 'select_account' });
}

/**
 * Handle Logout Click
 */
function handleSignoutClick() {
    const token = google.accounts.oauth2.revoke(accessToken, () => {
        console.log('Token revoked');
        accessToken = null;
        onLogoutSuccess();
    });
}

/**
 * UI Updates on Success
 */
function onLoginSuccess() {
    console.log('User Logged In');
    updateAuthUI(true);

    // Fetch basic profile info if needed (via People API 'people/me')
    // For now, just switch state.
}

function onLogoutSuccess() {
    console.log('User Logged Out');
    updateAuthUI(false);
}

/**
 * Toggle UI state
 * @param {boolean} isSignedIn 
 */
function updateAuthUI(isSignedIn) {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('#userStatus small');
    const userStatusDiv = document.getElementById('userStatus');

    if (isSignedIn) {
        statusDot.classList.add('active');
        statusText.textContent = 'Connected';
        userStatusDiv.onclick = handleSignoutClick; // Click to logout
        userStatusDiv.style.cursor = 'pointer';
        userStatusDiv.title = 'Click to Logout';
    } else {
        statusDot.classList.remove('active');
        statusText.textContent = 'Guest (Login)';
        userStatusDiv.onclick = handleAuthClick; // Click to login
        userStatusDiv.style.cursor = 'pointer';
        userStatusDiv.title = 'Click to Login with Google';
    }
}

// Export functions for global use if needed, or attach to window
window.AuthManager = {
    init: initGIS,
    login: handleAuthClick,
    logout: handleSignoutClick,
    getToken: () => accessToken
};
