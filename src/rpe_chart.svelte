<script type="ts">
  import { calculate_plate_scheme, compute_rpe_chart } from "./calculations";

  import { rpeContext } from "./providers/form";
  import { RPE_CHART, REP_COUNT_ARRAY } from "./constants";
  import Barbell from "./barbell.svelte";

  import type { RpeContext, RpeChart } from "./appTypes";

  function format_table_data(
    rpe_chart: RpeContext["rpe_chart"],
    rep_count: RpeContext["rep_count"]
  ) {
    return Object.keys(rpe_chart)
      .sort((a, b) => Number(b) - Number(a))
      .map((key) => [
        key,
        RPE_CHART[rep_count][key],
        isNaN(rpe_chart[key]) ? 0 : rpe_chart[key],
      ]);
  }

  function update_rep_count(count: number) {
    rpeContext.update((prev) => ({
      ...prev,
      rep_count: count,
    }));
  }

  function toggle_table_unit() {
    if (table_weight_unit == "lb") {
      table_weight_unit = "kg";
      table_estimated_one_rm = Math.round(table_estimated_one_rm / 2.2);
    } else {
      table_weight_unit = "lb";
      table_estimated_one_rm = Math.round(table_estimated_one_rm * 2.2);
    }
    table = cast_rpe_chart(table, table_weight_unit);
  }

  function cast_rpe_chart(chart, tabel_unit): RpeChart {
    const c = Object.entries(chart).reduce((nc, [rpe, v]: [string, number]) => {
      if (tabel_unit === "lb") {
        return { ...nc, [rpe]: Math.round(v * 2.2) };
      } else {
        return { ...nc, [rpe]: Math.round(v / 2.2) };
      }
    }, {} as RpeChart);

    return c;
  }

  function plates(load) {
    return calculate_plate_scheme(load, table_weight_unit).flat();
  }

  $: table_weight_unit = $rpeContext.unit;
  $: table_estimated_one_rm = $rpeContext.estimated_one_rm;
  $: table = $rpeContext.rpe_chart;
</script>

<div class="rpe_chart_output">
  <div class="estimate_one_rm_wrapper">
    <h2 class="one_rm_title">Estimated 1RM</h2>
    {#if table_estimated_one_rm}
      <h2 class="one_rm">
        {table_estimated_one_rm}
        <span style="cursor:pointer" on:click={toggle_table_unit}
          >{table_weight_unit}</span
        >
      </h2>
    {:else}
      <h2 class="one_rm">__</h2>
    {/if}
  </div>
  <div class="reps_numbers_wrapper">
    <h4 class="reps_numbers_title">Reps</h4>
    <ul class="reps_numbers">
      {#each REP_COUNT_ARRAY as count}
        <span
          on:click={() => update_rep_count(count)}
          class="reps_number_btn"
          class:active={$rpeContext.rep_count === count}
        >
          {count}
        </span>
      {/each}
    </ul>
  </div>
  <div class="rpe_chart_wrapper">
    <table class="rpe_chart">
      <thead class="rpe_chart_header">
        <tr>
          <th class="rpe_chart_header--cell">
            Barbell ({$rpeContext.unit})
          </th>
          <th class="rpe_chart_header--cell">RPE</th>
          <th class="rpe_chart_header--cell cell-percent"> % of 1rm </th>
          <th class="rpe_chart_header--cell">
            Load ({$rpeContext.unit})
          </th>
        </tr>
      </thead>
      <tbody class="rpe_chart_body">
        {#if $rpeContext.rpe_chart}
          {#each format_table_data(table, $rpeContext.rep_count) as [RPE, percentOfOneRm, load]}
            <tr>
              <td class="rpe_chart_body--cell">
                <Barbell plates={plates(load)} />
              </td>
              <td class="rpe_chart_body--cell">{RPE}</td>
              <td class="rpe_chart_body--cell cell-percent">
                {percentOfOneRm}%
              </td>
              <td class="rpe_chart_body--cell">{load}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>

<style>
  .rpe_chart_output {
    margin-top: 8px;
  }
  .rpe_chart_output .rpe_chart_wrapper {
    min-height: 200px;
  }
  .rpe_chart_output .rpe_chart_wrapper .rpe_chart {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    display: table;
  }
  .rpe_chart_output .rpe_chart_wrapper .rpe_chart .rpe_chart_header {
    border-top: 1.4px solid var(--purple-50);
    border-bottom: 1.4px solid var(--purple-50);
  }
  .rpe_chart_output .rpe_chart_wrapper .rpe_chart .rpe_chart_header--cell {
    width: 100%;
    padding: 10px;
    display: table-cell;
    text-align: center;
  }
  .rpe_chart_output .reps_numbers_wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .rpe_chart_output .reps_numbers_wrapper .reps_numbers {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 auto;
  }
  .rpe_chart_output .reps_numbers_wrapper .reps_numbers .reps_number_btn {
    cursor: pointer;
    font-size: 18px;
    margin: 0 8px;
    padding: 12px;
    border-radius: 3px;
    color: var(--off-white);
  }
  .rpe_chart_output .reps_numbers_wrapper .reps_numbers .reps_number_btn:hover {
    color: var(--purple-50);
  }
  .rpe_chart_output
    .reps_numbers_wrapper
    .reps_numbers
    .reps_number_btn.active {
    background-color: var(--purple-50);
  }
  .rpe_chart_output
    .reps_numbers_wrapper
    .reps_numbers
    .reps_number_btn.active:hover {
    color: var(--off-white);
  }
  .rpe_chart_output .rpe_chart_wrapper .rpe_chart .rpe_chart_body--cell {
    padding: 10px;
    display: table-cell;
    text-align: center;
  }
  .rpe_chart_output .estimate_one_rm_wrapper {
    display: flex;
    justify-content: space-between;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
    .rpe_chart_output .reps_numbers_wrapper .reps_numbers_title {
      margin: 8px 0;
    }
    .rpe_chart_output .reps_numbers_wrapper .reps_numbers {
      padding: 0;
      justify-content: center;
    }
    .rpe_chart_output .reps_numbers_wrapper .reps_numbers .reps_number_btn {
      margin: 0;
    }
    .rpe_chart_output
      .rpe_chart_wrapper
      .rpe_chart
      .rpe_chart_body--cell.cell-percent {
      display: none;
    }
    .rpe_chart_output
      .rpe_chart_wrapper
      .rpe_chart
      .rpe_chart_header
      .rpe_chart_header--cell.cell-percent {
      display: none;
    }
  }
</style>
