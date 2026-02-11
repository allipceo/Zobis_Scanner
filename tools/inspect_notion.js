const https = require('https');

const NOTION_KEY = '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';
const DATABASE_ID = 'ffcc68c306ce47e2b58541c42d53a5f4';

const options = {
    hostname: 'api.notion.com',
    path: `/v1/databases/${DATABASE_ID}`,
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        if (res.statusCode === 200) {
            const db = JSON.parse(data);
            console.log('Database Title:', db.title[0]?.plain_text);
            console.log('Properties:', JSON.stringify(db.properties, null, 2));
        } else {
            console.error('Error:', res.statusCode, data);
        }
    });
});

req.on('error', (e) => {
    console.error('Request error:', e);
});

req.end();
