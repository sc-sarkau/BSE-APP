const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const SensexData = require('./models/SensexData');

function parseDate(dateStr) {
  const [day, monthName, year] = dateStr.split('-');
  const monthIndex = new Date(`${monthName} 1, 2000`).getMonth();
  return new Date(Date.UTC(parseInt(year), monthIndex, parseInt(day)));
}


function importCsvData() {
  const csvPath = path.join(__dirname, 'data.csv');
  const records = [];

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => {
      const { Date: dateStr, Open, Close } = row;
      records.push({
        date: parseDate(dateStr),
        open: parseFloat(Open),
        close: parseFloat(Close)
      });
    })
    .on('end', async () => {
      records.sort((a, b) => b.date - a.date);

      try {
        // await SensexData.deleteMany({});
        await SensexData.insertMany(records);
        console.log('CSV data imported successfully.');
      } catch (err) {
        console.error('Error importing CSV data:', err);
      }
    });
}

module.exports = importCsvData;
