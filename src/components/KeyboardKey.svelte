<script lang="ts">
  export let isPressed: boolean;
  export let disabled = false;
  export let hint: string;
  export let key: string;
</script>

<button
  on:mousedown
  on:mouseup
  {disabled}
  style:grid-column={key === "ENTER" ? "span 3" : "auto"}
  style:border-color={disabled || hint === "I" ? "dimgray" : "black"}
  style:background-color={disabled || hint === "I"
    ? "gray"
    : isPressed
    ? "PeachPuff"
    : "white"}
  class={`text-md md:text-xl rounded-md border-solid border-black border-2`}
  >{#if key === "BACKSPACE"}
    <iconify-icon icon="mdi:backspace" />
  {:else if key === "ENTER"}
    <iconify-icon icon="uil:enter" />
  {:else}
    {key.toUpperCase()}
  {/if}</button
>
