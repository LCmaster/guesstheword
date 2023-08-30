<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let title: string;

  const dispatch = createEventDispatcher();
</script>

<div class="absolute top-16 left-32 right-32">
  <div class="w-full px-6 py-4 rounded-md bg-white">
    <div class="mb-4 flex justify-between items-center">
      <h2 class="w-full font-bold text-4xl capitalize">{title}</h2>
      <button on:click={() => dispatch("close")}>
        <iconify-icon icon="mdi:close" class="text-4xl" />
      </button>
    </div>
    <slot />
  </div>
</div>
