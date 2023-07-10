<script lang="ts">
  import RpeInputs from "./rpe_chart_inputs.svelte";
  import RpeChart from "./rpe_chart.svelte";
  import Backoff from "./backoff_chart_inputs.svelte";
  import { onMount } from "svelte";

  type PageTypes = "rpe-calc" | "backoff";

  export let page: PageTypes = "rpe-calc";
  const toggleDisplay = (pageName: PageTypes) => {
    localStorage.setItem("last_page", pageName);
    page = pageName;
  };

  onMount(() => {
    const ls = localStorage.getItem("last_page") || page;
    page = ls as PageTypes;
  });
</script>

<main class="app_container dark-theme">
  <nav class="main_nav">
    <h1 class="main_nav_title">RPE Calculator</h1>
    <div class="item_wapper">
      <button
        class="nav_item"
        class:active={page === "rpe-calc"}
        on:click={() => toggleDisplay("rpe-calc")}
      >
        RPE Chart
      </button>
      <span class="nav_item_divider"> | </span>
      <button
        class="nav_item"
        class:active={page === "backoff"}
        on:click={() => toggleDisplay("backoff")}
      >
        Backoff Sets
      </button>
    </div>
  </nav>

  {#if page === "rpe-calc"}
    <RpeInputs />
    <RpeChart />
  {:else if page === "backoff"}
    <Backoff />
  {/if}
</main>

<style lang="scss">
  @import "./styles/index.scss";

  .app_container {
    min-height: 100vh;
    padding: 32px;
    padding-bottom: 0;
  }

  .main_nav {
    display: flex;
    flex-direction: column;
    align-items: center;

    .main_nav_title {
      font-size: 2.5rem;
      margin: 0;
      margin-bottom: 10px;
    }

    .nav_item {
      background-color: transparent;
      cursor: pointer;
      color: var(--neutral-60);
      
      &.active {
        color: var(--pure-white);
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
    .app_container {
      max-width: none;
      .main_nav {
        margin-bottom: 12px;
        .main_nav_title {
          font-size: 2rem;
        }
      }
    }
  }
</style>
