/**
 * AG_Test02 - People Manager
 * Handles interaction with Google People API to save contacts
 */

const PeopleManager = (() => {

    /**
     * Create Contact in Google Contacts
     * @param {Object} contactData - { name, mobile, email, company, job }
     */
    async function createContact(contactData) {
        if (!contactData || !contactData.name) {
            alert('Name is required to save contact.');
            return;
        }

        logToUI('Saving contact...');

        // MOCK AUTH Logic
        if (CONFIG.USE_MOCK_AUTH) {
            logToUI('Mock Auth: Simulating contact save...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            logToUI(`Success (Mock)! Saved: ${contactData.name}`);
            alert(`[Mock] Saved to Google Contacts:\n${contactData.name}`);
            return;
        }

        // Real API Logic
        const token = window.AuthManager ? window.AuthManager.getToken() : null;
        if (!token) {
            alert('Please login first.');
            return;
        }

        const person = {
            names: [{ givenName: contactData.name }],
            phoneNumbers: contactData.mobile ? [{ value: contactData.mobile }] : [],
            emailAddresses: contactData.email ? [{ value: contactData.email }] : [],
            organizations: (contactData.company || contactData.job) ? [{
                name: contactData.company || '',
                title: contactData.job || ''
            }] : []
        };

        try {
            const response = await fetch('https://people.googleapis.com/v1/people:createContact', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(person)
            });

            if (!response.ok) {
                const err = await response.text();
                throw new Error(err);
            }

            const data = await response.json();
            logToUI(`Success! Contact Created: ${data.resourceName}`);
            alert('Successfully saved to Google Contacts!');

        } catch (error) {
            console.error('Save Failed:', error);
            logToUI(`Save Failed: ${error.message}`);
            alert(`Failed to save contact: ${error.message}`);
        }
    }

    // Helper for logging (duplicates ocr.js but simpler to keep isolated if needed, 
    // or we could make a shared logger. For now, reusing the UI element)
    function logToUI(msg) {
        const log = document.getElementById('debugLog');
        if (log) {
            log.innerHTML += `<div>${new Date().toLocaleTimeString()} - ${msg}</div>`;
            log.scrollTop = log.scrollHeight;
        }
        console.log(msg);
    }

    return {
        createContact: createContact
    };

})();

window.PeopleManager = PeopleManager;
