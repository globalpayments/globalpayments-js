const replace = require('replace-in-file');
const options = {
  files: [
    'src/assets/artifactVersion.txt',
    'src/lib/version.ts',
    'README.md',
  ],

  // Replacement to make (string or regex)
  from: /\d+\.\d+\.\d+/g,
  to: require('../package.json').version,
};
replace(options)
  .then(changedFiles => {
    console.log('Modified files:', changedFiles.map(f => f.file).join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
