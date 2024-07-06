<script lang="ts">
  import { goto } from "$app/navigation"

  let id = typeof window !== "undefined" ? localStorage.getItem("id") ?? "" : ""

  $: if (typeof window !== "undefined") {
    localStorage.setItem("id", id)
  }
</script>

<input
  type="text"
  minlength="13"
  maxlength="13"
  placeholder="case number"
  bind:value={id}
  on:keydown={(e) => {
    if (e.code !== "Enter") return
    goto(`/${id}`)
  }}
/>
