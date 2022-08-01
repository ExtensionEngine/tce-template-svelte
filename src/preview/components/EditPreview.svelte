<script lang="ts">
  import { Cell, InnerGrid } from '@smui/layout-grid';
  import Edit from '../../content-element/edit/index.svelte';
  import TopToolbar from '../../content-element/edit/TopToolbar.svelte';
  import SideToolbar from '../../content-element/edit/SideToolbar.svelte';
</script>

<Cell span={6}>
  <InnerGrid>
    <Cell span={12}>
      <h2>Edit preview</h2>
      <Edit />
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
</Cell>
