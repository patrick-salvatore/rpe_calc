import type { RpeContext } from "../types";
import { Writable, writable } from "svelte/store";

export const defaultRpeContext: RpeContext = {
  weight: null,
  unit: "lb",
  weight_increment: 1,
  rep_count: 1,
  rep_count_estimated_one_rm: 1,
  rpe_level: 10,
  estimated_one_rm: 0,
};

export const defaultBackoffRPE = {
  rep_count: 5,
  rpe_level: 8,
  weight_increment: 1,
};

export const defaultBackoffPercent = {
  target_reps: 5,
  target_percent: 15,
  percent_reps: 1,
  percent_rpe: 8,
  weight_increment: 1,
};

export const rpeContext: Writable<RpeContext> = writable(defaultRpeContext);
