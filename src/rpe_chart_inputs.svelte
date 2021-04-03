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

<style type="scss">
    @import './style-guide/media_queries/Iphone.scss';

    .rpe_inputs_form {
        .rpe_inputs_title {
            font-size: 24px;
            margin-bottom: 12px;
        }

        .joined_cells {
            display: flex;
            padding: 8px 0 8px 0;

            .rpe_form_cell {
                width: 100%;
            }

            .rpe_form_cell:last-of-type {
                padding-left: 12px;
            }
        }

        .rpe_form_cell {
            display: flex;
            align-items: center;
            margin-bottom: 12px;

            .rpe_form_cell--label {
                margin-right: 16px;
                min-width: fit-content;
            }

            input,
            select {
                width: 100%;
            }

            &:last-of-type() {
                padding-bottom: 12px;
            }
        }

        .reps_numbers_wrapper {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .reps_numbers {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin: 0 auto;

                .reps_number_btn {
                    cursor: pointer;
                    font-size: 18px;
                    margin: 0 8px;
                    padding: 12px;
                    border-radius: 3px;
                    color: var(--off-white);

                    &:hover {
                        color: var(--purple-50);
                    }

                    &.active {
                        background-color: var(--purple-50);
                        &:hover {
                            color: var(--off-white);
                        }
                    }
                }
            }
        }

        .info_button_wrapper {
            button {
                width: 100%;
                background-color: var(--purple-50);
                color: var(--pure-white);

                &:hover {
                    background-color: var(--purple-50);
                }

                &.disabled {
                    background-color: var(--purple-30);
                    cursor: not-allowed;
                }
            }
        }
    }

    @include Iphone {
        .rpe_inputs_form {
            .rpe_inputs_title {
                font-size: 20px;
                margin-bottom: 12px;
            }
        }
    }
</style>
