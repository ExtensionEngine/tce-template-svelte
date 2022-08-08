<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ElementData } from '../../content-element/typings';
  import Display from '../../content-element/display/index.svelte';

  const dispatch = createEventDispatcher();

  export let elementData: ElementData;
  // Set the props based on display component's interface
  $: displayProps = {
    ...elementData
  };

  function onSave(data: CustomEvent<ElementData>) {
    dispatch('save', data);
  }
</script>

<h2>Display preview</h2>
<Display {...displayProps} on:save={onSave} />
