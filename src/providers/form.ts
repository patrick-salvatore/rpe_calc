import type { RpeContext, BackoffContext } from '../appTypes'
import { writable, Writable } from 'svelte/store'

export const defaultRpeContext = {
    weight: null,
    weight_increment: 2.5,
    rep_count: 1,
    rpe_level: 8,
    estimated_one_rm: 0,
}

export const defaultBackoffRPE = {
    rep_count: 5,
    rpe_level: 8,
    weight_increment: 2.5,
}

export const defaultBackoffPercent = {
    target_reps: 5,
    target_percent: 15,
    percent_reps: 1,
    percent_rpe: 8,
    weight_increment: 2.5,
}

export const rpeContext: Writable<RpeContext> = writable(defaultRpeContext)