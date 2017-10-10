## Root State

The application state is managed into different sections:


#### snugg: `Immtuable.Map`

Populated by a dump of whatever is needed to render from the server when navigating
to a particular URL. The `v4_` prefix from the database is stripped and the
field is camelized (occurs in modules/util/transitReader.js)

#### schema: `Immutable.Map`

A dump of all of the non-changing table definitions, optiongroups, etc. used in
the application.

#### localState: `Immutable.Map`

All information persisted to localStorage:

##### lastCompanyId: `number`

##### fieldPopovers: `Immutable.Map`

##### visitedUrls: `Immutable.Set`

#### conditionalSchema: Object

All of the named conditionals which are re-calculated on page

#### snuggIndexes / schemaIndexes: `Immtuable.Map`

In order to get quick lookups by indexes, we index all of the tables using `indexReducerCreator.js`.
The details of this file are not important, basically it just loops through and checks if any of the indexed fields have been updated when we've determined an update has taken place via `immutable-diff`.
