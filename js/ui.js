/**
 * AG_Test02 - UI Manager
 * Handles Camera Input, Image Preview, and Form Interactions
 */

const UIManager = (() => {
    // DOM Elements
    const elements = {
        imageContainer: document.getElementById('imagePreviewContainer'),
        previewImg: document.getElementById('previewImg'),
        cameraInput: document.getElementById('cameraInput'),
        placeholder: document.querySelector('.placeholder'),
        btnReset: document.getElementById('btnReset'),
        inputs: document.querySelectorAll('.input-wrapper input')
    };

    /**
     * Initialize Event Listeners
     */
    function init() {
        console.log('UI Manager Initialized');

        // 1. Camera / Image Input
        elements.imageContainer.addEventListener('click', triggerCamera);
        elements.cameraInput.addEventListener('change', handleFileSelect);

        // 2. Form Interactions
        setupInputs();

        // 3. Action Buttons
        elements.btnReset.addEventListener('click', resetAll);
    }

    /**
     * Trigger hidden file input
     */
    function triggerCamera() {
        // Only trigger if no image is currently selected (or if user wants to replace, but maybe we keep it simple)
        // Actually, clicking the image should probably allow re-selection.
        elements.cameraInput.click();
    }

    /**
     * Handle File Selection
     */
    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageData = e.target.result;
            showPreview(imageData);

            // Trigger OCR
            if (window.OCRManager && window.SmartParser) {
                setLoading(true);
                const rawText = await window.OCRManager.analyze(imageData);
                setLoading(false);

                if (rawText) {
                    const parsedData = window.SmartParser.parse(rawText);
                    fillForm(parsedData);
                } else {
                    console.warn('No text found in image');
                }
            }
        };
        reader.readAsDataURL(file);
    }

    /**
     * Show Image Preview
     * @param {string} src - Data URL of the image
     */
    function showPreview(src) {
        elements.previewImg.src = src;
        elements.previewImg.classList.remove('hidden');
        elements.placeholder.classList.add('hidden');

        // Optional: Add a class to container to indicate active state
        elements.imageContainer.classList.add('has-image');
    }

    /**
     * Fill Form with Data
     * @param {Object} data 
     */
    function fillForm(data) {
        if (!data) return;

        document.getElementById('inputName').value = data.name || '';
        document.getElementById('inputCompany').value = data.company || '';
        document.getElementById('inputJob').value = data.job || '';
        document.getElementById('inputMobile').value = data.mobile || '';
        document.getElementById('inputEmail').value = data.email || '';
    }

    /**
     * Set Loading State
     * @param {boolean} isLoading 
     */
    function setLoading(isLoading) {
        if (isLoading) {
            elements.previewImg.style.opacity = '0.5';
            document.body.style.cursor = 'wait';
        } else {
            elements.previewImg.style.opacity = '1';
            document.body.style.cursor = 'default';
        }
    }

    /**
     * Setup Input Fields (Clear buttons)
     */
    function setupInputs() {
        elements.inputs.forEach(input => {
            const wrapper = input.parentElement;
            const clearBtn = wrapper.querySelector('.clear-btn');

            if (clearBtn) {
                clearBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent bubbling
                    input.value = '';
                    input.focus(); // Keep focus
                });
            }
        });
    }

    /**
     * Reset Everything
     */
    function resetAll() {
        // Reset Image
        elements.previewImg.src = '';
        elements.previewImg.classList.add('hidden');
        elements.placeholder.classList.remove('hidden');
        elements.cameraInput.value = ''; // Reset file input
        elements.imageContainer.classList.remove('has-image');

        // Reset Form
        elements.inputs.forEach(input => input.value = '');

        console.log('UI Reset Complete');
    }

    /**
     * Get current form data
     */
    function getFormData() {
        return {
            name: document.getElementById('inputName').value,
            company: document.getElementById('inputCompany').value,
            job: document.getElementById('inputJob').value,
            mobile: document.getElementById('inputMobile').value,
            email: document.getElementById('inputEmail').value
        };
    }

    return {
        init: init,
        fillForm: fillForm,
        setLoading: setLoading,
        getFormData: getFormData
    };
})();

// Export for global use
window.UIManager = UIManager;
