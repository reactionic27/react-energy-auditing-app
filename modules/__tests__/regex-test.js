/* eslint-env mocha */
import expect from 'expect'
import {NOT_DIGIT_TEST, NUMERIC_CHECK, POSITIVE_INTEGERS_ONLY} from '../util/regexTests'


describe('regex expression tests', () => {

  describe('NOT_DIGIT_TEST', () => {
    it('should return true for any non-digit characters', () => {
      expect(NOT_DIGIT_TEST.test('A')).toEqual(true)
      expect(NOT_DIGIT_TEST.test('A5')).toEqual(true)
      expect(NOT_DIGIT_TEST.test('ABC')).toEqual(true)
      expect(NOT_DIGIT_TEST.test(-5)).toEqual(true)
      expect(NOT_DIGIT_TEST.test('-5')).toEqual(true)
      expect(NOT_DIGIT_TEST.test(null)).toEqual(true)
      expect(NOT_DIGIT_TEST.test(undefined)).toEqual(true)
      expect(NOT_DIGIT_TEST.test(NaN)).toEqual(true)
      expect(NOT_DIGIT_TEST.test(Infinity)).toEqual(true)
    })

    it('should return false for any characters that are only digits', () => {
      expect(NOT_DIGIT_TEST.test(5)).toEqual(false)
      expect(NOT_DIGIT_TEST.test('5')).toEqual(false)
    })
  })


  describe('NUMERIC_CHECK', () => {
    it('should return true for any numeric characters', () => {
      expect(NUMERIC_CHECK.test(5)).toEqual(true)
      expect(NUMERIC_CHECK.test(-5)).toEqual(true)
      expect(NUMERIC_CHECK.test('-5')).toEqual(true)
    })

    it('should return true for numeric characters that start with a decimal or zero', () => {
      expect(NUMERIC_CHECK.test(.5)).toEqual(true)
      expect(NUMERIC_CHECK.test(0.5)).toEqual(true)
    })

    // allows a trailing period (so people can keep typing past the period)
    it('should return true for numeric characters that end with a decimal', () => {
      expect(NUMERIC_CHECK.test(5.)).toEqual(true)
    })

    it('should return false for any non-numeric characters', () => {
      expect(NUMERIC_CHECK.test('ABC')).toEqual(false)
      expect(NUMERIC_CHECK.test(undefined)).toEqual(false)
      expect(NUMERIC_CHECK.test(NaN)).toEqual(false)
      expect(NUMERIC_CHECK.test(Infinity)).toEqual(false)
      expect(NUMERIC_CHECK.test(null)).toEqual(false)
    })
  })


  describe('POSITIVE_INTEGERS_ONLY', () => {
    it('should return true for any positive integers', () => {
      expect(POSITIVE_INTEGERS_ONLY.test(5)).toEqual(true)
      expect(POSITIVE_INTEGERS_ONLY.test(5.0)).toEqual(true)
      expect(POSITIVE_INTEGERS_ONLY.test('5')).toEqual(true)
    })

    it('should return false for any negative integers or decimals', () => {
      expect(POSITIVE_INTEGERS_ONLY.test(-5)).toEqual(false)
      expect(POSITIVE_INTEGERS_ONLY.test('-5')).toEqual(false)
      expect(POSITIVE_INTEGERS_ONLY.test(5.1)).toEqual(false)
      expect(POSITIVE_INTEGERS_ONLY.test('ABC')).toEqual(false)
    })

    it('should return false for any undefined-type values or letters', () => {
      expect(POSITIVE_INTEGERS_ONLY.test('A5')).toEqual(false)
      expect(POSITIVE_INTEGERS_ONLY.test('ABC')).toEqual(false)
      expect(POSITIVE_INTEGERS_ONLY.test(null)).toEqual(false)
      expect(POSITIVE_INTEGERS_ONLY.test(false)).toEqual(false)
      expect(POSITIVE_INTEGERS_ONLY.test(undefined)).toEqual(false)
      expect(POSITIVE_INTEGERS_ONLY.test(NaN)).toEqual(false)
      expect(POSITIVE_INTEGERS_ONLY.test(Infinity)).toEqual(false)
    })

  })

})
