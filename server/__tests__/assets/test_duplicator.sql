insert into `companies`
  (name, demo_company, created_at, updated_at) values
  ('Job Duplicator', 1, '2016-02-23 01:01:56', '2016-02-23 01:01:56');

insert into `accounts`
  (first_name, last_name, email, role, created_at, updated_at)
  values
  ('Johnny', 'Job Duplicator', 'duplicator@snugghome.com', 'user', '2016-02-23 00:54:50', '2016-02-23 00:54:50');

insert into `accounts_companies`
  (account_id, company_id, role)
  values
  (
    (select id from `accounts` where last_name = 'Job Duplicator'),
    (select id from `companies` where name = 'Job Duplicator'),
    'user'
  );
