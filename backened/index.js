const express = require('express');
const cors = require('cors');
const path = require('path');
const { analyzeUrl, analyzeHtmlContent } = require('./analyze');
const { generateHtmlReport } = require('./utils/reportgenerator');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
    const { url } = req.body;
    try {
        const { axeResults, lhResult, screenshot } = await analyzeUrl(url);
        const htmlReport = await generateHtmlReport(url, axeResults, lhResult);

        const reportId = Date.now();
        const reportDir = path.join(__dirname, '../reports', `${reportId}`);
        fs.mkdirSync(reportDir, { recursive: true });

        fs.writeFileSync(`${reportDir}/axe.json`, JSON.stringify(axeResults, null, 2));
        fs.writeFileSync(`${reportDir}/lighthouse.json`, JSON.stringify(lhResult, null, 2));
        fs.writeFileSync(`${reportDir}/report.html`, htmlReport);
        fs.writeFileSync(`${reportDir}/screenshot.png`, screenshot);

        res.json({ reportId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/analyze-html', async (req, res) => {
    const { html } = req.body;

    if (!html) return res.status(400).json({ error: 'Missing HTML content' });

    try {
        const { axeResults, screenshot } = await analyzeHtmlContent(html);

        const reportId = Date.now();
        const reportDir = path.join(__dirname, '../reports', `${reportId}`);
        fs.mkdirSync(reportDir, { recursive: true });

        fs.writeFileSync(`${reportDir}/axe.json`, JSON.stringify(axeResults, null, 2));
        fs.writeFileSync(`${reportDir}/screenshot.png`, screenshot);

        const htmlReport = await generateHtmlReport('Provided HTML Snippet', axeResults, { categories: { accessibility: { score: 0 } } });
        fs.writeFileSync(`${reportDir}/report.html`, htmlReport);

        res.json({ reportId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/download/:reportId/:type', (req, res) => {
    const { reportId, type } = req.params;
    const fileMap = {
        axe: 'axe.json',
        lighthouse: 'lighthouse.json',
        html: 'report.html',
        screenshot: 'screenshot.png'
    };

    const filePath = path.join(__dirname, '../reports', reportId, fileMap[type]);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(5050, () => console.log('Server started on http://localhost:5050'));

process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
});
