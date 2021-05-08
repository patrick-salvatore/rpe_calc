<script type="ts">
    export let plates: {
        className: string
        type: string
        weight: number
    }[][]
</script>

<div class="barbell_wrapper">
    {#each plates.flat().reverse() as { className }}
        <div
            class={`${className} ${
                className.includes('SM') ? 'SMALL_PLATE' : 'PLATE'
            }`}
        />
    {/each}
    <div class="bar" />
    {#each plates.flat() as { className }}
        <div
            class={`${className} ${
                className.includes('SM') ? 'SMALL_PLATE' : 'PLATE'
            }`}
        />
    {/each}
</div>

<style>
    .PLATE {
        border-right: solid 0.5px var(--true-black);
        height: 50px;
    }
    .SMALL_PLATE {
        border-right: solid 0.5px var(--true-black);
    }

    .RED_PLATE {
        width: 17px;
        background-color: #f73e1d;
    }
    .BLUE_PLATE {
        width: 15px;
        background-color: #1d3ef7;
    }
    .YELLOW_PLATE {
        width: 13px;
        background-color: #f7e91d;
    }
    .GREEN_PLATE {
        width: 13px;
        background-color: #118d0d;
    }
    .SM_WHITE_PLATE {
        width: 10px;
        height: 28px;
        background-color: #fff;
    }
    .SM_RED_PLATE {
        width: 8px;
        height: 24px;
        background-color: #f73e1d;
    }
    .SM_BLUE_PLATE {
        width: 5px;
        height: 20px;
        background-color: #1d3ef7;
    }
    .SM_YELLOW_PLATE {
        width: 5px;
        height: 18px;
        background-color: #f7e91d;
    }
    .SM_GREEN_PLATE {
        width: 5px;
        height: 16px;
        background-color: #118d0d;
    }
    .SM_MINI_PLATE {
        width: 4px;
        height: 12px;
        background-color: #fff;
    }

    .barbell_wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .barbell_wrapper .bar {
        width: 180px;
        height: 4px;
        background-color: var(--neutral-30);
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
        .PLATE {
            height: 45px;
        }

        .RED_PLATE {
            width: 24px;
        }
        .BLUE_PLATE {
            width: 22px;
        }
        .YELLOW_PLATE {
            width: 20px;
        }
        .GREEN_PLATE {
            width: 15px;
        }
        .SM_WHITE_PLATE {
            width: 10px;
        }
        .SM_RED_PLATE {
            width: 8px;
        }
        .SM_BLUE_PLATE {
            width: 5px;
        }
        .SM_YELLOW_PLATE {
            width: 5px;
        }
        .SM_GREEN_PLATE {
            width: 5px;
        }
        .SM_MINI_PLATE {
            width: 4px;
        }

        .barbell_wrapper .bar {
            width: 150px;
            height: 4px;
        }
    }
</style>
