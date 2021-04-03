import type { RpeContext, RpeChart } from './appTypes'
import { RPE_CHART } from './constants/rpe_chart'

export const compute_1rm = ({
    rep_count,
    rpe_level,
    weight,
}: Pick<RpeContext, 'rpe_level' | 'rep_count' | 'weight'>) =>
    (Number(weight) / RPE_CHART[rep_count][rpe_level]) * 100

export const compute_rpe_chart = ({
    rep_count,
    rpe_level,
    weight,
    weight_increment,
}: RpeContext) => {
    const oneRM = compute_1rm({ rep_count, rpe_level, weight })
    const estimated_one_rm =
        Number(weight_increment) * Math.round(oneRM / Number(weight_increment))

    return {
        estimated_one_rm,
        rpe_chart: Object.entries(RPE_CHART[rep_count]).reduce(
            (map, [key, value]: [string, number]) => {
                map[key] =
                    Number(weight_increment) *
                    Math.round((value * oneRM) / 100 / Number(weight_increment))
                return map
            },
            {}
        ) as RpeChart,
    }
}

type BackOffData = {
    percent_basis_reps: any
    percent_basis_rpe: any
    target_percent: any
    target_reps: any
    target_rpe: any
}
export const backoff_set_data = ({
    rep_count,
    rpe_level,
    weight,
    weight_increment,
    percent_basis_reps,
    percent_basis_rpe,
    target_percent,
    target_reps,
    target_rpe,
}: RpeContext & BackOffData) => {
    const est_1rm = compute_1rm({ rep_count, rpe_level, weight })

    const compute_rpe_based = () => {
        const t = (RPE_CHART[target_reps][target_rpe] * est_1rm) / 100
        const next_set_weight =
            weight_increment * Math.round(t / weight_increment)
        const e1rm_output =
            weight_increment * Math.round(est_1rm / weight_increment)

        if ([e1rm_output, next_set_weight].every((n) => !isNaN(n))) {
            return { e1rm_output, next_set_weight }
        }
        return { e1rm_output: 0, next_set_weight: 0 }
    }

    const percent_backoff = () => {
        const t =
            ((100 - target_percent) / 100) *
            ((RPE_CHART[percent_basis_reps][percent_basis_rpe] * est_1rm) / 100)
        const e1rm_output =
            weight_increment * Math.round(est_1rm / weight_increment)
        const next_set_weight =
            weight_increment * Math.round(t / weight_increment)

        if ([e1rm_output, next_set_weight].every((n) => !isNaN(n))) {
            return { e1rm_output, next_set_weight }
        }
        return { e1rm_output: 0, next_set_weight: 0 }
    }

    return { compute_rpe_based, percent_backoff }
}
