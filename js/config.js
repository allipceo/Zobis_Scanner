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
    CLIENT_ID: '80061118878-smdd31gk43q6sbe6nbvdlflhq0qacnho.apps.googleusercontent.com',

    // API Key from test01/sensitive.env
    API_KEY: 'AIzaSyAad7067Y5S6Bs8gPkYh6G-LWRO1u5dzbU',

    // OAuth Scopes
    SCOPES: [
        'https://www.googleapis.com/auth/contacts', // For saving contacts
        'https://www.googleapis.com/auth/cloud-vision' // For OCR (if using client-side API, though API Key is usually enough for key-based auth)
    ].join(' '),

    // Mock Authentication Toggle
    USE_MOCK_AUTH: false,

    // Mock OCR Toggle (Use this if API Key is blocked or billing is not enabled)
    USE_MOCK_OCR: false
};
