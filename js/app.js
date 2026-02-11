/**
 * AG_Test02 - ZOBIS Name Card Scanner
 * Entry Point
 */

console.log('AG_Test02 App Initialized');

// Placeholder for future logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI components
    if (window.UIManager) {
        window.UIManager.init();

        // Bind Save Button
        const btnSave = document.getElementById('btnSave');
        if (btnSave) {
            btnSave.addEventListener('click', () => {
                const data = window.UIManager.getFormData();
                if (window.PeopleManager) {
                    window.PeopleManager.createContact(data);
                }
            });
        }
    }
    console.log('DOM Fully Loaded');

    // Initialize Auth
    // Wait for the Google script to load if it's not ready, but GSI library loads asynchronously.
    // Ideally we wait for window.onload or check google object.
    // For simplicity, we'll try to init.
    // A robust way uses the 'onload' attribute on the script tag, but here we'll use a simple timeout loop or assume standard load.

    // Better: We'll expose a callback or check in an interval if google is undefined
    const checkGoogle = setInterval(() => {
        if (typeof google !== 'undefined' && window.AuthManager) {
            clearInterval(checkGoogle);
            window.AuthManager.init();
        }
    }, 100);
});
