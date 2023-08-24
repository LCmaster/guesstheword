<script>
  import Keyboard from "../components/Keyboard.svelte";
  import WordBoard from "../components/WordBoard.svelte";

  export let data;
</script>

<div class="flex flex-col gap-4">
  <WordBoard />
  <Keyboard />
</div>
