# tailor-content-element

Template project to quickly get started developing custom content elements.

> **:warning: DISCLAIMER**
> The project is in early prototype phase. More info will be added later.

## Description

This project is a starting point used for developing custom content elements
for [Tailor](https://github.com/ExtensionEngine/tailor).
It is intended to get you up and running quickly by bootstraping the application
structure and setting base default properties.

## Requirements

- Node & npm
- [degit](https://github.com/Rich-Harris/degit)

## Setup

The project is already preconfigured with certain defaults,
however it is necessary to go through some properties and modify the values
for the purposes of your specific custom content element.

#### Instructions

1. Clone the repo by executing `degit https://github.com/ExtensionEngine/tailor-content-element`
2. Install dependencies `npm install`
3. Setup project by running `npm run setup`

#### `content-element` folder

##### Folder structure
<ul>
  <li>index.ts - contains custom element manifest</li>
  <li>typings.ts - contains TypeScript type definitions</li>
  <li>display subfolder
    <ul>
      <li>index.ts - main file for the display version on the content element</li>
    </ul>
  </li>
  <li>edit subfolder
    <ul>
      <li>index.ts - main file for the edit version of the content element</li>
      <li>TopToolbar.ts - file for top toolbar used in the edit version, optional</li>
      <li>SideToolbar.ts - file for side toolbar used in the edit version, optional</li>
    </ul>
  </li>
</ul>

Add code for the edit component of your element to `edit/index.svelte` file. If the element
supports them, you can also add code for top toolbar and side toolbar in the designated
files. In the same manner add code for the display component to `display/index.svelte` file. 
You can choose any kind of component composition, however only root `Edit` and `Display`
components can be exposed as a part of the element's interface. TypeScript types can be
added to support better developer experience and serve as a documentation for the element.
Use the `ElementData` interface in `typings.ts` file to specify and list the data that 
your element requires and manages. The `initState` function can optionally be specified 
to return the initial state of that data.
Make sure to edit the relevant properties of the manifest in `index.ts` file.

#### `preview` folder

The intent of the previewer is to provide a development environment outside
of Tailor CMS and other external systems. That way, you're able to get early 
feedback on the element you're building and test it in isolation.
Previewer supports sharing common properties between edit and display states if those exist.
Look for the comments and placeholders in the code to wire up the components.

#### Used technologies

The project currently uses Svelte, Vite and Svelte Material UI.
