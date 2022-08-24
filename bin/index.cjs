#! /usr/bin/env node
const chalk = require('chalk');
const PackageJson = require('@npmcli/package-json');
const readline = require('readline');
const shell = require('shelljs');
const { Snippet } = require('enquirer');
const validatePackageName = require('validate-npm-package-name');

const SUCCESS_CODE = 0;
const ERROR_CODE = 1;

const SCRIPT_STEPS = [
  validateEnvironment,
  cloneRepository,
  installDependencies,
  runSetup,
  cleanup,
  displayInstructions
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = query => new Promise(resolve => rl.question(query, resolve));

let projectName = '';

const setupSnippet = new Snippet({
  name: 'package.json',
  message: 'Fill out the fields in package.json',
  required: true,
  template: `{
  "description": "\${description}",
  "version": "\${version:0.0.1}",
  "author": "\${author_name} <\${author_email}> (https://github.com/\${username})"
}
`
});

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

async function updatePackageJson(data) {
  try {
    const pkgJson = await PackageJson.load('./');
    pkgJson.update(data);
    await pkgJson.save();
  } catch {
    exitOnError('Error updating package.json');
  }
}

async function validateEnvironment() {
  if (!shell.which('git')) {
    exitOnError('Sorry, this script requires git');
  }

  if (!shell.which('node') || !shell.which('npm')) {
    exitOnError('Sorry, this script requires node & npm');
  }
}

async function cloneRepository() {
  shell.echo(prettifyStepTitle('1/4 Cloning respository'));

  projectName = await getPackageName();

  const cloneCommand = shell.exec(`git clone --depth 1 https://github.com/ExtensionEngine/tce-template-svelte ${projectName}`);
  shell.cd(`./${projectName}`);
  await updatePackageJson({ name: projectName });

  if (cloneCommand.code !== SUCCESS_CODE) {
    exitOnError('Cloning respository failed');
  }
}

async function getPackageName() {
  let name = '';
  let isNameValid = true;

  shell.echo(chalk.gray('The provided name must be a valid NPM package name.'));
  name = await prompt('Enter the name of the project to create: ');
  isNameValid = validatePackageName(name).validForNewPackages;

  if (!isNameValid) {
    shell.echo(prettifyErrorMessage('The entered name is invalid'));
    return getPackageName();
  }

  return name;
}

async function installDependencies() {
  shell.echo(prettifyStepTitle('\n2/4 Installing dependencies'));
  if (shell.exec('npm install').code !== SUCCESS_CODE) {
    exitOnError('Installing dependencies via npm failed');
  }
}

async function runSetup() {
  shell.echo(prettifyStepTitle('\n3/4 Setting up project'));
  try {
    const answer = await setupSnippet.run();
    shell.echo(answer.result);
    await updatePackageJson(JSON.parse(answer.result));
  } catch {
    exitOnError('Project setup failed');
  }
}

async function cleanup() {
  shell.echo(prettifyStepTitle('\n4/4 Cleanup'));
  await updatePackageJson({
    dependencies: {}
  });
  const deleteGitCommand = shell.exec('rm -rf .git');
  const deleteBinCommand = shell.exec('rm -rf bin');

  if (deleteGitCommand.code !== SUCCESS_CODE || deleteBinCommand.code !== SUCCESS_CODE) {
    exitOnError('Cleanup failed');
  }
}

function displayInstructions() {
  shell.echo(chalk.green('Done!\n'));
  shell.echo('Your next steps are:');
  shell.echo(chalk.blue(`📂 cd ${projectName}`));
  shell.echo(`🚀 Start development server with ${chalk.blue('npm run dev')}`);
}

async function executeScript() {
  for (const step of SCRIPT_STEPS) {
    await step();
  }

  shell.exit(SUCCESS_CODE);
}

executeScript();
