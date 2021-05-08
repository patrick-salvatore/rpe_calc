import type { RpeContext, RpeChart, ColorOfPlates } from './appTypes'
import { RPE_CHART, PLATES_MAP } from './constants'

export const compute_1rm = ({
    rep_count_estimated_one_rm,
    rpe_level,
    weight,
}: Pick<RpeContext, 'rpe_level' | 'rep_count_estimated_one_rm' | 'weight'>) =>
    (Number(weight) / RPE_CHART[rep_count_estimated_one_rm][rpe_level]) * 100

export const compute_rpe_chart = ({
    rep_count,
    rep_count_estimated_one_rm,
    rpe_level,
    weight,
    weight_increment,
}: RpeContext) => {
    const oneRM = compute_1rm({ rep_count_estimated_one_rm, rpe_level, weight })
    const estimated_one_rm =
        weight_increment * Math.floor(oneRM / weight_increment)

    return {
        estimated_one_rm,
        rpe_chart: Object.entries(RPE_CHART[rep_count]).reduce(
            (map, [rpe, percentage]: [string, number]) => {
                const dec_percent = Number(Number(percentage / 100).toFixed(3))

                return {
                    ...map,
                    [rpe]: Math.floor(
                        Number(
                            (weight_increment * (dec_percent * oneRM)) /
                                weight_increment
                        )
                    ),
                }
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
    rpe_level,
    weight,
    weight_increment,
    rep_count_estimated_one_rm,
    percent_basis_reps,
    percent_basis_rpe,
    target_percent,
    target_reps,
    target_rpe,
}: RpeContext & BackOffData) => {
    const est_1rm = compute_1rm({
        weight,
        rpe_level,
        rep_count_estimated_one_rm,
    })

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

const recur_gather_plate = (plate, weight, count = 0) => {
    if (weight - plate < 0) {
        return count
    }
    return recur_gather_plate(plate, weight - plate, (count += 1))
}

export const calculate_kilo_plate = (load: string): any[][] => {
    const BARBELL = 20
    const load_number = Number(load)
    const list: { number_of_plates: number; type: ColorOfPlates }[] = []
    let ticker = 0
    let weight_left = (load_number - BARBELL) / 2

    if (!load_number) {
        return [[]]
    }

    while (ticker < Object.keys(PLATES_MAP).length) {
        const { type, weight } = PLATES_MAP[Object.keys(PLATES_MAP)[ticker]]

        let num = recur_gather_plate(weight, weight_left)
        list.push({ number_of_plates: num, type })
        weight_left -= num * weight
        ticker++
    }

    return list
        .filter((obj) => obj.number_of_plates > 0)
        .map(({ number_of_plates, type }) =>
            new Array(number_of_plates).fill(PLATES_MAP[type])
        )
}
