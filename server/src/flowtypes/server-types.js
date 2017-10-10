
export type uuidRemapType = {
  [uuid: string]: string
};

export type transactionType = {
  commit: Function,
  rollback: Function
};

// All of these collections can be copied over without
// running into any uuid foreign key issues (caz system, rec caption)
export type simpleCollectionType = 'v5_attic'
  | 'v5_caz'
  | 'v5_concern'
  | 'v5_clothes_dryer'
  | 'v5_dhw'
  | 'v5_door'
  | 'v5_freezer'
  | 'v5_hvac'
  | 'v5_oven'
  | 'v5_range'
  | 'v5_refrigerator'
  | 'v5_vault'
  | 'v5_wall'
  | 'v5_window'
  | 'v5_job_financing'
  | 'v5_pv'
  ;

// All of these tables are copied over without
// needing to check for deleted_at, or set a uuid
export type simpleTableType = 'v5_basedata'
  | 'v5_reports'
  | 'v5_health'
  | 'v5_utilities'
  | 'v5_totals'
  ;
