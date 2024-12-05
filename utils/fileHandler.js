const fs = require('fs');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

async function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', () => resolve(rows))
      .on('error', (error) => reject(error));
  });
}

async function writeCsv(filePath, data, headers) {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: headers.map((header) => ({ id: header, title: header })),
  });
  await csvWriter.writeRecords(data);
}

module.exports = { readCsv, writeCsv };
