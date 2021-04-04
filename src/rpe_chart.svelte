<script type="ts">
    import { rpeContext } from './providers/form'
    import type { RpeContext } from './appTypes'
    import { RPE_CHART } from './constants/rpe_chart'

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

    .rpe_chart_output .rpe_chart_wrapper .rpe_chart .rpe_chart_body--cell {
        padding: 10px;
        display: table-cell;
        text-align: center;
    }

    .rpe_chart_output .estimate_one_rm_wrapper {
        display: flex;
        justify-content: space-between;
    }
</style>
