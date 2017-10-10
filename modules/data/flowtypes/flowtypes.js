import {Map as IMap} from 'immutable'

export type validHPXMLStageType = "audit"
  | "proposed workscope"
  | "approved workscope"
  | "construction-period testing/daily test out"
  | "job completion testing/final inspection"
  | "quality assurance/monitoring";

export type hesAssessmentTypeTypes = 'initial'
  | 'alternative'
  | 'test'
  | 'final'
  | 'qa'

export type hesTransactionTypeTypes = 'create' | 'update'


export type cazTargetsMapType = {
  hvac: Array<IMap>,
  dhw: Array<IMap>,
  oven: Array<IMap>,
  range: Array<IMap>,
  clothesDryer: Array<IMap>,
};

export type rootStateType = {
  snugg: IMap,
  localState: IMap,
  routing: Object,
  fn: {
    [key: string]: Function
  },
};

/* From Tim on May 24th, 2016: Redux keys are camelized database table names.
Haven't had time to make this consistent. When we're doing stuff for OM we're
needing to keep track of what tables to write in. These types are used in some
places to help us know whether we're passing bad values.
*/

export type stateKeyType =
  'accounts'
  | 'accountsCompanies'
  | 'attic'
  | 'basedata'
  | 'caz'
  | 'cazSystem'
  | 'clothesDryer'
  | 'companies'
  | 'companiesPrograms'
  | 'concern'
  | 'dhw'
  | 'door'
  | 'financingTemplates'
  | 'freezer'
  | 'health'
  | 'hvac'
  | 'invitations'
  | 'jobFinancing'
  | 'jobs'
  | 'oven'
  | 'programs'
  | 'range'
  | 'recommendationCaptionRows'
  | 'recommendations'
  | 'refrigerator'
  | 'reports'
  | 'totals'
  | 'utilities'
  | 'vault'
  | 'wall'
  | 'window'
  | 'pv'
  | 'activityFeed'
  | 'activityTracking'
  ;

export type cazTargetKeyType = 'hvac' | 'dhw' | 'oven' | 'clothesDryer' | 'range';

type sharedCollectionNames = 'attic'
  | 'caz'
  | 'concern'
  | 'dhw'
  | 'door'
  | 'freezer'
  | 'hvac'
  | 'refrigerator'
  | 'vault'
  | 'wall'
  | 'window'
  | 'recommendations'
  | 'oven'
  | 'range'
  | 'clothes_dryer'
  | 'pv'
  ;

type collectionTablesSnake = 'clothes_dryer'
  | 'caz_system'
  | 'job_financing'
  | 'recommendation_caption_rows'
  ;

type collectionTablesCamel = 'clothesDryer'
  | 'cazSystem'
  | 'jobFinancing'
  | 'recommendationCaptionRows'
  ;

type collectionTableType = sharedCollectionNames | collectionTablesSnake;

export type collectionNameType = sharedCollectionNames | collectionTablesCamel;

export type jobTableNameType = 'basedata'
  | 'health'
  | 'utilities'
  | 'reports';

export type baseTableNameType = 'jobs'
  | 'companies'
  | 'programs'
  | 'accounts';

export type tableNameType = collectionTableType | jobTableNameType | baseTableNameType;

export type recDefinitionTypes = 'air_leakage'
  | 'attic'
  | 'basement'
  | 'cooling'
  | 'crawl'
  | 'dhw'
  | 'dhw_temp'
  | 'doors'
  | 'duct'
  | 'floor'
  | 'freezer'
  | 'heating'
  | 'lighting'
  | 'refrigerators'
  | 'thermostat'
  | 'wall'
  | 'window'
  | 'health'
  | 'custom'
  | 'vault'
  | 'pool'
  | 'dishwasher'
  | 'clotheswasher'
  | 'pv';

export type popoverDataType = {
  required: ?number | ?boolean,
  description: ?string,
  dataType: ?string,
  examples: ?Array<string>,
  validations: ?Array<string>
};

type optionObj = {
  displayValue: string,
  omValue?: string,
  omDval?: string,
  default?: bool
};

type optionGroupObj = {
  [key: string]: Array<optionsType>
};

type optionArr = [number | string, string];

export type optionsType = string | optionObj | optionGroupObj | optionArr;

export type fieldDefinitionType = {
  name: string,
  label?: string,
  collectionName?: collectionNameType,
  outputTable: string,
  outputColumn: string,
  description?: string,
  isSelect?: bool,
  hasImproved?: bool,
  improvedOnly?: bool,
  omA1BaseKey?: string,
  min?: number,
  max?: number,
  decimals?: number,
  suffix?: string,
  examples?: string,
  omDirectSetBase?: string,
  omDirectSetImproved?: string,
  options?: Array<optionsType>,
  improvedOptions?: Array<optionsType>,
  csv?: string,
  nullable?: bool,
  yesNo?: bool,
  hvacGroup?: 'heat' | 'cool' | 'duct',
  stateKey: string,
  tableType:
    'base' // jobs, companies, programs, invitations
    | 'jobCollection' // attic, vault, hvac, etc.
    | 'jobEntity' // utilities, report, etc.
    ;
};

export type stateType = {}
