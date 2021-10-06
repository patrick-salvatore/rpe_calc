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

export type TWeightUnit = 'kg' | 'lb'

export type RpeContext = {
    unit: TWeightUnit
    weight: number | null
    rep_count: number
    rpe_level: number
    rep_count_estimated_one_rm: number
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

export type ColorOfPlates =
    | 'RED'
    | 'BLUE'
    | 'YELLOW'
    | 'GREEN'
    | 'SM_WHITE'
    | 'SM_RED'
    | 'SM_BLUE'
    | 'SM_YELLOW'
    | 'SM_GREEN'
    | 'SM_MINI'
