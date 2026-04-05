const fs = require('fs');
const https = require('https');

// 1. sensitive.env에서 키 읽기
const envContent = fs.readFileSync('sensitive.env', 'utf8');
const apiKeyMatch = envContent.match(/GOOGLE_API_KEY=(.+)/);
if (!apiKeyMatch) {
    console.error('Error: API Key not found in sensitive.env');
    process.exit(1);
}
const apiKey = apiKeyMatch[1].trim();

// 2. 테스트 이미지 로드 (명함_김성배.jpg)
const imagePath = '명함_김성배.jpg';
if (!fs.existsSync(imagePath)) {
    console.error(`Error: Image ${imagePath} not found`);
    process.exit(1);
}
const base64Image = fs.readFileSync(imagePath).toString('base64');

// 3. Vision API 요청 구성
const payload = JSON.stringify({
    requests: [{
        image: { content: base64Image },
        features: [{ type: 'TEXT_DETECTION' }]
    }]
});

const options = {
    hostname: 'vision.googleapis.com',
    path: `/v1/images:annotate?key=${apiKey}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
    }
};

// 4. API 호출
console.log(`Sending request to Vision API with key ${apiKey.substring(0, 5)}...`);
const req = https.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
        if (res.statusCode === 200) {
            const result = JSON.parse(responseData);
            const text = result.responses[0]?.fullTextAnnotation?.text || 'No text found';
            console.log('\n--- OCR SUCCESS! ---');
            console.log('Extracted Text Preview:');
            console.log(text.substring(0, 200) + '...');
            console.log('--- END ---');
        } else {
            console.error(`\n--- OCR FAILED ---`);
            console.error(`Status Code: ${res.statusCode}`);
            console.error(`Response: ${responseData}`);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(payload);
req.end();
