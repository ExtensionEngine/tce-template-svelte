<script lang="ts">
  'use strict';
  
  import TopAppBar, { AutoAdjust, Row, Section, Title } from '@smui/top-app-bar';
  import LayoutGrid from '@smui/layout-grid';
  import type { TopAppBarComponentDev } from '@smui/top-app-bar';
  import type { CommonProps } from './typings';
  import DisplayPreview from './components/DisplayPreview.svelte';
  import EditPreview from './components/EditPreview.svelte';
  
  let topAppBar: TopAppBarComponentDev;

  // Props shared between edit and display components
  let commonProps: CommonProps = {};

  function updateCommonProps(data: CustomEvent<CommonProps>) {
    commonProps = data.detail;
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
      <EditPreview {commonProps} on:update-common={updateCommonProps} />
      <DisplayPreview {commonProps} on:update-common={updateCommonProps} />
    </LayoutGrid>
  </AutoAdjust>
</main>
