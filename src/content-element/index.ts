'use strict';

import type { DataInitializer, ElementManifest } from './typings';
import Display from './display/index.svelte';
import Edit from './edit/index.svelte';
import SideToolbar from './edit/SideToolbar.svelte';
import TopToolbar from './edit/TopToolbar.svelte';

/**
 * Methods used to create the initial states of the element by declaring the
 * defaults for the elements props. Do not need to be defined.
 */
const initState: DataInitializer = () => ({});

/**
 * The fields that need to be customized are:
 * name: a string that is displayed to a user in the editor
 * ui->icon: a string representing the name of the MDI (https://materialdesignicons.com/)
 * icon that is displayed to the user in the editor
 * ui->forceFullWidth: a boolean value which defines if the element can only be
 * added as full width element
 */

const manifest: ElementManifest = {
  type: 'CUSTOM_ELEMENT', // a unique string used by Tailor to identify this element
  version: '1.0',
  name: 'Custom element',
  initState,
  Edit,
  TopToolbar,
  SideToolbar,
  Display,
  ui: {
    icon: 'mdi-help-circle',
    forceFullWidth: true
  }
};

export default manifest;
