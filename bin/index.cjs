#! /usr/bin/env node
const chalk = require('chalk');
const { execFileSync } = require('child_process');
const shell = require('shelljs');

const SUCCESS_CODE = 0;
const ERROR_CODE = 1;

function exitOnError(errorMessage) {
  shell.echo(prettifyErrorMessage(errorMessage));
  shell.exit(ERROR_CODE);
}

function prettifyStepTitle(title) {
  return chalk.blue.bold(title);
}

function prettifyErrorMessage(errorMessage) {
  return chalk.bgRed.bold(errorMessage);
}

if (!shell.which('git')) {
  exitOnError('Sorry, this script requires git');
}

if (!shell.which('node') || !shell.which('npm')) {
  exitOnError('Sorry, this script requires node & npm');
}

shell.echo(prettifyStepTitle('1/3 Cloning respository'));
const cloneCommand = shell.exec('git clone --depth 1 https://github.com/ExtensionEngine/tailor-content-element');
shell.cd('./tailor-content-element');
shell.exec('rm -rf .git');
if (cloneCommand.code !== SUCCESS_CODE) {
  exitOnError('Cloning respository failed');
}

shell.echo(prettifyStepTitle('2/3 Installing dependencies'));
if (shell.exec('npm install').code !== SUCCESS_CODE) {
  exitOnError('Installing dependencies via npm failed');
}

shell.echo(prettifyStepTitle('3/3 Setting up project'));
try {
  execFileSync('npm', ['run', 'setup'], { stdio: 'inherit' });
} catch {
  exitOnError('Project setup failed');
}
