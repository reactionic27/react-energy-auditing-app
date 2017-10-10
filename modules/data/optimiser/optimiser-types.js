
type valueType = {
  [key: string]: string
};
type returningType = Array<string>;

type identType = number | string;

type returningIntoType = {
  [key: string]: [string, identType, string]
};

type localContext = {
  values: ?Object, // Object here because it's unfiltered.
  returning: ?returningType,
  returningInto: ?returningIntoType,
  errors: ?Array
};

type collectionLocalContext = Array<localContext>;

export type omContextType = {
  payload: optimiserTablesType,
  values: valueType,
  returning: returningType,
  returningInto: returningIntoType,
  errors: Array,
  sections: {
    [key: string]: localContext | collectionLocalContext
  }
};

export type recommendationType = {
  cost: ?string | ?number,
  rec_definition_id: number,
  status: 0 | 1 | 2 | 3 | 4,
  touched_cost: ?bool | ?number,
};

export type recDefinitionType = {
  id: number,
  inclusionKey: ?string,
  improvedCostKey: ?string,
};

type pkType = {
  id: number
};
type jobIdType = {
  job_id: number
};
type collectionType = {
  job_id: number,
  uuid: string
};

export type healthType = jobIdType;
export type utilitiesType = jobIdType;

export type atticType = collectionType;
export type dhwType = collectionType;
export type doorType = collectionType;
export type freezerType = collectionType;
export type hvacType = collectionType;
export type refrigeratorType = collectionType;
export type vaultType = collectionType;
export type wallType = collectionType;
export type windowType = collectionType;
export type cazType = collectionType;
export type basedataType = jobIdType;
export type concernType = collectionType;
export type ovenType = collectionType;
export type rangeType = collectionType;
export type clothesDryerType = collectionType;

export type accountType = pkType;
export type companyType = pkType;

export type jobType = {
  id: number,
  first_name: ?string,
  last_name: ?string,
  home_phone: ?string
};

export type optimiserTablesType = {
  jobs: jobType,
  accounts: accountType,
  companies: companyType,

  basedata: basedataType,
  utilities: utilitiesType,

  attic: Array<atticType>,
  dhw: Array<dhwType>,
  door: Array<doorType>,
  freezer: Array<freezerType>,
  hvac: Array<hvacType>,
  refrigerator: Array<refrigeratorType>,
  vault: Array<vaultType>,
  wall: Array<wallType>,
  window: Array<windowType>,

  oven: Array<ovenType>,
  range: Array<rangeType>,
  clothesDryer: Array<clothesDryerType>,

  // health: healthType
  // caz: Array<cazType>,
  // concern: Array<concernType>,

  recommendations: Array<recommendationType>,
};
