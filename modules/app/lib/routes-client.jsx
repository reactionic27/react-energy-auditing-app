import React from 'react'
import {
  Route,
  IndexRoute,
  Redirect
} from 'react-router'

import Debug from 'app/debug'

import ApplicationContainer from 'app/_layouts/ApplicationContainer'
import JobContainer from 'app/_layouts/JobContainer'

import CreateJobContainer from 'app/job/CreateJobContainer'
import JobForm from 'app/jobform/JobForm'
import JobListContainer from 'app/jobs'

import FinancingContainer from 'app/financing'
import CreateFinancing from 'app/financing/FinancingCreateGeneral'
import EditFinancingTemplate from 'app/financing/FinancingEditGeneral'

import SettingsContainer from 'app/settings/SettingsContainer'
import SettingsAccount from 'app/settings/account/SettingsMainAccountForm'
import SettingsPassword from 'app/settings/account/SettingsPasswordForm'
import SettingsPreferences from 'app/settings/account/SettingsPreferences'
import SettingsFinancing from 'app/settings/financing/SettingsFinancingPage'
import SettingsTemplatesPage from 'app/settings/templates/SettingsTemplatesPage'

import CompanyList from 'app/settings/companies/CompanyList'
import CompanyLayout from 'app/settings/companies/CompanyLayout'
import CompanyBilling from 'app/settings/companies/CompanyBilling'
import CompanyInfo from 'app/settings/companies/CompanyInfo'
import CompanyUsers from 'app/settings/companies/CompanyUsers'

import RecommendationList from 'app/recommendations/RecommendationList'
import RecommendationPage from 'app/recommendations/RecommendationPage'

import ReportContainer from 'app/report/ReportContainer'

import ErrorPage from 'app/lib/error-page'

// Routes also need to be defined at snugg/shared/paths.js and on the server at app.js
// Server uses this to look up data based on path and also for customized history
export default (
  <Route component={ApplicationContainer}>
    <Route path="joblist/:companyId" component={JobListContainer} />
    <Route path="joblist/:companyId/stage/:stageId" component={JobListContainer} />
    <Route path="create-job(/:companyId)" component={CreateJobContainer} />
    <Route path="create-template(/:companyId)" component={CreateJobContainer} />
    <Route path="job/:jobId/present" component={ReportContainer} />
    <Route path="job/:jobId/print" component={ReportContainer} />
    <Route path="job/:jobId" component={JobContainer}>
      <Route path="recommendations(/:recType)" component={RecommendationList} />
      <Route path="recommendation/:recUuid" component={RecommendationPage} />
      <Route path="financing" component={FinancingContainer} />
      <Route path="financing/select" component={FinancingContainer} />
      <Route path="financing/create" component={FinancingContainer} />
      <Route path="financing/edit/:financingUuid" component={FinancingContainer} />
      <Route path="report" component={ReportContainer} />
      <Route path="report/hes-error-modal" component={ReportContainer} />
      <Route path="debug">
        <IndexRoute component={Debug} />
        <Route path=":debugPage" component={Debug} />
      </Route>
      <Route path="hvac/:hvacType" component={JobForm} />
      <Route path="quickrefine/:recommendationType" component={JobForm} />
      <Route path="cazsystem/:uuid" component={JobForm} />
      <IndexRoute component={JobForm} />
    </Route>
    <Route path="settings" component={SettingsContainer}>
      <Route path="password" component={SettingsPassword} />
      <Route path="preferences" component={SettingsPreferences} />
      <Route path="companies" component={CompanyList} />
      <Route path="companies/add-new" component={CompanyList} />
      <Route path="company/:companyId" component={CompanyLayout}>
        <Route path="users" component={CompanyUsers} />
        <Route path="billing" component={CompanyBilling} />
        <IndexRoute component={CompanyInfo} />
      </Route>
      <Route path="financing" component={SettingsFinancing} />
      <Route path="financing/create" component={CreateFinancing} />
      <Route path="financing/edit/:financingId" component={EditFinancingTemplate} />
      <Route path="templates" component={SettingsTemplatesPage} />
      <IndexRoute component={SettingsAccount} />
    </Route>
    <Redirect from="/job/:jobId/" to="/job/:jobId" />
    <Route path="*" component={ErrorPage} />
  </Route>
)
