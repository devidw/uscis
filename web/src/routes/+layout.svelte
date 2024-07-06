<script lang="ts"></script>

<div>
  <slot />
</div>

<style>
  :global(body) {
    background: black;
    color: gold;
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
