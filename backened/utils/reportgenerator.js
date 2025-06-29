function generateHtmlReport(url, axeResults, lhResult) {
  const axeViolations = axeResults.violations.map(v => `
    <div class="violation">
      <h3>${v.help}</h3>
      <p><strong>Description:</strong> ${v.description}</p>
      <p><strong>Impact:</strong> <span class="badge ${v.impact}">${v.impact}</span></p>
      <p><strong>Affected Nodes:</strong></p>
      <ul>
        ${v.nodes.map(n => `<li><code>${n.target.join(', ')}</code></li>`).join('')}
      </ul>
    </div>
  `).join('');

  const lhScore = lhResult.categories.accessibility.score * 100;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Accessibility Report</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          background: #f9f9f9;
          padding: 40px;
          color: #333;
        }
        h1, h2 {
          color: #222;
          border-bottom: 2px solid #ddd;
          padding-bottom: 4px;
        }
        .score {
          font-size: 1.5em;
          color: #007acc;
        }
        .violation {
          background: #fff;
          border-left: 6px solid #d9534f;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 6px;
        }
        .badge {
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: bold;
          color: white;
          text-transform: capitalize;
        }
        .minor { background-color: #5bc0de; }
        .moderate { background-color: #f0ad4e; }
        .serious { background-color: #d9534f; }
        .critical { background-color: #c9302c; }
        code {
          background: #eee;
          padding: 2px 5px;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <h1>Accessibility Report</h1>
      <p><strong>Scanned URL:</strong> <a href="${url}" target="_blank">${url}</a></p>
      <h2>Lighthouse Accessibility Score: <span class="score">${lhScore}</span></h2>
      <h2>axe-core Violations (${axeResults.violations.length} found)</h2>
      ${axeViolations || '<p>No violations found 🎉</p>'}
    </body>
    </html>
  `;
}


module.exports = { generateHtmlReport };