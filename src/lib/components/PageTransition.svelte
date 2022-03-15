<script>
  import { fly } from 'svelte/transition';
  export let refresh = '';
</script>

{#key refresh}
  <div
    in:fly="{{ x: 25, duration: 200, delay: 300 }}"
    out:fly="{{ x: -25, duration: 200 }}"
  >
    <slot />
  </div>
{/key}