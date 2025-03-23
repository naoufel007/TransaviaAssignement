const fs = require('fs');
const { extractStyle } = require('@ant-design/static-style-extract');

const outputPath = './antd.min.css';

const css = extractStyle();

fs.writeFileSync(outputPath, css);

console.log(`🎉 Antd CSS generated at ${outputPath}`);