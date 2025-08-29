<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import '../styles/main.less';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="stylesheet" href="/styles/main.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<SiteHeader />

<main>
  {@render children?.()}
</main>

<SiteFooter />
