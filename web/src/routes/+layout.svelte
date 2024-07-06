<script lang="ts">
  import { Legal } from "@devidw/components/index.js"
  import "uno.css"
</script>

<div>
  <slot />
</div>

<Legal />

<style>
  :global(body) {
    background: black;
    color: gold;
  }

  :global(a) {
    text-decoration: none;
  }

  div {
    width: 320px;
    margin-left: auto;
    margin-right: auto;
  }

  :global(input) {
    background: transparent;
    color: gold;
    font-family: serif;
    padding: 0.25rem 0.5rem;
    border-color: gold;
  }
</style>
