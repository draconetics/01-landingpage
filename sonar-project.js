const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner({
  serverUrl: 'http://localhost:9000',
  options : {
  'sonar.sources': '.',
  'sonar.inclusions' : 'src/**' // Entry point of your code
  }
}, () => {});

// const sonarqubeScanner =  require('sonarqube-scanner');
// sonarqubeScanner(
//     {
//         serverUrl:  'http://localhost:9001',
//         options : {
//             'sonar.sources':  'src',
//             'sonar.tests':  'src',
//             'sonar.inclusions'  :  '**', // Entry point of your code
//             'sonar.test.inclusions':  'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
//             'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
//             'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
//         }
//     }, () => {});

// module.exports  = server;