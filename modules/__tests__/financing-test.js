/* eslint-env mocha */
import expect from 'expect'
import {Map as IMap} from 'immutable'
import {jobFinancing} from 'data/formatters'
const {calculateMonthlyPayments} = jobFinancing

describe('financing', () => {

  const typicalProduct = IMap({rate: 2.8, term: 36})
  const typicalPrincipal = 10829

  describe('calculateMonthlyPayments', () => {

    // TODO: calculateMonthlyPayments with and without cash down

    it('should calculate monthly payment with all positive non-zero numbers', () => {
      expect(calculateMonthlyPayments(typicalProduct, typicalPrincipal)).toEqual(313.97)
    })

    it('should calculate monthly payments even if rate and term are numbers as strings', () => {
      expect(calculateMonthlyPayments(IMap({rate: '2.8', term: '36'}), typicalPrincipal)).toEqual(313.97)
    })

    it('should be zero with zero or negative principal', () => {
      expect(calculateMonthlyPayments(typicalProduct, 0)).toEqual(0)
      expect(calculateMonthlyPayments(typicalProduct, -10)).toEqual(0)
    })

    it('should return principal / term if there is zero interest rate', () => {
      const product = IMap({rate: 0, term: 36})
      expect(calculateMonthlyPayments(product, typicalPrincipal)).toEqual(typicalPrincipal / product.get('term'))
    })

    // Users enter the interest rate into the app. Ideally we require an interest
    // zero or positive interest rate, but we don't want it to blow up if we miss it (could be pre-existing)
    it('should be zero with interest rates that are not well-defined, positive numbers', () => {
      expect(calculateMonthlyPayments(IMap({rate: -5, term: 36}), typicalPrincipal)).toEqual(0)
      expect(calculateMonthlyPayments(IMap({rate: null, term: 36}), typicalPrincipal)).toEqual(0)
      expect(calculateMonthlyPayments(IMap({rate: NaN, term: 36}), typicalPrincipal)).toEqual(0)
      expect(calculateMonthlyPayments(IMap({rate: Infinity, term: 36}), typicalPrincipal)).toEqual(0)
    })

    it('should be zero with terms that are zero or not well-defined, positive numbers', () => {
      expect(calculateMonthlyPayments(IMap({rate: 2.8, term: 0}), typicalPrincipal)).toEqual(0)
      expect(calculateMonthlyPayments(IMap({rate: 2.8, term: -36}), typicalPrincipal)).toEqual(0)
      expect(calculateMonthlyPayments(IMap({rate: 2.8, term: null}), typicalPrincipal)).toEqual(0)
      expect(calculateMonthlyPayments(IMap({rate: 2.8, term: NaN}), typicalPrincipal)).toEqual(0)
      expect(calculateMonthlyPayments(IMap({rate: 2.8, term: Infinity}), typicalPrincipal)).toEqual(0)
    })

  })
})
