const replace = require('replace-in-file');
const options = {
  files: [
    'dist/*.html',
  ],

  // Replacement to make (string or regex)
  from: /\/dist\/globalpayments/g,
  to: 'globalpayments',
};
replace(options)
  .then(changedFiles => {
    console.log('Modified files:', changedFiles.map(f => f.file).join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
