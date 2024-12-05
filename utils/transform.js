const moment = require('moment');
let userIdCounter = 1; 

function transformRow(row) {
  return {
    user_id: row['user_id'] || `CUST-${userIdCounter++}`, // Auto-generate 
    first_name: row['first name'] || '',
    last_name: row['last name'] || '',
    phone: row['phone'] || '',
    email: row['email address'] || '',
    gender: row['gender'] || '',
    age_cataegory: row['Age_Category'] || '',
    country: row['Country Residence'] || '',
    birthdate: formatDate(row['Birth date']),
    reg_date: formatDate(row['Registration Date']),
  };
}

function formatDate(dateString) {
  if (!dateString) return '';
  return moment(dateString, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD');
}

module.exports = { transformRow };
