/**
 * AG_Test02 - Smart Parser
 * Extracts structured data (Name, Phone, Email, etc.) from raw text
 */

const SmartParser = (() => {

    // Regex Patterns
    const PATTERNS = {
        email: /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/,
        // Matches: 010-1234-5678, 82-10-1234-5678, +82 10 1234 5678
        mobile: /(010|82-10|\+82\s?10)[- .]?\d{3,4}[- .]?\d{4}/,
        company_keywords: /(주식회사|\(주\)|inc\.|corp\.|co\.|ltd\.|company)/i,
        job_keywords: /(대표|이사|부사장|팀장|과장|대리|사원|매니저|CEO|CTO|Manager|Director|President|Partner)/i,
        name_candidate: /^[가-힣]{3}$/ // Simple 3-char Korean name check
    };

    /**
     * Parse the raw text into a structured object
     * @param {string} text 
     */
    function parse(text) {
        if (!text) return null;

        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const result = {
            name: '',
            company: '',
            job: '',
            mobile: '',
            email: ''
        };

        // 1. Extract Mobile & Email first (High confidence)
        const emailMatch = text.match(PATTERNS.email);
        if (emailMatch) result.email = emailMatch[0];

        const mobileMatch = text.match(PATTERNS.mobile);
        if (mobileMatch) result.mobile = mobileMatch[0].replace(/[ .]/g, '-').replace(/^82-/, '0'); // Normalize

        // 2. Iterate lines for Contextual parsing (Name, Job, Company)
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Company Detection
            if (!result.company && PATTERNS.company_keywords.test(line)) {
                result.company = line;
                continue;
            }

            // Job Detection
            if (!result.job && PATTERNS.job_keywords.test(line)) {
                result.job = line;

                // Heuristic: Name is often near the job title (same line or previous line)
                if (!result.name) {
                    // Check previous line for name candidate
                    if (i > 0 && lines[i - 1].length <= 4 && !PATTERNS.mobile.test(lines[i - 1]) && !PATTERNS.email.test(lines[i - 1])) {
                        result.name = lines[i - 1];
                    }
                    // Check if name is part of the job line (e.g., "Representative Hong Gildong")
                    // This is hard, skipping for now.
                }
                continue;
            }

            // Fallback Name Detection (if simple 3 chars and seemingly isolated)
            if (!result.name && PATTERNS.name_candidate.test(line)) {
                result.name = line;
            }
        }

        console.log('Parsed Result:', result);
        return result;
    }

    return {
        parse: parse
    };
})();

window.SmartParser = SmartParser;
