<script lang="ts">
  import LayoutGrid from '@smui/layout-grid';
  import type { TopAppBarComponentDev } from '@smui/top-app-bar';
  import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
  import EditPreview from './components/EditPreview.svelte';
  import DisplayPreview from './components/DisplayPreview.svelte';

  let topAppBar: TopAppBarComponentDev;
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
        <EditPreview />
        <DisplayPreview />
      </LayoutGrid>
    </AutoAdjust>
</main>
