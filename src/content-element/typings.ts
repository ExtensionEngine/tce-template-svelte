'use strict';

import type { SvelteComponent } from 'svelte';

export interface ElementData {

}

export type DataInitializer = () => ElementData;

export interface ElementManifest {
  type: string;
  version: string;
  name: string;
  initState: DataInitializer;
  Edit: typeof SvelteComponent;
  TopToolbar: typeof SvelteComponent;
  SideToolbar: typeof SvelteComponent;
  Display: typeof SvelteComponent;
  ui: {
    icon: string;
    forceFullWidth: boolean;
  }
}
