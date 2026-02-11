const fs = require('fs');
const https = require('https');
const path = require('path');

const NOTION_KEY = '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';
const DATABASE_ID = 'ffcc68c306ce47e2b58541c42d53a5f4';

async function registerProcessDoc() {
    const filePath = path.join(__dirname, '../docs/ZOBIS_Project_Assets.md');
    const assetName = 'ZOBIS 프로젝트 개발 회고 및 가이드 (Project Retrospective)';

    console.log(`Reading ${filePath}...`);
    let content = '';
    try {
        content = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        console.error('Failed to read file:', e);
        return;
    }

    console.log(`Registering to Notion...`);

    const postData = JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: {
            "자산명": {
                title: [{ text: { content: assetName } }]
            },
            "유형": {
                select: { name: "Template" } // Using Template as it is a document structure
            },
            "설명": {
                rich_text: [{ text: { content: "ZOBIS Name Card Scanner 프로젝트의 전체 개발 과정, 이슈 로그, 자산화 리포트 문서." } }]
            },
            "버전": {
                rich_text: [{ text: { content: "1.0.0" } }]
            },
            "상태": {
                status: { name: "Active" }
            },
            "사용법": {
                rich_text: [{ text: { content: "참조용 문서 (Reference)" } }]
            },
            "최종 승인일": {
                date: { start: new Date().toISOString().split('T')[0] }
            }
        },
        children: [
            {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    rich_text: [{ text: { content: '아래 내용은 ZOBIS_Project_Assets.md 원본입니다.' } }]
                }
            },
            {
                object: 'block',
                type: 'code',
                code: {
                    caption: [],
                    rich_text: [{ text: { content: content.substring(0, 2000) } }],
                    language: 'markdown'
                }
            },
            // Since the content might be long, we might want to split or just add a link, 
            // but for now, the summary code block is enough as an asset record.
            // The user already put the content in Notion manually/will do so, 
            // but this record tracks *that* the asset exists.
        ]
    });

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
                console.log(`Successfully registered: ${assetName}`);
            } else {
                console.error(`Failed to register: ${res.statusCode} ${responseBody}`);
            }
        });
    });

    req.on('error', (e) => {
        console.error('Request error:', e);
    });

    req.write(postData);
    req.end();
}

registerProcessDoc();
