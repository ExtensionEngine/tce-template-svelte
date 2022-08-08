<script lang="ts">
  'use strict';
  
  import TopAppBar, { AutoAdjust, Row, Section, Title } from '@smui/top-app-bar';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import type { TopAppBarComponentDev } from '@smui/top-app-bar';
  import DisplayPreview from './components/DisplayPreview.svelte';
  import EditPreview from './components/EditPreview.svelte';
  import type { ElementData } from '../content-element/typings';
  import manifest from '../content-element/index';

  let topAppBar: TopAppBarComponentDev;

  // Props shared between edit and display components
  let elementData: ElementData = manifest.initState();

  function saveElementData(data: CustomEvent<ElementData>) {
    elementData = data.detail;
  }

  function deleteElementData() {
    elementData = {};
  }
</script>

<main>
  <TopAppBar bind:this={topAppBar} variant="standard">
    <Row>
      <Section>
        <Title>Tailor content element preview</Title>
      </Section>
    </Row>
  </TopAppBar>
  <AutoAdjust {topAppBar}>
    <LayoutGrid>
      <Cell span={6}>
        <EditPreview 
          {elementData} 
          on:save={saveElementData}
          on:delete={deleteElementData}
        />
      </Cell>
      <Cell span={6}>
        <DisplayPreview {elementData} on:save={saveElementData} />
      </Cell>
    </LayoutGrid>
  </AutoAdjust>
</main>
