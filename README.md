# tailor-content-element

Template project to quickly get started developing custom content elements.

> **:warning: DISCLAIMER**
> The project is in early prototype phase. More info will be added later.

## Description

This project is a starting point used for developing custom content elements
for [Tailor](https://github.com/ExtensionEngine/tailor).
It is intended to get you up and running quickly by bootstraping the application
structure and setting base default properties.
Element preview in both edit and display modes will be supported.

## Setup

The project is already preconfigured with certain defaults,
however it is necessary to go through some properties and modify the values
for the purposes of your specific custom content element.

#### `package.json`

Change `name` and `description `properties to reflect your custom element.
Also, take a look at `main`, `module` and `export` properties. These define the
output files of the build process, so change the name of those files accordingly.
These names also have to defined in `vite.config.ts` file as well.

#### `vite.config.ts`

As mentioned in the previous step, change `name` and `fileName` properties to define
the name of the output files from the building process.

#### `content-element` folder

Add code for the edit state of your element to `edit/index.svelte` file. In the same
manner add code for the display state to `display/index.svelte` file. You can choose
any kind of component composition, however only one root `Edit` and `Display` component
can be exposed as a part of the element's interface.
Make sure to edit the relevant properties in `index.ts` file.

#### `preview` folder

The intent of the previewer is to provide a quick preview of the custom content element
without the need to use Tailor or any other external system. That way, you're able
to get early feedback on the element you're building and test it in isolation.
Previewer supports sharing common properties between edit and display states if those exist.
Look for the comments and placeholders in the code to wire up the components.

#### Used technologies

The project currently uses Svelte, Vite and Svelte Material UI.
