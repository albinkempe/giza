<script lang="ts">
  export let text: string;
</script>

<div class="tooltip-container">
  <slot /> <!-- Whatever you wrap goes here -->
  <span class="tooltip-text">{text}</span>
</div>

<style>
    .tooltip-container {
    position: relative;
    display: inline-block;
    }

    .tooltip-text {
    visibility: hidden;
    background-color: rgba(0,0,0,0.85);
    color: #fff;
    text-align: center;
    padding: 8px 12px;
    border-radius: 6px;

    position: absolute;
    z-index: 9999;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);

    white-space: normal;
    max-width: 240px;
    min-width: 120px;
    line-height: 1.2;
    word-wrap: break-word;

    min-height: fit-content;

    opacity: 0;
    transition: opacity 0.2s;
    font-size: 0.85rem;
    pointer-events: none;
    }


    .tooltip-container:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
    }
</style>
