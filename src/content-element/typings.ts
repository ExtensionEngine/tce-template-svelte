import type { SvelteComponent } from 'svelte';

export interface EditState {

}

export interface CustomElementConfig {
  type: string;
  version: string;
  name: string;
  initState: () => EditState;
  Edit: typeof SvelteComponent;
  TopToolbar: typeof SvelteComponent;
  SideToolbar: typeof SvelteComponent;
  Display: typeof SvelteComponent;
  ui: {
    icon: string;
    forceFullWidth: boolean;
  }
}
