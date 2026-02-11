const fs = require('fs');
const https = require('https');
const path = require('path');

const NOTION_KEY = process.env.NOTION_KEY || 'YOUR_NOTION_KEY_HERE';
const DATABASE_ID = 'ffcc68c306ce47e2b58541c42d53a5f4';

const ASSETS = [
    {
        name: 'Auth Manager (Google Login)',
        file: 'js/auth.js',
        type: 'Logic Core',
        desc: 'Google Identity Services(GIS) 기반 OAuth 2.0 인증 및 토큰 관리 모듈.',
        usage: 'AuthManager.init() 호출 후 AuthManager.login()으로 팝업 실행.'
    },
    {
        name: 'OCR Manager (Google Vision)',
        file: 'js/ocr.js',
        type: 'Logic Core',
        desc: '이미지 Base64 변환 및 Google Cloud Vision API를 통한 텍스트 추출 모듈.',
        usage: 'OCRManager.analyze(file) 호출 시 텍스트 반환.'
    },
    {
        name: 'Smart Parser (Regex)',
        file: 'js/parser.js',
        type: 'Utility',
        desc: '비정형 텍스트에서 정규식(Regex)을 사용하여 이름, 전화번호, 이메일, 직책 추출.',
        usage: 'SmartParser.parse(text) 호출 시 구조화된 객체 반환.'
    },
    {
        name: 'People Manager (Google Contacts)',
        file: 'js/people.js',
        type: 'Logic Core',
        desc: 'Google People API를 사용하여 구글 주소록에 연락처(이름, 전화, 이메일, 소속) 저장.',
        usage: 'PeopleManager.createContact(data) 호출.'
    }
];

async function registerAsset(asset) {
    console.log(`Registering ${asset.name}...`);

    // Read Code Content
    let codeContent = '';
    try {
        codeContent = fs.readFileSync(path.join(__dirname, '../', asset.file), 'utf8');
    } catch (e) {
        console.error(`Failed to read file ${asset.file}:`, e.message);
        codeContent = '// Error reading file';
    }

    // Truncate if too long for a single block (Notion limit is around 2000 chars for text, code blocks can be longer but safer to split? Code blocks handle large text well usually)
    // We will use one code block.

    const postData = JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: {
            "자산명": {
                title: [{ text: { content: asset.name } }]
            },
            "유형": {
                select: { name: asset.type }
            },
            "설명": {
                rich_text: [{ text: { content: asset.desc } }]
            },
            "버전": {
                rich_text: [{ text: { content: "1.0.0" } }]
            },
            "상태": {
                status: { name: "Active" }
            },
            "사용법": {
                rich_text: [{ text: { content: asset.usage } }]
            },
            "최종 승인일": {
                date: { start: new Date().toISOString().split('T')[0] }
            }
        },
        children: [
            {
                object: 'block',
                type: 'heading_2',
                heading_2: {
                    rich_text: [{ text: { content: 'Source Code' } }]
                }
            },
            {
                object: 'block',
                type: 'code',
                code: {
                    caption: [],
                    rich_text: [{ text: { content: codeContent.substring(0, 2000) } }], // Safety crop to avoid 400 if massive. Real files are small enough.
                    language: 'javascript'
                }
            }
        ]
    });

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'api.notion.com',
            path: '/v1/pages',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        }, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`Successfully registered: ${asset.name}`);
                    resolve();
                } else {
                    console.error(`Failed to register ${asset.name}: ${res.statusCode} ${responseBody}`);
                    reject(new Error(responseBody));
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Request error for ${asset.name}:`, e);
            reject(e);
        });

        req.write(postData);
        req.end();
    });
}

async function run() {
    for (const asset of ASSETS) {
        await registerAsset(asset);
        // creating a small delay to avoid rate limits
        await new Promise(r => setTimeout(r, 500));
    }
}

run();
