<script lang="ts">
  export let data

  let email = data.email

  async function updateIt() {
    await fetch(`/api/?id=${data.id}&email=${email}`)
  }
</script>

<h1>{data.id}</h1>

<dl>
  <dt>form number</dt>
  <dd>{data.deets.formNum}</dd>

  <dt>form title</dt>
  <dd>{data.deets.formTitle}</dd>

  <dt>status code</dt>
  <dd>
    <mark>
      {data.deets.actionCodeText}
    </mark>
  </dd>

  <dt>status description</dt>
  <dd>{data.deets.actionCodeDesc}</dd>
</dl>

<hr />

<p>get notified on status change</p>

<input
  type="email"
  bind:value={email}
  placeholder="email"
  on:keydown={(e) => {
    if (e.code !== "Enter") return
    updateIt()
  }}
/>
