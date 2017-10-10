import _ from 'lodash'
import {fromJS} from 'immutable'

// Defines all billingPlans

type billingPlanDefinitionType = {
  code: string,
  isSubscription: boolean,
  pricePerJob: ?number,
  basePrice: ?number,
  description: ?string,
  internalNote: ?string,
};

function validateBillingPlans(billingPlans: Array<billingPlanDefinitionType>) {
  return fromJS(billingPlans)
}

export default validateBillingPlans([
  // code: "30 is the fallback when no plan is detected"
  {
    code: "30",
    isSubscription: false,
    pricePerJob: 30,
    description: "",
  },
  {
    code: "27",
    isSubscription: false,
    pricePerJob: 27,
    description: ""
  },
  {
    code: "25",
    isSubscription: false,
    pricePerJob: 25,
    description: ""
  },
  {
    code: "200-20",
    isSubscription: true,
    basePrice: 200,
    pricePerJob: 20,
    jobsIncluded: 10,
    description: ""
  },
  {
    code: "300-15",
    isSubscription: true,
    basePrice: 300,
    pricePerJob: 15,
    jobsIncluded: 30,
    description: ""
  },
  {
    code: "480-12",
    isSubscription: true,
    basePrice: 480,
    pricePerJob: 12,
    jobsIncluded: 40,
    description: ""
  },
  {
    code: "1000-10",
    isSubscription: true,
    basePrice: 1000,
    pricePerJob: 10,
    jobsIncluded: 100,
    description: ""
  },

  // Grand fathered codes from offer
  {
    code: "25 az",
    isSubscription: false,
    pricePerJob: 25,
    description: ""
  },
  {
    code: "25 euc",
    isSubscription: false,
    pricePerJob: 25,
    description: ""
  },
  {
    code: "25 euc Steven Testing",
    isSubscription: false,
    pricePerJob: 25,
    description: ""
  },
  {
    code: "25 euc The Energuy",
    isSubscription: false,
    pricePerJob: 25,
    description: ""
  },
  {
    code: "25 gcea",
    isSubscription: false,
    pricePerJob: 25,
    description: ""
  },
  {
    code: "25 leap",
    isSubscription: false,
    pricePerJob: 25,
    description: ""
  },
  {
    code: "25 ny",
    isSubscription: false,
    pricePerJob: 25,
    description: ""
  },
  {
    code: "27 EF",
    isSubscription: false,
    pricePerJob: 27,
    description: ""
  },
  {
    code: "30 CO",
    isSubscription: false,
    pricePerJob: 30,
    description: ""
  },
  {
    code: "30 EM",
    isSubscription: false,
    pricePerJob: 30,
    description: ""
  },
  {
    code: "30 IL",
    isSubscription: false,
    pricePerJob: 30,
    description: ""
  },
  {
    code: "30 MN",
    isSubscription: false,
    pricePerJob: 30,
    description: ""
  },
  {
    code: "30 MO",
    isSubscription: false,
    pricePerJob: 30,
    description: ""
  },
  {
    code: "30 NJ",
    isSubscription: false,
    pricePerJob: 30,
    description: ""
  },
  {
    code: "30 PA",
    isSubscription: false,
    pricePerJob: 30,
    description: ""
  },
  {
    code: "30 WI",
    isSubscription: false,
    pricePerJob: 30,
    description: ""
  },
  {
    code: "FOE",
    isSubscription: true,
    description: ""
  },
  {
    code: "sub az",
    isSubscription: true,
    description: ""
  },
  {
    code: "sub euc",
    isSubscription: true,
    description: ""
  },
  {
    code: "sub fL",
    isSubscription: true,
    description: ""
  },
  {
    code: "sub ny",
    isSubscription: true,
    description: ""
  },
  {
    code: "sub ny Sealed Inc",
    isSubscription: true,
    description: ""
  },
  {
    code: "sub pre-pay",
    isSubscription: true,
    description: ""
  },
  {
    code: "sub tx",
    isSubscription: true,
    description: ""
  }
].map(p => {
  return _.defaults(p, {
    isSubscription: false,
    internalNote: '',
  })
}))
