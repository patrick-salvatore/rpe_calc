export type RpeChart = {
    10: number
    9.5: number
    9: number
    8.5: number
    8: number
    7.5: number
    7: number
    6.5: number
    6: number
}

export type RpeContext = {
    weight: number | null
    rep_count: number
    rpe_level: number
    weight_increment: number
    estimated_one_rm?: number
    rpe_chart?: RpeChart
    backoff_outputs?: any
}

export type BackoffContext = {
    rpe: {
        rep_count: number
        rpe_level: number
        weight_increment: number
    }
    percent_backoff: {
        target_reps: number
        target_percent: number
        percent_reps: number
        percent_rpe: number
        weight_increment: number
    }
}