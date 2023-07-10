<script lang="ts">
  import {
    rpeContext,
    defaultBackoffPercent,
    defaultBackoffRPE,
  } from "./providers/form";
  import { backoff_percents, WEIGHT_INC_ARRAY } from "./constants";
  import { backoff_set_data } from "./calculations";
  import { RPE_LIST } from "./constants";

  const rep_counts_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  let active_tab: "rpe" | "percent_backoff" = "rpe";
  let rpeBasedInputs = { ...defaultBackoffRPE };
  let percentBasedInputs = { ...defaultBackoffPercent };
  let output_fields = { e1rm_output: 0, next_set_weight: 0 };

  const reset_screen = () => {
    if (active_tab === "percent_backoff") {
      percentBasedInputs = { ...defaultBackoffPercent };
    } else {
      rpeBasedInputs = { ...defaultBackoffRPE };
    }
  };

  $: {
    if ($rpeContext && $rpeContext.weight) {
      if (active_tab === "rpe") {
        output_fields = backoff_set_data({
          ...$rpeContext,
          target_percent: 0,
          percent_basis_reps: 0,
          percent_basis_rpe: 0,
          target_reps: rpeBasedInputs.rep_count,
          target_rpe: rpeBasedInputs.rpe_level,
          weight_increment: rpeBasedInputs.weight_increment,
        }).compute_rpe_based();
      }

      if (active_tab === "percent_backoff") {
        output_fields = backoff_set_data({
          ...$rpeContext,
          weight_increment: percentBasedInputs.weight_increment,
          target_percent: percentBasedInputs.target_percent,
          percent_basis_reps: percentBasedInputs.percent_reps,
          percent_basis_rpe: percentBasedInputs.percent_rpe,
          target_reps: percentBasedInputs.target_reps,
          target_rpe: 0,
        }).percent_backoff();
      }
    }
  }
</script>

