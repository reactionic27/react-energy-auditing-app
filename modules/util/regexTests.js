// See tests for what these pass or fail

// True if we get any non-digit characters (including periods)
export const NOT_DIGIT_TEST = /\D/
export const INTEGER_TEST = /^[-]?\d+$/

// allows a leading minus
// allow a leading period
// allows a trailing period (so people can keep typing past the period)
export const NUMERIC_CHECK = /^[-]?\d+(\.\d*)?$/

export const POSITIVE_INTEGERS_ONLY = /^\d+$/
