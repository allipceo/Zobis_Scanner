/**
 * AG_Test02 - Configuration
 *
 * [IMPORTANT]
 * Please replace the placeholders below with your actual Google Cloud credentials.
 * - CLIENT_ID: OAuth 2.0 Client ID for Web Application.
 * - API_KEY: API Key with 'Cloud Vision API' and 'People API' enabled.
 */

const CONFIG = {
    // Client ID for Google Authentication
    CLIENT_ID: '80061118878-smdd31gk43q6sbe6nbvdlflhq0qacnho.apps.googleusercontent.com',

    // API Key for Google Cloud Vision API
    // [SECURITY]: To prevent unauthorized usage, please set "Website Restrictions" 
    // to "https://allipceo.github.io/*" in the Google Cloud Console.
    API_KEY: 'AIzaSyDVlqKf1SS6EsAmR8sNYFkjFwOHVrjFHqo',

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
