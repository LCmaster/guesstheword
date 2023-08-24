<script>
  import "../app.postcss";
  import "iconify-icon";
</script>

<header class="mt-2 container mx-auto">
  <div class="flex justify-between">
    <div
      class="w-8 h-8 p-1 flex justify-center items-center rounded-md border-solid border-black border-2"
    >
      <iconify-icon icon="mdi:help" />
    </div>
    <h1 class="font-bold text-lg uppercase">Guesstheword</h1>
    <div
      class="w-8 h-8 p-1 flex justify-center items-center rounded-md border-solid border-black border-2"
    >
      <iconify-icon icon="mdi:gear" />
    </div>
  </div>
</header>

<main class="mt-4 container mx-auto">
  <slot />
</main>
