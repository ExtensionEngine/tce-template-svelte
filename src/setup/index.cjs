const PackageJson = require('@npmcli/package-json');
const { Snippet } = require('enquirer');

const prompt = new Snippet({
  name: 'package.json',
  message: 'Fill out the fields in package.json',
  required: true,
  template: `{
  "name": "\${name}",
  "description": "\${description}",
  "version": "\${version:0.0.1}",
  "author": "\${author_name} <\${author_email}> (https://github.com/\${username})"
}
`
});

async function executeSetup() {
  const pkgJson = await PackageJson.load('./');
  try {
    const answer = await prompt.run();
    console.log('Answer:', answer.result);

    pkgJson.update(JSON.parse(answer.result));
    await pkgJson.save();
  } catch {
    console.error('Error running setup prompt');
  }
}

executeSetup();
