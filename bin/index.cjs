#! /usr/bin/env node
const chalk = require('chalk');
const { execFileSync } = require('child_process');
const PackageJson = require('@npmcli/package-json');
const readline = require('readline');
const shell = require('shelljs');

const SUCCESS_CODE = 0;
const ERROR_CODE = 1;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = query => new Promise(resolve => rl.question(query, resolve));

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

async function cloneRepository() {
  shell.echo(prettifyStepTitle('1/3 Cloning respository'));
  const name = await prompt('Enter the name of the project to create: ');

  const cloneCommand = shell.exec(`git clone --depth 1 https://github.com/ExtensionEngine/tce-template-svelte ${name}`);
  shell.cd(`./${name}`);
  shell.exec('rm -rf .git');

  const pkgJson = await PackageJson.load('./');
  pkgJson.update({ name });
  await pkgJson.save();

  if (cloneCommand.code !== SUCCESS_CODE) {
    exitOnError('Cloning respository failed');
  }
}

async function installDependencies() {
  shell.echo(prettifyStepTitle('2/3 Installing dependencies'));
  if (shell.exec('npm install').code !== SUCCESS_CODE) {
    exitOnError('Installing dependencies via npm failed');
  }
}

async function runSetup() {
  shell.echo(prettifyStepTitle('3/3 Setting up project'));
  try {
    execFileSync('npm', ['run', 'setup'], { stdio: 'inherit' });
  } catch {
    exitOnError('Project setup failed');
  }
}

async function executeScript() {
  if (!shell.which('git')) {
    exitOnError('Sorry, this script requires git');
  }

  if (!shell.which('node') || !shell.which('npm')) {
    exitOnError('Sorry, this script requires node & npm');
  }

  await cloneRepository();
  await installDependencies();
  await runSetup();

  shell.exit(SUCCESS_CODE);
}

executeScript();
