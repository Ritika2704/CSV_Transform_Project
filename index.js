const fs = require('fs');
const csvParser = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');
const { transformRow } = require('./utils/transform');

const inputFile = 'sample_users_data.csv';
const outputFile = 'output.csv';

// CSV writer setup
const csvWriter = createObjectCsvWriter({
  path: outputFile,
  header: [
    { id: 'user_id', title: 'user_id' },
    { id: 'first_name', title: 'first_name' },
    { id: 'last_name', title: 'last_name' },
    { id: 'phone', title: 'phone' },
    { id: 'email', title: 'email' },
    { id: 'gender', title: 'gender' },
    { id: 'age_cataegory', title: 'age_cataegory' },
    { id: 'country', title: 'country' },
    { id: 'birthdate', title: 'birthdate' },
    { id: 'reg_date', title: 'reg_date' },
  ],
});

console.log('Reading CSV...');
const transformedData = [];

fs.createReadStream(inputFile)
  .pipe(csvParser())
  .on('data', (row) => {
    try {
      const transformedRow = transformRow(row);
      transformedData.push(transformedRow);
    } catch (error) {
      console.error('Error transforming row:', error);
    }
  })
  .on('end', () => {
    console.log('Transforming data...');
    csvWriter
      .writeRecords(transformedData)
      .then(() => console.log('Writing transformed CSV... Done!'))
      .catch((err) => console.error('Error writing CSV:', err));
  })
  .on('error', (err) => {
    console.error('Error reading CSV:', err);
  });
