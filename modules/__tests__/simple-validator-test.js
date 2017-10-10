/* eslint-env mocha */
import expect from 'expect'
import {decimalsWithinLimits} from '../util/simpleValidator'


describe('simpleValidator', () => {

  describe('decimalsWithinLimits', () => {

    const allowedDecimals = 2

    it('should return true for integers', () => {
      expect(decimalsWithinLimits(3, allowedDecimals)).toEqual(true)
    })

    it('should return true for decimals up to and including allowedDecimals', () => {
      expect(decimalsWithinLimits(3.1, allowedDecimals)).toEqual(true)
      expect(decimalsWithinLimits(3.14, allowedDecimals)).toEqual(true)
    })

    it('should allow numbers to start with a zero', () => {
      expect(decimalsWithinLimits(0.14, allowedDecimals)).toEqual(true)
      expect(decimalsWithinLimits(0.141, allowedDecimals)).toEqual(false)
    })

    it('should allow numbers to start with a decimal', () => {
      expect(decimalsWithinLimits(.14, allowedDecimals)).toEqual(true)
      expect(decimalsWithinLimits(.141, allowedDecimals)).toEqual(false)
    })

    it('should return false for decimals greater than allowedDecimals', () => {
      expect(decimalsWithinLimits(3.141, allowedDecimals)).toEqual(false)
    })

  })
})
