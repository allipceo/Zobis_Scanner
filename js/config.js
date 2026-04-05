/**
 * AG_Test02 - Configuration
 *
 * [IMPORTANT]
 * Please replace the placeholders below with your actual Google Cloud credentials.
 * - CLIENT_ID: OAuth 2.0 Client ID for Web Application.
 * - API_KEY: API Key with 'Cloud Vision API' and 'People API' enabled.
 */

const CONFIG = {
    // Client ID from test01/sensitive.env
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID_HERE',

    // API Key from test01/sensitive.env
    // [TROUBLESHOOTING]: If you see 403 API_KEY_SERVICE_BLOCKED:
    // 1. Visit: https://console.cloud.google.com/apis/library/vision.googleapis.com
    // 2. Ensure "API Enable" is definitely active.
    // 3. Visit: https://console.cloud.google.com/apis/credentials
    // 4. Check "API Restrictions" on your key. Set to "None" or add "Cloud Vision API".
    API_KEY: 'YOUR_GOOGLE_API_KEY_HERE',

    // OAuth Scopes
    SCOPES: [
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/cloud-vision'
    ].join(' '),

    // Mock Authentication Toggle
    USE_MOCK_AUTH: false,

    // Mock OCR Toggle (Use this if API Key is blocked or billing is not enabled)
    USE_MOCK_OCR: false,

    // Advanced Diagnostics
    ENABLE_DIAGNOSTICS: true
};
