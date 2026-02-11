/**
 * AG_Test02 - OCR Manager
 * Handles interaction with Google Cloud Vision API
 */

const OCRManager = (() => {

    /**
     * Analyze Image using Google Cloud Vision API
     * @param {string} base64Image - The base64 encoded image string (including header)
     * @returns {Promise<string>} - The full extracted text
     */
    async function analyzeImage(base64Image) {
        // MOCK OCR Logic
        if (CONFIG.USE_MOCK_OCR) {
            logToUI('Mock OCR Enabled: Returning dummy data...');
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const dummyText = `
                조은상
                부사장
                국방/공공 TF
                Lockton Companies (Korea) Inc.
                서울시 중구 세종대로 136
                SFC빌딩 13층
                (우)04520
                global.lockton.com
                es.cho@lockton.com
                Mobile +82 10 2067 6442
                Office +82 2 2011 0300
                Fax +82 2 2011 0301
            `;
            logToUI(`Success (Mock)! Text Length: ${dummyText.length}`);
            return dummyText;
        }

        if (!CONFIG.API_KEY) {
            console.error('OCR Error: API_KEY is missing.');
            alert('API Key is missing in config.js');
            return null;
        }

        // Robust cleanup of base64 header
        const content = base64Image.replace(/^data:image\/\w+;base64,/, "");
        logToUI(`Image Content Start: ${content.substring(0, 20)}...`);

        const url = `https://vision.googleapis.com/v1/images:annotate?key=${CONFIG.API_KEY}`;

        const payload = {
            requests: [
                {
                    image: {
                        content: content
                    },
                    features: [
                        { type: "TEXT_DETECTION" },
                        { type: "DOCUMENT_TEXT_DETECTION" }
                    ]
                }
            ]
        };

        try {
            logToUI('Sending request to Vision API...');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Check HTTP Status
            if (!response.ok) {
                const errText = await response.text();
                logToUI(`HTTP Error ${response.status}: ${errText.substring(0, 100)}...`);
                throw new Error(`HTTP ${response.status}: ${errText}`);
            }

            const data = await response.json();
            logToUI('Vision API Response Received');

            // Check for Top-level Error
            if (data.error) {
                throw new Error(`API Error ${data.error.code}: ${data.error.message}`);
            }

            // Check if responses array exists
            if (!data.responses || data.responses.length === 0) {
                logToUI(`Invalid Response Structure. Keys: ${Object.keys(data).join(', ')}`);
                return "";
            }

            // Debug: Check if there's any text annotations
            const resp = data.responses[0];
            if (resp.fullTextAnnotation) {
                const text = resp.fullTextAnnotation.text;
                logToUI(`Success! Text Length: ${text.length}`);
                return text;
            } else if (resp.textAnnotations && resp.textAnnotations.length > 0) {
                const text = resp.textAnnotations[0].description;
                logToUI(`Success (textAnnotations)! Text Length: ${text.length}`);
                return text;
            } else if (resp.error) {
                throw new Error(resp.error.message);
            } else {
                logToUI(`No text found. Response keys: ${Object.keys(resp).join(', ')}`);
                return "";
            }

        } catch (error) {
            console.error('OCR Failed:', error);
            logToUI(`OCR Failed: ${error.message}`);
            alert(`OCR Failed: ${error.message}`);
            return null;
        }
    }

    function logToUI(msg) {
        const log = document.getElementById('debugLog');
        if (log) {
            log.innerHTML += `<div>${new Date().toLocaleTimeString()} - ${msg}</div>`;
            log.scrollTop = log.scrollHeight;
        }
        console.log(msg);
    }


    return {
        analyze: analyzeImage
    };

})();

window.OCRManager = OCRManager;
