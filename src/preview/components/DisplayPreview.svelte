<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Cell } from '@smui/layout-grid';
  import type { CommonProps } from '../typings';
  import Display from '../../content-element/display/index.svelte';

  const dispatch = createEventDispatcher();

  export let commonProps: CommonProps;
  // Set the props based on display component's interface
  $: displayProps = {
    ...commonProps
  };

  function onUpdate(data: CustomEvent<CommonProps>) {
    dispatch('update-common', data);
  }
</script>

<Cell span={6}>
  <h2>Display preview</h2>
  <Display {...displayProps} on:update={onUpdate} />
</Cell>
