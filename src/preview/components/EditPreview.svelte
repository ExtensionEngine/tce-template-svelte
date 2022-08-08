<script lang="ts">
  import { Cell, InnerGrid } from '@smui/layout-grid';
  import { createEventDispatcher } from 'svelte';
  import type { ElementData } from '../../content-element/typings';
  import Edit from '../../content-element/edit/index.svelte';
  import SideToolbar from '../../content-element/edit/SideToolbar.svelte';
  import TopToolbar from '../../content-element/edit/TopToolbar.svelte';

  const dispatch = createEventDispatcher();

  export let elementData: ElementData;
  // Set the props based on edit component's interface
  $: editProps = {
    ...elementData
  };

  function onSave(data: CustomEvent<ElementData>) {
    dispatch('save', data.detail);
  }

  function onDelete() {
    dispatch('delete');
  }
</script>

<InnerGrid>
  <Cell span={12}>
    <h2>Edit preview</h2>
    <Edit 
      {...editProps} 
      on:save={onSave} 
      on:delete={onDelete} 
    />
  </Cell>
</InnerGrid>
<InnerGrid>
  <Cell span={12}>
    <h3>Top toolbar</h3>
    <TopToolbar />
  </Cell>
</InnerGrid>
<InnerGrid>
  <Cell span={12}>
    <h3>Side toolbar</h3>
    <SideToolbar />
  </Cell>
</InnerGrid>
