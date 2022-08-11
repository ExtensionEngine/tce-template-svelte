#! /usr/bin/env node
const shell = require('shelljs');

const SUCCESS_CODE = 0;
const ERROR_CODE = 1;

function exitOnError(errorMessage) {
  shell.echo(errorMessage);
  shell.exit(ERROR_CODE);
}

if (!shell.which('git')) {
  exitOnError('Sorry, this script requires git');
}

if (!shell.which('degit')) {
  exitOnError('Sorry, this script requires degit');
}

if (!shell.which('node') || !shell.which('npm')) {
  exitOnError('Sorry, this script requires node & npm');
}

shell.echo('Cloning respository');
if (shell.exec('degit https://github.com/ExtensionEngine/tailor').code !== SUCCESS_CODE) {
  exitOnError('Cloning respository via degit failed');
}

shell.echo('Installing dependencies');
if (shell.exec('npm install').code !== SUCCESS_CODE) {
  exitOnError('Installing dependencies via npm failed');
}

shell.echo('Setting up project');
if (shell.exec('npm run setup').code !== SUCCESS_CODE) {
  exitOnError('Project setup failed');
}
