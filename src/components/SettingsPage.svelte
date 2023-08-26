<script>
  import { theme } from "$lib/store";

  let systemTheme = $theme === "system";
  let darkMode = $theme === "dark";

  $: theme.set(systemTheme ? "system" : darkMode ? "dark" : "light");
</script>

<div class="w-full flex justify-between">
  <label for="theme">Use System Theme</label>
  <input type="checkbox" id="theme" name="theme" bind:checked={systemTheme} />
</div>

<div class="w-full flex justify-between">
  <label for="mode">Dark Mode</label>
  <input
    type="checkbox"
    id="mode"
    name="mode"
    disabled={systemTheme}
    bind:checked={darkMode}
  />
</div>