<div class="backoff_inputs_wrapper">
  <div class="backoff_inputs_form">
    <h1 class="backoff_inputs_title">Your Last Set</h1>
    <div class="backoff_input">
      <label class="backoff_input--label" for="weight">Weight</label>
      <input
        required
        bind:value={$rpeContext.weight}
        class="backoff_input--cell"
        id="weight"
        min="0"
        maxlength="3"
        pattern="[0-9]*"
      />
    </div>
    <div class="joined_cells">
      <div class="backoff_input">
        <label class="backoff_input--label" for="min_increment">x Reps</label>
        <select
          class="backoff_input--cell"
          id="min_increment"
          bind:value={$rpeContext.rep_count_estimated_one_rm}
        >
          {#each rep_counts_arr as count}
            <option
              selected={$rpeContext.rep_count_estimated_one_rm === count}
              value={count}
            >
              {count}
            </option>
          {/each}
        </select>
      </div>
      <div class="backoff_input">
        <label class="backoff_input--label" for="rpe">@ RPE</label>
        <select
          class="backoff_input--cell"
          id="rpe"
          bind:value={$rpeContext.rpe_level}
        >
          {#each RPE_LIST as rpe}
            <option value={rpe} selected={$rpeContext.rpe_level === rpe}
              >{rpe}</option
            >
          {/each}
        </select>
      </div>
    </div>
    <div class="info_button_wrapper">
      <button
        disabled={!Boolean($rpeContext.weight)}
        class:disabled={!Boolean($rpeContext.weight)}
        class="form-control btn btn-primary"
        on:click={reset_screen}
      >
        Reset All
      </button>
    </div>
  </div>
  <div class="backoff_tabs_form">
    <h1 class="backoff_inputs_title">Next Set Target</h1>
    <div class="backoff_tabs_wrapper">
      <button
        class="backoff_tab"
        class:active={active_tab === "rpe"}
        on:click={() => (active_tab = "rpe")}
      >
        <h3>RPE</h3>
      </button>
      <button
        class="backoff_tab"
        class:active={active_tab === "percent_backoff"}
        on:click={() => (active_tab = "percent_backoff")}
      >
        <h3>% backoff</h3>
      </button>
    </div>
    {#if active_tab === "rpe"}
      <div class="joined__cells">
        <div class="backoff_input">
          <label class="backoff_input--label" for="min_increment">x Reps</label>
          <select
            class="backoff_input--cell"
            id="min_increment"
            bind:value={rpeBasedInputs.rep_count}
          >
            {#each rep_counts_arr as count}
              <option value={count}>
                {count}
              </option>
            {/each}
          </select>
        </div>
        <div class="backoff_input">
          <label class="backoff_input--label" for="rpe">@ RPE</label>
          <select
            class="backoff_input--cell"
            id="rpe"
            bind:value={rpeBasedInputs.rpe_level}
          >
            {#each RPE_LIST as rpe}
              <option value={rpe}>{rpe}</option>
            {/each}
          </select>
        </div>
      </div>
    {:else}
      <div class="percent_backoff_inputs">
        <div>Reps</div>
        <div class="backoff_input">
          <select
            class="backoff_input--cell"
            id="rpe"
            bind:value={percentBasedInputs.target_reps}
          >
            {#each rep_counts_arr as count}
              <option value={count}> {count}</option>
            {/each}
          </select>
        </div>
        <div>@</div>
        <div class="backoff_input">
          <select
            class="backoff_input--cell"
            id="percents"
            bind:value={percentBasedInputs.target_percent}
          >
            {#each backoff_percents() as percent}
              <option value={percent}> -{percent}%</option>
            {/each}
          </select>
        </div>
        <div>from</div>
        <div class="backoff_input">
          <select
            class="backoff_input--cell"
            id="rpe"
            bind:value={percentBasedInputs.percent_reps}
          >
            {#each rep_counts_arr as count}
              <option value={count}>{count}</option>
            {/each}
          </select>
        </div>
        <div>@</div>
        <div class="backoff_input">
          <select
            class="backoff_input--cell"
            id="rpe"
            bind:value={percentBasedInputs.percent_rpe}
          >
            {#each RPE_LIST as rpe}
              <option value={rpe}>RPE {rpe}</option>
            {/each}
          </select>
        </div>
      </div>
    {/if}
    <div class="backoff_input weight_increment__wrapper">
      <label class="backoff_input--label" for="min_increment"
        >Minimum weight increment</label
      >
      <select
        class="backoff_input--cell"
        id="min_increment"
        value={active_tab === "percent_backoff"
          ? percentBasedInputs.weight_increment
          : rpeBasedInputs.weight_increment}
      >
        {#each WEIGHT_INC_ARRAY as inc}
          <option
            value={inc}
            selected={(active_tab === "percent_backoff"
              ? percentBasedInputs.weight_increment
              : rpeBasedInputs.weight_increment) === inc}>{inc}</option
          >
        {/each}
      </select>
    </div>
  </div>
  <div class="outputs_wrapper">
    <h1 class="backoff_outputs_title">Outputs</h1>
    <div class="output_result_wrapper">
      <div class="output_result">
        <label for="next_set">Next Set Weight</label>
        <input
          name="next_set"
          type="text"
          class="result next_set"
          disabled
          bind:value={output_fields.next_set_weight}
        />
      </div>
      <div class="output_result">
        <label for="next_set">Estimated 1RM</label>
        <!-- <input
          type="text"
          class="result est_1rm"
          disabled
          bind:value={output_fields.e1rm_output}
        /> -->
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .backoff_inputs_form .backoff_inputs_title {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .backoff_inputs_form .joined_cells {
    display: flex;
    padding: 8px 0 8px 0;
  }
  .backoff_inputs_form .joined_cells .backoff_input {
    width: 100%;
  }
  .backoff_inputs_form .joined_cells .backoff_input:last-of-type {
    padding-left: 12px;
  }

  .backoff_inputs_form .backoff_input {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .backoff_inputs_form .backoff_input .backoff_input--label {
    margin-right: 16px;
    min-width: fit-content;
  }
  .backoff_inputs_form .backoff_input > input,
  .backoff_inputs_form .backoff_input > select {
    width: 100%;
  }
  .backoff_inputs_form .backoff_input:last-of-type {
    padding-bottom: 12px;
  }

  .backoff_inputs_form .info_button_wrapper button {
    width: 100%;
    background-color: var(--purple-50);
    color: var(--pure-white);
  }
  .backoff_inputs_form .info_button_wrapper button:hover {
    background-color: var(--purple-50);
  }
  .backoff_inputs_form .info_button_wrapper button .disabled {
    background-color: var(--purple-30);
    cursor: not-allowed;
  }

  .backoff_tabs_form .backoff_tab {
    background-color: transparent;
    cursor: pointer;
    color: var(--neutral-60);
  }

  .backoff_tabs_form .backoff_inputs_title {
    font-size: 24px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .backoff_tabs_form .backoff_tabs_wrapper {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    padding: 0;
    margin-bottom: 24px;
  }

  .backoff_tabs_form .backoff_tabs_wrapper .backoff_tab {
    display: flex;
    justify-content: space-evenly;
    width: 75%;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-bottom: 1px solid var(--purple-30);
  }

  .backoff_tabs_form .backoff_tabs_wrapper .backoff_tab.active {
    border-top: 1px solid var(--purple-30);
    border-left: 1px solid var(--purple-30);
    border-right: 1px solid var(--purple-30);
    border-bottom: 1px solid transparent;
  }

  .backoff_tabs_form .backoff_tabs_wrapper .backoff_tab:hover:not(.active) {
    border-left: 1px solid var(--purple-10);
    border-right: 1px solid var(--purple-10);
    border-top: 1px solid var(--purple-10);
  }

  .backoff_tabs_form .backoff_input {
    display: flex;
    align-items: center;
    margin: 8px 0;
  }

  .backoff_tabs_form .backoff_input .backoff_input--label {
    margin-right: 16px;
    min-width: fit-content;
  }

  .backoff_tabs_form .backoff_input select {
    width: 100%;
  }

  .backoff_tabs_form .backoff_input .weight_increment__wrapper {
    margin-top: 24px;
  }

  .backoff_tabs_form .joined__cells {
    display: flex;
    margin-bottom: 2px;
  }
  .backoff_tabs_form .joined__cells .backoff_input {
    width: 100%;
  }
  .backoff_tabs_form .joined__cells .backoff_input:last-of-type {
    padding-left: 12px;
  }

  .backoff_tabs_form .percent_backoff_inputs {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .backoff_tabs_form .percent_backoff_inputs .backoff_input {
    margin: 0 45px;
    width: 125px;
  }

  .outputs_wrapper {
    margin: 28px 0;
  }
  .outputs_wrapper .backoff_outputs_title {
    margin-bottom: 14px;
  }
  .outputs_wrapper .output_result_wrapper {
    display: flex;
    justify-content: space-evenly;
  }
  .outputs_wrapper .output_result_wrapper .output_result .result {
    margin-left: 8px;
    background-color: #ffff;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
    .backoff_inputs_form .backoff_inputs_title {
      font-size: 20px;
      margin-bottom: 12px;
    }
    .backoff_tabs_form .backoff_inputs_title {
      font-size: 20px;
    }
    .backoff_tabs_form .percent_backoff_inputs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .backoff_inputs_form .backoff_input:last-of-type {
      padding: 0;
    }

    .backoff_tabs_form .percent_backoff_inputs .backoff_input {
      margin: 0;
      margin-top: 8px;
    }

    .outputs_wrapper {
      margin-top: 8px;
    }
    .outputs_wrapper .backoff_outputs_title {
      font-size: 20px;
    }
    .outputs_wrapper .output_result_wrapper {
      display: flex;
      flex-direction: column;
      align-content: space-around;
      justify-content: space-evenly;
    }
    .outputs_wrapper .output_result_wrapper .output_result .result {
      margin: 8px 0;
    }
  }
</style>
