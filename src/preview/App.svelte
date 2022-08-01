<script lang="ts">
  import LayoutGrid from '@smui/layout-grid';
  import type { TopAppBarComponentDev } from '@smui/top-app-bar';
  import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
  import EditPreview from './components/EditPreview.svelte';
  import DisplayPreview from './components/DisplayPreview.svelte';
  import type { CommonProps } from './typings';

  let topAppBar: TopAppBarComponentDev;

  // Props shared between edit and display components
  let commonProps: CommonProps = {
  };

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
