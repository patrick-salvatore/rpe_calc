export const backoff_percents = (n = 1, stack = [], stop = 41) =>
    n === stop ? stack : backoff_percents(n + 1, [...stack, n])
