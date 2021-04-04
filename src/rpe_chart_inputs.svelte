<script type="ts">
    import { rpeContext, defaultRpeContext } from './providers/form'
    import { compute_rpe_chart } from './calculations'
    import { RPE_LIST } from './constants/rpe_chart'

    const rep_counts_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const update_rep_count = (count: number) => {
        rpeContext.update((prev) => ({
            ...prev,
            rep_count: count,
        }))
    }

    $: watched = {
        weight: Number($rpeContext.weight),
        weight_increment: Number($rpeContext.weight_increment),
        rep_count: Number($rpeContext.rep_count),
        rpe_level: Number($rpeContext.rpe_level),
    }

    $: {
        rpeContext.update((prev) => ({
            ...prev,
            ...compute_rpe_chart(watched),
        }))
    }
</script>

<div class="rpe_inputs_form">
    <h1 class="rpe_inputs_title">Your Last Set</h1>
    <div class="rpe_form_cell">
        <label class="rpe_form_cell--label" for="weight">Weight</label>
        <input
            required
            bind:value={$rpeContext.weight}
            class="cell"
            min="0"
            maxlength="3"
            pattern="[0-9]*"
        />
    </div>
    <div class="joined_cells">
        <div class="rpe_form_cell">
            <label class="rpe_form_cell--label" for="min_increment"
                >Minimum weight increment</label
            >
            <select
                class="rpe_form_cell--cell"
                id="min_increment"
                bind:value={$rpeContext.weight_increment}
            >
                <option value=".5">.5</option>
                <option value="1">1</option>
                <option value="2.5" selected={true}>2.5</option>
                <option value="5">5</option>
            </select>
        </div>
        <div class="rpe_form_cell">
            <label class="rpe_form_cell--label" for="rpe">@ RPE</label>
            <select
                class="rpe_form_cell--cell"
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
    <div class="reps_numbers_wrapper">
        <h4 class="reps_numbers_title">Reps</h4>
        <ul class="reps_numbers">
            {#each rep_counts_arr as count}
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
    <div class="info_button_wrapper">
        <button
            disabled={!Boolean($rpeContext.weight)}
            class:disabled={!Boolean($rpeContext.weight)}
            class="form-control btn btn-primary"
            on:click={() => rpeContext.set(defaultRpeContext)}
        >
            Reset
        </button>
    </div>
</div>

<style>
    .rpe_inputs_form .rpe_inputs_title {
        font-size: 24px;
        margin-bottom: 12px;
    }
    .rpe_inputs_form .joined_cells {
        display: flex;
        padding: 8px 0 8px 0;
    }
    .rpe_inputs_form .joined_cells {
        width: 100%;
    }
    .rpe_inputs_form .joined_cells .rpe_form_cell {
        width: 100%;
    }
    .rpe_inputs_form .joined_cells .rpe_form_cell:last-of-type {
        padding-left: 12px;
    }

    .rpe_inputs_form .rpe_form_cell {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
    }

    .rpe_inputs_form .rpe_form_cell .rpe_form_cell--label {
        margin-right: 16px;
        min-width: fit-content;
    }

    .rpe_inputs_form .rpe_form_cell > input,
    .rpe_inputs_form .rpe_form_cell > select {
        width: 100%;
    }

    .rpe_inputs_form .rpe_form_cell .rpe_form_cell--label:last-of-type {
        padding-bottom: 12px;
    }

    .rpe_inputs_form .reps_numbers_wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .rpe_inputs_form .reps_numbers_wrapper .reps_numbers {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 0 auto;
    }

    .rpe_inputs_form .reps_numbers_wrapper .reps_numbers .reps_number_btn {
        cursor: pointer;
        font-size: 18px;
        margin: 0 8px;
        padding: 12px;
        border-radius: 3px;
        color: var(--off-white);
    }
    .rpe_inputs_form
        .reps_numbers_wrapper
        .reps_numbers
        .reps_number_btn:hover {
        color: var(--purple-50);
    }
    .rpe_inputs_form
        .reps_numbers_wrapper
        .reps_numbers
        .reps_number_btn.active {
        background-color: var(--purple-50);
    }

    .rpe_inputs_form
        .reps_numbers_wrapper
        .reps_numbers
        .reps_number_btn.active:hover {
        color: var(--off-white);
    }

    .rpe_inputs_form .info_button_wrapper > button {
        width: 100%;
        background-color: var(--purple-50);
        color: var(--pure-white);
    }
    .rpe_inputs_form .info_button_wrapper > button:hover {
        background-color: var(--purple-50);
    }
    .rpe_inputs_form .info_button_wrapper > button.disabled {
        background-color: var(--purple-30);
        cursor: not-allowed;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
        .rpe_inputs_form .rpe_inputs_title {
            font-size: 20px;
            margin-bottom: 12px;
        }
        .rpe_inputs_form .rpe_form_cell {
            flex-direction: column;
            align-items: baseline;
        }
        .rpe_inputs_form .rpe_form_cell .rpe_form_cell--label {
            margin-bottom: 4px;
        }
        .rpe_inputs_form .rpe_form_cell:last-of-type {
            margin: 0;
        }
        .rpe_inputs_form .joined_cells {
            flex-direction: column;
            padding: 0;
        }

        .rpe_inputs_form .joined_cells .rpe_form_cell {
            width: auto;
            padding-left: 0;
        }

        .rpe_inputs_form .joined_cells .rpe_form_cell:last-of-type {
            padding-left: 0;
        }
        .rpe_inputs_form .reps_numbers_wrapper .reps_numbers_title {
            margin-bottom: 8px;
        }
        .rpe_inputs_form .reps_numbers_wrapper .reps_numbers {
            padding: 0;
        }
        .rpe_inputs_form.reps_numbers_wrapper .reps_numbers .reps_number_btn {
            font-size: 14px;
        }
    }
</style>
