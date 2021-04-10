<script type="ts">
    import { rpeContext } from './providers/form'
    import type { RpeContext } from './appTypes'
    import { RPE_CHART, REP_COUNT_ARRAY } from './constants'

    const format_table_data = ({ rpe_chart, rep_count }: RpeContext) => {
        const map_keys = Object.keys(rpe_chart).sort(
            (a, b) => Number(b) - Number(a)
        )

        return map_keys.map((key) => [
            key,
            RPE_CHART[rep_count][key],
            isNaN(rpe_chart[key]) ? 0 : rpe_chart[key],
        ])
    }

    const update_rep_count = (count: number) => {
        rpeContext.update((prev) => ({
            ...prev,
            rep_count: count,
        }))
    }
</script>

<div class="rpe_chart_output">
    <div class="estimate_one_rm_wrapper">
        <h2 class="one_rm_title">Estimated 1RM</h2>
        {#if $rpeContext.estimated_one_rm}
            <h2 class="one_rm">{$rpeContext.estimated_one_rm}</h2>
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
                    <th class="rpe_chart_header--cell">RPE</th>
                    <th class="rpe_chart_header--cell">% of 1rm</th>
                    <th class="rpe_chart_header--cell">Load</th>
                </tr>
            </thead>
            <tbody class="rpe_chart_body">
                {#if $rpeContext.rpe_chart}
                    {#each format_table_data($rpeContext) as [RPE, percentOfOneRm, load]}
                        <tr>
                            <td class="rpe_chart_body--cell">{RPE}</td>
                            <td class="rpe_chart_body--cell"
                                >{percentOfOneRm}%</td
                            >
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
    .rpe_chart_output
        .reps_numbers_wrapper
        .reps_numbers
        .reps_number_btn:hover {
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
    }
</style>
