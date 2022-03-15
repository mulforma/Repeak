<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export const load = async ({ url }) => ({ props: { url } });
</script>

<script lang="ts">
    import '../tailwind.css'
    import PageTransition from "$lib/components/PageTransition.svelte";

    export let url;
</script>

<PageTransition refresh={url}>
  <slot/>
</PageTransition>