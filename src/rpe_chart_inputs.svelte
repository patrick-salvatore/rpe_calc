<script type="ts">
    import { rpeContext, defaultRpeContext } from './providers/form'
    import { compute_rpe_chart } from './calculations'
    import {
        REP_COUNT_ARRAY,
        RPE_LIST,
        WEIGHT_INC_ARRAY,
        WEIGHT_UNIT_ARRAY,
    } from './constants'

    $: watched = {
        unit: $rpeContext.unit,
        weight: Number($rpeContext.weight),
        weight_increment: Number($rpeContext.weight_increment),
        rep_count: Number($rpeContext.rep_count),
        rpe_level: Number($rpeContext.rpe_level),
        rep_count_estimated_one_rm: Number(
            $rpeContext.rep_count_estimated_one_rm
        ),
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
            maxlength="4"
            pattern="[0-9]*"
        />
        <div class="rpe_form_cell--weight-units">
            {#each WEIGHT_UNIT_ARRAY as unit}
                <span
                    class="reps_number_btn"
                    class:active={$rpeContext.unit === unit}
                    on:click={() => {
                        $rpeContext.unit = unit
                    }}
                >
                    {unit}
                </span>
            {/each}
        </div>
    </div>
    <div class="joined_cells">
        <div class="rpe_form_cell weight_inc__wrapper">
            <label class="rpe_form_cell--label" for="min_increment"
                >Minimum weight increment</label
            >
            <div class="reps_number_btn__wrapper">
                {#each WEIGHT_INC_ARRAY as inc}
                    <span
                        class="reps_number_btn"
                        class:active={$rpeContext.weight_increment === inc}
                        on:click={() => {
                            $rpeContext.weight_increment = inc
                        }}
                    >
                        {inc}
                    </span>
                {/each}
            </div>
        </div>
        <div class="rpe_form_cell">
            <label class="rpe_form_cell--label" for="rpe">Reps</label>
            <select
                class="rpe_form_cell--cell"
                bind:value={$rpeContext.rep_count_estimated_one_rm}
            >
                {#each REP_COUNT_ARRAY as rep}
                    <option
                        value={rep}
                        selected={$rpeContext.rpe_level === rep}
                    >
                        {rep}
                    </option>
                {/each}
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
                        >{rpe}
                    </option>
                {/each}
            </select>
        </div>
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
        padding-left: 12px;
    }
    .rpe_inputs_form .joined_cells .reps_number_btn__wrapper .reps_number_btn,
    .rpe_inputs_form
        .rpe_form_cell
        .rpe_form_cell--weight-units
        .reps_number_btn {
        cursor: pointer;
        font-size: 18px;
        margin: 0 8px;
        padding: 7px;
        border-radius: 3px;
        color: var(--off-white);
    }
    .rpe_inputs_form
        .joined_cells
        .reps_number_btn__wrapper
        .reps_number_btn:hover {
        color: var(--purple-50);
    }
    .rpe_inputs_form
        .joined_cells
        .reps_number_btn__wrapper
        .reps_number_btn.active,
    .rpe_inputs_form
        .rpe_form_cell
        .rpe_form_cell--weight-units
        .reps_number_btn.active {
        background-color: var(--purple-50);
    }
    .rpe_inputs_form
        .joined_cells
        .reps_number_btn__wrapper
        .reps_number_btn.active:hover,
    .rpe_inputs_form
        .rpe_form_cell
        .rpe_form_cell--weight-units
        .reps_number_btn.active:hover {
        color: var(--off-white);
    }
    .rpe_inputs_form .joined_cells .rpe_form_cell:first-of-type {
        padding-left: 0;
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
    .rpe_inputs_form .rpe_form_cell .rpe_form_cell--weight-units {
        display: flex;
    }
    .rpe_inputs_form .rpe_form_cell > input,
    .rpe_inputs_form .rpe_form_cell > select {
        width: 100%;
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
            margin-bottom: 8px;
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
            margin-bottom: 8px;
        }
        .rpe_inputs_form
            .joined_cells
            .reps_number_btn__wrapper
            .reps_number_btn {
            padding: 8px;
        }
        .rpe_inputs_form .joined_cells .reps_number_btn__wrapper {
            display: flex;
        }
        .rpe_inputs_form .rpe_form_cell .rpe_form_cell--weight-units {
            margin-top: 8px;
        }
    }
</style>
