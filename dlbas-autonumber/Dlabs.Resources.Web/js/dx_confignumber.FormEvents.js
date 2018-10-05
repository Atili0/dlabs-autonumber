/*
Copyright 2018 Deloitte Labs.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/// <reference path="v9_s2gfunction.js" />

/*
Enter a suitable multi line comment here. 
For formcontext more information in https://docs.microsoft.com/es-es/dynamics365/customer-engagement/developer/clientapi/clientapi-form-context
for executionContext more information in https://docs.microsoft.com/es-es/dynamics365/customer-engagement/developer/clientapi/clientapi-execution-context
*/

'use strict';

if (typeof (Dlabs) == "undefined") {
    Dlabs = { __namespace: true };
}
if (typeof (Dlabs.dx_confignumber) == "undefined") {
    Dlabs.dx_confignumber = { __namespace: true };
}
Dlabs.dx_confignumber.ForEvents = {
    _formLoad: function () {
        if (Xrm.Page.ui.getFormType() != 1) {
            S2G_V9.Controls.DisableControl("dx_entityname");
            S2G_V9.Controls.DisableControl("dx_fieldname");
            S2G_V9.Controls.DisableControl("dx_name");

            Dlabs.dx_confignumber.ForEvents._Set_Preview_In_Autonumber();
        }
        Xrm.Page.getAttribute("cel_preview").setSubmitMode("never");
    },
    _Set_Preview_In_Autonumber: function () {

        var _prefix = S2G_V9.Fields.GetValue("dx_prefix")
        var _suffix = S2G_V9.Fields.GetValue("dx_suffix")


        S2G_V9.Fields.SetValue("dx_preview", _prefix + Suffix)

    },
    _formSave: function (eContext) { }
}
/**
 * Returns the square of the number passed to the function.
 *  for formcontext more information in https://docs.microsoft.com/es-es/dynamics365/customer-engagement/developer/clientapi/clientapi-form-context
 *  for executionContext more information in https://docs.microsoft.com/es-es/dynamics365/customer-engagement/developer/clientapi/clientapi-execution-context
 * @param {number} input Specifies the value to be calculated.
 */

function main_load(pExecutionContext) {
    require.config({
        paths: {
            "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
            "s2gfunction": "../WebResources/relax_/js/v9_s2gfunction"
        }
    });

    S2G_V9.Context._executionContext = pExecutionContext;
    S2G_V9.Context._formContext = executionContext.getFormContext();

    require(['jquery', 's2gfunction'], function () {
        Dlabs.dx_confignumber.ForEvents._formLoad();
    });
};