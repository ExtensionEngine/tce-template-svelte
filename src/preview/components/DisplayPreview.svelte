<script lang="ts">
  import type { ElementData } from '../../content-element/typings';
  import Display from '../../content-element/display/index.svelte';

  export let elementData: ElementData;
  // Set the props based on display component's interface
  $: displayProps = {
    ...elementData
  };
</script>

<h2>Display preview</h2>
<Display {...displayProps} />
