/*
Copyright (C) Deloitte Labs. - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Atilio Rosas <arosasdeloitte.es>,
*/

if (typeof (S2G_V9) == "undefined") { S2G_V9 = { __namespace: true }; }

/** Returns the square of the number passed to the function
 */
S2G_V9.Context = {
    _formContext: "",
    _executionContext: "",
    _UciExecutionContext: "",
    _globalContext: "",
    _appInfo: "",
    _isUCI: null,
    //Get Server Url
    //USE GetServerUrl()
    GetServerUrl: function () {
        var serverUrl = "";
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            if (typeof context.getClientUrl != "undefined" && typeof context.getClientUrl == "function") {
                serverUrl = context.getClientUrl();
            }
            else {
                serverUrl = context.getServerUrl();
            }
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                if (typeof Xrm.Page.context.getClientUrl != "undefined" && typeof Xrm.Page.context.getClientUrl == "function") {
                    serverUrl = Xrm.Page.context.getClientUrl();
                }
                else {
                    serverUrl = Xrm.Page.context.getServerUrl();
                }
            }
            else {
                throw new Error("Unable to access the server URL");
            }
        }
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    },
    //Get Server Url
    //USE GetServerUrl()
    GetUserId: function () {
        var userId;
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            userId = context.getUserId();
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                userId = Xrm.Page.context.getUserId();
            }
            else {
                throw new Error("Unable to access User ID");
            }
        }
        return userId;
    },
    //Returns the GUID's of the roles to which the user belongs
    //USE: GetUserRoles()
    GetUserRoles: function () {
        var currentUserRoles = null;
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            currentUserRoles = context.getUserRoles();
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                currentUserRoles = Xrm.Page.context.getUserRoles();
            }
            else {
                throw new Error("Unable to access User Roles");
            }
        }
        return currentUserRoles;
    },
    //Return the Organization Name
    GetOrganizationName: function () {
        var organizationName;
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            userId = context.getOrgUniqueName();
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                userId = Xrm.Page.context.getOrgUniqueName();
            }
            else {
                throw new Error("Unable to access Organization Name");
            }
        }
        return organizationName;
    },
    GetContext: function () {
        if (typeof GetGlobalContext == "function") {
            this._globalContext = GetGlobalContext();
        }
        else {
            if (typeof Xrm.Utility.getGlobalContext == "function") {
                this._globalContext = Xrm.Utility.getGlobalContext();
            }
            else if (typeof Xrm.Page.context == "object") {
                this._globalContext = Xrm.Page.context;
            }
            else {
                throw new Error("Unable to access Context");
            }
        }
        return this._globalContext;
    },
    GetServerUrlMetadata: function () {
        var serverUrl = "";
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            if (typeof context.getClientUrl != "undefined" && typeof context.getClientUrl == "function") {
                serverUrl = context.getClientUrl() + "/XRMServices/2011/Organization.svc/web";
            }
            else {
                serverUrl = context.getServerUrl() + "/XRMServices/2011/Organization.svc/web";
            }
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                if (typeof Xrm.Page.context.getClientUrl != "undefined" && typeof Xrm.Page.context.getClientUrl == "function") {
                    serverUrl = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/Organization.svc/web";
                }
                else {
                    serverUrl = Xrm.Page.context.getServerUrl() + "/XRMServices/2011/Organization.svc/web";
                }
            }
            else {
                throw new Error("Unable to access the server URL");
            }
        }
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    },
    GetEntityName: function () {
        return Xrm.Page.data.entity.getEntityName();
    },
    GetApplicationInformation: function () {
        var globalContext = S2G_V9.Context.GetContext();
        this._appInfo = globalContext.getCurrentAppProperties();
        if (this._appInfo != null)
            this._isUCI = true;
        else this._isUCI = false;
    },
    IsUCIContext: function (pPrimaryControl) {
        try {
            if (S2G_V9.Context.GetApplicationInformation() !== null && this._isUCI == true) {
                this._UciExecutionContext = pPrimaryControl.ui;
            }
            else {
                this._UciExecutionContext = pPrimaryControl.getFormContext();
            }
        } catch (e) {
            this._globalContext = S2G_V9.Context.GetContext();
        }
    },
    __namespace: true
};

/** Enter a suitable multi line comment here.
* */
S2G_V9.Controls = {
    //Get Control
    //USET: GetControl('CONTROL_NAME');
    GetControl: function (controlName) {
        try {
            var control = Xrm.Page.getControl(controlName);
            if (control != null && typeof (control) != undefined) {
                return control;
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    },
    //Disable Control
    // USE: DisableControl('CONTROL_NAME'); to Disable CONTROL_NAME;
    DisableControl: function (controlName) {
        this.EnableDisableControl(controlName, true);
    },
    //Enable Control
    // USE: EnableControl('CONTROL_NAME');  to Enable CONTROL_NAME
    EnableControl: function (controlName) {
        this.EnableDisableControl(controlName, false);
    },
    // USE DisableControl('CONTROL_NAME',true to disable or false to enable);
    EnableDisableControl: function (controlName, value) {
        var control = this.GetControl(controlName)
        if (control != null) {
            control.setDisabled(value);
        }
    },
    // Disable all controls in form
    DisableAllControls: function () {
        this.EnableDisableAllControls(true);
    },
    // Disable all controls in form
    EnableAllControls: function () {
        this.EnableDisableAllControls(false);
    },
    // Enable or Disable all controls in form
    EnableDisableAllControls: function (disable) {
        Xrm.Page.ui.controls.forEach(function (control, index) {
            var controlType = control.getControlType();
            if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid") {
                control.setDisabled(disable);
            }
        });
    },
    //Show and Hide Control
    // USE HideControl('CONTROL_NAME');
    ShowControl: function (controlName) {
        this.ShowHideControl(controlName, true);
    },
    // USE ShowControl('CONTROL_NAME');
    HideControl: function (controlName) {
        this.ShowHideControl(controlName, false);
    },
    // USE HideControlAndSpace('CONTROL_NAME');
    HideControlAndSpace: function (controlName) {
        var show = false;
        var displayStyle = show ? 'block' : 'none';
        if (document.getElementById(controlName + '_c') != null && document.getElementById(controlName + '_d') != null) {
            document.getElementById(controlName + '_c').style.display = displayStyle;
            document.getElementById(controlName + '_d').style.display = displayStyle;
        }

        //if (document.getElementById(controlName + '_d') != null && document.getElementById(controlName + '_d').parentElement != null) {
        //    document.getElementById(controlName + '_d').parentElement.style.display = 'none';
        //}
    },
    // USE ShowHideControl('CONTROL_NAME',false to hide control or true to show control);
    ShowHideControl: function (controlName, value) {
        var control = this.GetControl(controlName)
        if (control != null) {
            control.setVisible(value);
        }
    },
    //Set Focus to Control
    // USE SetFocusToControl('CONTROL_NAME');
    SetFocusToControl: function (controlName) {
        var control = this.GetControl(controlName);
        if (control != null) {
            control.setFocus(true);;
        }
    },
    __namespace: true
};

S2G_V9.Fields = {
    FIELD_REQUIRED_LEVEL_NONE: 'none',
    FIELD_REQUIRED_LEVEL_REQUIRED: 'required',
    FIELD_REQUIRED_LEVEL_RECOMENDED: 'recommended',
    FIELD_SUBMIT_MODE_ALWAYS: 'always',
    FIELD_SUBMIT_MODE_NEVER: 'never',
    FIELD_SUBMIT_MODE_DIRTY: 'dirty',
    //Get Field
    //USE GetField('FIELD_NAME');
    GetField: function (fieldName) {
        if (typeof (Xrm.Page.getAttribute) == 'undefined') {
            return null;
        }
        var field = Xrm.Page.getAttribute(fieldName);
        if (typeof (field) != 'undefined' && field != null) {
            return field;
        }
        else {
            return null;
        }
    },
    //Get Field Value
    //USE GetFieldValue('FIELD_NAME');
    GetFieldValue: function (fieldName) {
        var field = this.GetField(fieldName);
        if (field != null) {
            return field.getValue();
        }
        else {
            return null;
        }
    },
    //manually trigger the onchange of field
    //USE LaunchOnchangeEventField('FIELD_NAME');
    LaunchOnchangeEventField: function (fieldName) {
        var field = this.GetField(fieldName);
        if (field != null) {
            field.fireOnChange();
        }
    },
    //Set value to Field
    // USE SetFieldValue('FIELD_NAME','FIELD_VALUE', PRECISION);
    SetFieldValue: function (fieldName, fieldValue, precision) {
        var field = this.GetField(fieldName);
        if (field != null) {
            if (typeof (fieldValue) == 'number') {
                if (field.getAttributeType() == 'integer' || field.getAttributeType() == 'optionset') {
                    //is integer
                    field.setValue(eval(fieldValue));
                }
                else {
                    if (precision != null) {
                        fieldValue.toFixed(precision);
                    }
                    field.setValue(parseFloat(eval(fieldValue)));
                }
            }
            else {
                field.setValue(fieldValue);
            }
        }
    },
    //Set Level required to a Field
    //USE
    //VALUES of requiredLevel are: FIELD_REQUIRED_LEVEL_NONE, FIELD_REQUIRED_LEVEL_REQUIRED and FIELD_REQUIRED_LEVEL_REQUIRED
    SetFieldRequiredLevel: function (fieldName, requiredLevel) {
        var field = this.GetField(fieldName);
        if (field != null) {
            field.setRequiredLevel(requiredLevel);
        }
    },
    //Return a Array with all fields that have been modified in form
    GetAllModifyFields: function () {
        var newArray = [];
        var attributes = Xrm.Page.data.entity.attributes.get();
        for (var i in attributes) {
            var attribute = attributes[i];
            if (attribute.getIsDirty()) {
                newArray.push(attribute);
            }
        }
        return newArray;
    },
    //This method is used to validate any field as it accepts Fieldname and Regular Expression
    //USE: ValidateField(fieldName, RegEx)
    ValidateField: function (fieldName, RegEx) {
        var regularExpression = RegEx;

        try {
            var control = S2G_V9.Controls.GetControl(fieldName);
            var fieldValue = this.GetFieldValue(fieldName);
            if (regularExpression.test(fieldValue) == false) {
                alert("You must provide the " + control.getLabel() + " in proper format.");
                return false;
            }
            return;
        }
        catch (e) {
            alert('Field validation failed with exception ' + e.Message);
            return false;
        }
    },
    //This method is used to validate Integer value and it also accepts negative (-) values
    //USE ValidateFieldNumber(fieldName);
    ValidateFieldNumber: function (fieldName) {
        var number = /(^-?\d\d*$)/;

        return this.ValidateField(fieldName, number);
    },
    //This method is used to validate mail value
    //USE ValidateFieldEmail(fieldName);
    ValidateFieldEmail: function (fieldName) {
        var email = /(^[a-z]([a-z_\.]*)@([a-z_\.]*)([.][a-z]{3})$)|(^[a-z]([a-z_\.]*)@([a-z_\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i;
        return this.ValidateField(fieldName, email);
    },
    //Set Submit Mode to a Field
    //USE
    //VALUES of submitMode are: FIELD_SUBMIT_MODE_ALWAYS, FIELD_SUBMIT_MODE_NEVER, FIELD_SUBMIT_MODE_DIRTY
    SetFieldSubmitMode: function (fieldName, submitMode) {
        try {
            var field = this.GetField(fieldName);
            field.setSubmitMode(submitMode);
        }
        catch (e) {
        }
    },

    ValidateFieldDate: function (fieldName) {
        var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        // Match the date format through regular expression
        if (fieldName.value.match(dateformat)) {
            //document.form1.text1.focus();
            //Test which seperator is used '/' or '-'
            var opera1 = fieldName.value.split('/');
            var opera2 = fieldName.value.split('-');
            lopera1 = opera1.length;
            lopera2 = opera2.length;
            // Extract the string into month, date and year
            if (lopera1 > 1) {
                var pdate = fieldName.value.split('/');
            }
            else if (lopera2 > 1) {
                var pdate = fieldName.value.split('-');
            }
            var dd = parseInt(pdate[0]);
            var mm = parseInt(pdate[1]);
            var yy = parseInt(pdate[2]);
            // Create list of days of a month [assume there is no leap year by default]
            var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (mm == 1 || mm > 2) {
                if (dd > ListofDays[mm - 1]) {
                    return false;
                }
            }
            if (mm == 2) {
                var lyear = false;
                if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                    lyear = true;
                }
                if ((lyear == false) && (dd >= 29)) {
                    return false;
                }
                if ((lyear == true) && (dd > 29)) {
                    return false;
                }
            }
        }
        else {
            return false;
        }
        return true;
    },

    __namespace: true
};

/** Enter a suitable multi line comment here.
* */
S2G_V9.Lookups = {
    //Set value to Lookup
    // USE
    //SetLookupValue("new_blogid", "{AAAAAA-4DF4-11DD-BD17-0019B9312238}", "Name to Show", "new_entity");
    SetLookupValue: function (lookupFieldName, id, name, entityName) {
        var lookupValue = new Array();
        lookupValue[0] = new Object();
        lookupValue[0].id = id;
        lookupValue[0].name = name;
        lookupValue[0].entityType = entityName;
        S2G_V9.Fields.SetFieldValue(lookupFieldName, lookupValue);
    },
    //Get guid value of Lookup
    //USE GetLookupName('FIELD_NAME');
    GetLookupValue: function (lookupName) {
        var lookupValue = S2G_V9.Fields.GetFieldValue(lookupName);
        if (lookupValue != null) {
            return lookupValue[0].id;
        }
        else {
            return null;
        }
    },
    //Get name showing in a Lookup, this name is the name of referential record
    //USE GetLookupName('FIELD_NAME');
    GetLookupName: function (lookupName) {
        var lookupValue = S2G_V9.Fields.GetFieldValue(lookupName);
        if (lookupValue != null) {
            return lookupValue[0].name;
        }
        else {
            return null;
        }
    },
    //Get GetLookupTypeName of Lookup
    //USE GetLookupTypeName('FIELD_NAME');
    GetLookupTypeName: function (lookupName) {
        var lookupValue = S2G_V9.Fields.GetFieldValue(lookupName);
        if (lookupValue != null) {
            return lookupValue[0].entityType;
        }
        else {
            return null;
        }
    },

    SetLookupNull: function (lookupName) {
        S2G_V9.Fields.SetFieldValue(lookupName, null);
    },
    __namespace: true
};

/** @description Determines the area of a circle that has the specified radius parameter.
 */
S2G_V9.Rest = {
    /**
     * Returns the square of the number passed to the function.
     */
    _ODataPath: function () {
        return S2G_V9.Context.GetServerUrl() + "/api/data/v8.2/";
    },
    _errorHandler: function (req) {
        ///<summary>
        /// Private function return an Error object to the errorCallback
        ///</summary>
        ///<param name="req" type="XMLHttpRequest">
        /// The XMLHttpRequest response that returned an error.
        ///</param>
        ///<returns>Error</returns>
        //Error descriptions come from http://support.microsoft.com/kb/193625
        if (req.status == 12029) { return new Error("The attempt to connect to the server failed."); }
        if (req.status == 12007) { return new Error("The server name could not be resolved."); }
        if (req.status == 500) { return new Error("Internal Server Error."); }
        if (req.status == 400) { return new Error("Datos no válidos."); }
        var errorText;
        try { errorText = JSON.parse(req.responseText).error.message.value; }
        catch (e) { errorText = req.responseText }
        return new Error("Error : " +
            req.status + ": " +
            req.statusText + ": " + errorText);
    },
    _dateReviver: function (key, value) {
        ///<summary>
        /// Private function to convert matching string values to Date objects.
        ///</summary>
        ///<param name="key" type="String">
        /// The key used to identify the object property
        ///</param>
        ///<param name="value" type="String">
        /// The string value representing a date
        ///</param>
        var a;
        if (typeof value === 'string') {
            a = /Date\(([-+]?\d+)\)/.exec(value);
            if (a) {
                return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
        }
        return value;
    },
    _parameterCheck: function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="Object">
        /// The parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if ((typeof parameter === "undefined") || parameter === null) {
            throw new Error(message);
        }
    },
    _stringParameterCheck: function (parameter, message) {
        if (typeof parameter != "string") {
            throw new Error(message);
        }
    },
    _callbackParameterCheck: function (callbackParameter, message) {
        if (typeof callbackParameter != "function") {
            throw new Error(message);
        }
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    createRecord: function (object, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends an asynchronous request to create a new record.
        ///</summary>
        ///<param name="object" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        ///</param>
        this._parameterCheck(object, "S2G.Rest.createRecord requires the object parameter.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to create.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "S2G.Rest.createRecord requires the type parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function can accept the returned record as a parameter.
        /// </param>
        this._callbackParameterCheck(successCallback, "S2G.Rest.createRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "S2G.Rest.createRecord requires the errorCallback is a function.");
        var req = new XMLHttpRequest();
        if (async == null) {
            async = false;
        }

        var req = new XMLHttpRequest();
        req.open("POST", encodeURI(this._ODataPath() + type + ""), async);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204) {
                    var uri = this.getResponseHeader("OData-EntityId");
                    var regExp = /\(([^)]+)\)/;
                    var matches = regExp.exec(uri);
                    var newEntityId = matches[1];

                    successCallback(newEntityId);
                } else {
                    errorCallback(this.response);
                }
            }
        };
        req.send(JSON.stringify(object));
    },
    updateRecord: function (id, object, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends an asynchronous request to update a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to retrieve.
        ///</param>
        this._stringParameterCheck(id, "S2G.Rest.updateRecord requires the id parameter.");
        ///<param name="object" type="Object">
        /// A JavaScript object with properties corresponding to the Schema Names for
        /// entity attributes that are valid for update operations.
        ///</param>
        this._parameterCheck(object, "S2G.Rest.updateRecord requires the object parameter.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to retrieve.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "S2G.Rest.updateRecord requires the type parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// Nothing will be returned to this function.
        /// </param>
        this._callbackParameterCheck(successCallback, "S2G.Rest.updateRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "S2G.Rest.updateRecord requires the errorCallback is a function.");

        var req = new XMLHttpRequest();
        if (async == null) {
            async = false;
        }
        req.open("PATCH", encodeURI(this._ODataPath() + type + "(" + id + ")"), async);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204) {
                    successCallback();
                } else {
                    errorCallback(this.response);
                }
            }
        };
        req.send(JSON.stringify(object));
    },

    /** @description Determines the area of a circle that has the specified radius parameter.
    */
    deleteRecord: function (id, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends an asynchronous request to delete a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to delete.
        ///</param>
        this._stringParameterCheck(id, "S2G.Rest.deleteRecord requires the id parameter.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to delete.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "S2G.Rest.deleteRecord requires the type parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// Nothing will be returned to this function.
        /// </param>
        this._callbackParameterCheck(successCallback, "S2G.Rest.deleteRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "S2G.Rest.deleteRecord requires the errorCallback is a function.");
        var req = new XMLHttpRequest();
        if (async == null) {
            async = false;
        }

        req.open("DELETE", encodeURI(this._ODataPath() + type + "(" + id + ")"), async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204 || this.status == 1223) {
                    successCallback();
                }
                else {
                    errorCallback(S2G.Rest._errorHandler(this));
                }
            }
        };
        req.send();
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    retrieveRecord: function (id, type, select, expand, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends an asynchronous request to retrieve a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to retrieve.
        ///</param>
        this._stringParameterCheck(id, "S2G.Rest.retrieveRecord requires the id parameter is a string.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to retrieve.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "S2G.Rest.retrieveRecord requires the type parameter is a string.");
        ///<param name="select" type="String">
        /// A String representing the $select OData System Query Option to control which
        /// attributes will be returned. This is a comma separated list of Attribute names that are valid for retrieve.
        /// If null all properties for the record will be returned
        ///</param>
        if (select != null)
            this._stringParameterCheck(select, "S2G.Rest.retrieveRecord requires the select parameter is a string.");
        ///<param name="expand" type="String">
        /// A String representing the $expand OData System Query Option value to control which
        /// related records are also returned. This is a comma separated list of of up to 6 entity relationship names
        /// If null no expanded related records will be returned.
        ///</param>
        if (expand != null)
            this._stringParameterCheck(expand, "S2G.Rest.retrieveRecord requires the expand parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function must accept the returned record as a parameter.
        /// </param>
        this._callbackParameterCheck(successCallback, "S2G.Rest.retrieveRecord requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "S2G.Rest.retrieveRecord requires the errorCallback parameter is a function.");

        var systemQueryOptions = "";

        if (select != null || expand != null) {
            systemQueryOptions = "?";
            if (select != null) {
                var selectString = "$select=" + select;
                if (expand != null) {
                    selectString = selectString + "," + expand;
                }
                systemQueryOptions = systemQueryOptions + selectString;
            }
            if (expand != null) {
                systemQueryOptions = systemQueryOptions + "&$expand=" + expand;
            }
        }

        if (async == null) {
            async = false;
        }
        var req = new XMLHttpRequest();
        var _url = encodeURI(this._ODataPath() + type + "(" + id + ")" + systemQueryOptions);
        req.open("GET", _url, async);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    successCallback(JSON.parse(this.responseText, S2G_V9.Rest._dateReviver));
                }
                else {
                    errorCallback(S2G_V9.Rest._errorHandler(this));
                }
            }
        };
        req.send();
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {string} guidRecord Specifies the value to be calculated.
     * @param {string} entityName Specifies the value to be calculated.
     * @param {string} fields
     */
    retrieveSimpleRecord: function (guidRecord, entityName, fields) {
        var resultado = null;
        S2G_V9.Rest.retrieveRecord(
            guidRecord,
            entityName,
            fields, null,
            function (result) {
                if (result != null) {
                    resultado = result;
                }
            },
            errorHandler
        );
        return resultado;
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    retrieveMultipleRecords: function (type, options, successCallback, errorCallback, OnComplete, async, encode) {
        ///<summary>
        /// Sends an asynchronous request to retrieve records.
        ///</summary>
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to retrieve.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "S2G.Rest.retrieveMultipleRecords requires the type parameter is a string.");
        ///<param name="options" type="String">
        /// A String representing the OData System Query Options to control the data returned
        ///</param>
        if (options != null)
            this._stringParameterCheck(options, "S2G.Rest.retrieveMultipleRecords requires the options parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called for each page of records returned.
        /// Each page is 50 records. If you expect that more than one page of records will be returned,
        /// this function should loop through the results and push the records into an array outside of the function.
        /// Use the OnComplete event handler to know when all the records have been processed.
        /// </param>
        this._callbackParameterCheck(successCallback, "S2G.Rest.retrieveMultipleRecords requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "S2G.Rest.retrieveMultipleRecords requires the errorCallback parameter is a function.");
        ///<param name="OnComplete" type="Function">
        /// The function that will be called when all the requested records have been returned.
        /// No parameters are passed to this function.
        /// </param>
        this._callbackParameterCheck(OnComplete, "S2G.Rest.retrieveMultipleRecords requires the OnComplete parameter is a function.");

        var optionsString;
        if (options != null) {
            if (options.charAt(0) != "?") {
                optionsString = "?$" + options;
            }
            else {
                optionsString = options;
            }
        }
        var req = new XMLHttpRequest();
        var asyncExecution = false; //Synchronous by default
        if (async != null) {
            asyncExecution = async;
        }

        if (encode == null) {
            req.open("GET", encodeURI(this._ODataPath() + type + "" + optionsString), asyncExecution);
        }
        else {
            req.open("GET", this._ODataPath() + type + "" + optionsString, asyncExecution);
        }

        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                this.onreadystatechange = null; //avoids memory leaks
                if (this.status == 200) {
                    var returned = JSON.parse(this.responseText, S2G_V9.Rest._dateReviver);
                    if (returned.value.length > 0)
                        successCallback(returned.value);

                    if (returned.__next != null) {
                        var queryOptions = returned.__next.substring((S2G_V9.Rest._ODataPath() + type + "Set").length);
                        S2G_V9.Rest.retrieveMultipleRecords(type, queryOptions, successCallback, errorCallback, OnComplete, asyncExecution, false);
                    }
                    else {
                        OnComplete(returned);
                    }
                }
                else {
                    errorCallback(S2G.Rest._errorHandler(this));
                }
            }
        };
        req.send();
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    disassociateRecords: function (parentId, parentType, relationshipName, childId, successCallback, errorCallback, async) {
        this._stringParameterCheck(parentId, "SDK.REST.disassociateRecords requires the parentId parameter is a string.");
        this._stringParameterCheck(parentType, "SDK.REST.disassociateRecords requires the parentType parameter is a string.");
        this._stringParameterCheck(relationshipName, "SDK.REST.disassociateRecords requires the relationshipName parameter is a string.");
        this._stringParameterCheck(childId, "SDK.REST.disassociateRecords requires the childId parameter is a string.");
        this._callbackParameterCheck(successCallback, "SDK.REST.disassociateRecords requires the successCallback parameter is a function.");
        this._callbackParameterCheck(errorCallback, "SDK.REST.disassociateRecords requires the errorCallback parameter is a function.");
        if (async == null) {
            async = false;
        }
        var req = new XMLHttpRequest();
        var _url = encodeURI(this._ODataPath() + parentType + "(" + parentId + ")/" + relationshipName + "(" + childId + ")/$ref", false);
        req.open("DELETE", _url);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204 || this.status === 1223) {
                    successCallback();
                } else {
                    errorCallback(S2G_V9.Rest._errorHandler(this));
                }
            }
        };
        req.send();
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    associateRecords: function (parentId, parentType, relationshipName, childId, childType, successCallback, errorCallback, async) {
        this._stringParameterCheck(parentId, "SDK.REST.associateRecords requires the parentId parameter is a string.");
        this._stringParameterCheck(parentType, "SDK.REST.associateRecords requires the parentType parameter is a string.");
        this._stringParameterCheck(relationshipName, "SDK.REST.associateRecords requires the relationshipName parameter is a string.");
        this._stringParameterCheck(childId, "SDK.REST.associateRecords requires the childId parameter is a string.");
        this._stringParameterCheck(childType, "SDK.REST.associateRecords requires the childType parameter is a string.");
        this._callbackParameterCheck(successCallback, "SDK.REST.associateRecords requires the successCallback parameter is a function.");
        this._callbackParameterCheck(errorCallback, "SDK.REST.associateRecords requires the errorCallback parameter is a function.");
        if (async == null) {
            async = false;
        }

        var association = {
            "@odata.id": this._ODataPath() + parentType + "(" + parentId + ")",
        };

        var req = new XMLHttpRequest();
        var _url = encodeURI(this._ODataPath() + childType + "(" + childId + ")/" + relationshipName + "/$ref", async)
        req.open("POST", _url);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204 || this.status === 1223) {
                    successCallback();
                } else {
                    errorCallback(S2G_V9.Rest._errorHandler(this));
                }
            }
        };
        req.send(JSON.stringify(association));
    },
    __namespace: true
};


S2G_V9.Fetch = {
    _ODataPath: function () {
        return S2G_V9.Context.GetServerUrl() + "/api/data/v9.0/";
    },
    _dateReviver: function (key, value) {
        ///<summary>
        /// Private function to convert matching string values to Date objects.
        ///</summary>
        ///<param name="key" type="String">
        /// The key used to identify the object property
        ///</param>
        ///<param name="value" type="String">
        /// The string value representing a date
        ///</param>
        var a;
        if (typeof value === 'string') {
            a = /Date\(([-+]?\d+)\)/.exec(value);
            if (a) {
                return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
        }
        return value;
    },
    GetResultByFetchHttpRequest: function (entity, fetchXmlQuery, successCallback, errorCallback) {
        var clientURL = location.protocol + '//' + location.host;
        var _url = encodeURI(this._ODataPath());

        var req = new XMLHttpRequest();
        req.open(
            "GET",
            _url + entity +"?fetchXml=" +
            encodeURIComponent(fetchXmlQuery),
            true
        );
        req.setRequestHeader("Prefer", 'odata.include-annotations="*"');
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    //var results = JSON.parse(this.response);
                    
                    var returned = JSON.parse(this.responseText, S2G_V9.Fetch._dateReviver);
                    console.dir(returned);
                    //alert(JSON.stringify(results));
                    successCallback(returned);
                } else {
                    errorCallback(this.response);
                }
            }
        };
        req.send();

    },
    //GetResultByFetchAWebApi: function (fetchXmlQuery, successCallback, errorCallback) {
    //    var clientURL = location.protocol + '//' + location.host;

    //    fetch(
    //        clientURL +
    //        "/api/data/v9.0/incidents?fetchXml=" +
    //        encodeURIComponent(fetchXmlQuery),
    //        {
    //            credentials: "same-origin",
    //            headers: {
    //                Prefer: 'odata.include-annotations="*"'
    //            }
    //        }
    //    )
    //        .then(response => response.json())
    //        .then(result => {
    //            console.dir(result);
    //            //alert(JSON.stringify(result));
    //            successCallback(JSON.stringify(result));
    //        })
    //        .catch(error => {
    //            console.error("Error:", error);
    //            successCallback(error);
    //        });
    //},
    __namespace: true
};

/** Enter a suitable multi line comment here.
* */
S2G_V9.Notifications = {
    INFORMATION_ALERT: "INFO",
    WARNING_ALERT: "WARNING",
    ERROR_ALERT: "ERROR",

    /**
     * Returns the square of the number passed to the function.
     * @param {string} pMessageToShow Specifies the value to be calculated.
     * @param {int} pIdAlert Specifies the value to be calculated.
     */
    ShowInfoAlert: function (pMessageToShow, pMessageId) {
        Xrm.Page.ui.setFormNotification(pMessageToShow, this.INFORMATION_ALERT, pMessageId);
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    ShowCriticalAlert: function (pMessageToShow, pMessageId) {
        Xrm.Page.ui.setFormNotification(pMessageToShow, this.ERROR_ALERT, pMessageId);
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    RemoveAllAlert: function () {
        Xrm.Page.ui.clearFormNotification()
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    ShowInfoInField: function (pField, pMessage) {
        Xrm.Page.getControl(pField).setNotification(pMessage);
    },
    __namespace: true
};

/** Enter a suitable multi line comment here.
* */
S2G_V9.Grid = {
    _control : null,
    SelectedRow: function (pControlName) {
        try {     
            return S2G_V9.Context.getControl(pControlName).getGrid().getSelectedRows();
        }
        catch (e) {
            return null;
        }
    },
    ShowLoading: function (pControlName) {
        try {
            if (S2G_V9.Context._isUCI == false) {
                this._control = S2G_V9.Context._formContext.getControl(pControlName);
                this._control.getGrid().showLoadingMessage();
            }
        } catch (e) {
            return null;
        }
    },
    Refresh: function (pControlName) {
        try {
            var _control 
            if (S2G_V9.Context._isUCI == true) {
                this._control = S2G_V9.Context._formContext.getControl(pControlName);
            }
            else {
                this._control = S2G_V9.Context._formContext.getControl(pControlName);
            }
            
            this._control.refresh();
        } catch (e) {
            return null;
        }
    },
    SeletedId: function (pControlName) {
        try {
            var selectedEntityReferences = [];
            var selectedRows = S2G_V9.Context._executionContext.getControl(pControlName).getGrid().getSelectedRows();
            selectedRows.forEach(function (selectedRow, i) {
                selectedEntityReferences.push(selectedRow.getData().getEntity().getEntityReference());
            });

            return selectedEntityReferences;
        }
        catch (e) {
            return null;
        }
    }
}


/*
Enter a suitable multi line comment here.
* */

S2G_V9.Forms = {
    FORM_TYPE_CREATE: 1,
    FORM_TYPE_UPDATE: 2,
    FORM_TYPE_READ_ONLY: 3,
    FORM_TYPE_DISABLED: 4,
    FORM_TYPE_QUICK_CREATE: 5,
    FORM_TYPE_BULK_EDIT: 6,
    FORM_SAVE_NOTHING: null,
    FORM_SAVE_SAVEANDCLOSE: 'saveandclose',
    FORM_SAVE_SAVEANDNEW: 'saveandnew',
    FORM_SAVEMODE_SAVE: 1,
    FORM_SAVEMODE_SAVEANDCLOSE: 2,
    FORM_SAVEMODE_SAVEANDNEW: 59,
    FORM_SAVEMODE_SAVEASCOMPLETED: 58,
    FORM_SAVEMODE_AUTOSAVE: 70,
    FORM_SAVEMODE_DEACTIVATE: 5,
    FORM_SAVEMODE_REACTIVATE: 6,
    FORM_SAVEMODE_ASSIGN: 47,
    FORM_SAVEMODE_SEND: 7,
    FORM_SAVEMODE_QUALIFY: 16,
    FORM_SAVEMODE_DISQUALIFY: 15,
    //Get true if form is creating
    IsFormCreating: function () {
        return (this.GetFormType() == this.FORM_TYPE_CREATE || this.GetFormType() == this.FORM_TYPE_QUICK_CREATE);
    },
    //Get true if form is updating
    IsFormUpdating: function () {
        return (this.GetFormType() == this.FORM_TYPE_UPDATE);
    },
    //Get true if form can modify
    FormCanModify: function () {
        return (this.IsFormUpdating() || this.IsFormCreating());
    },
    //Get Type of Form
    //USE GetFormType
    //Return values: FORM_TYPE_CREATE, FORM_TYPE_UPDATE, FORM_TYPE_READ_ONLY, FORM_TYPE_DISABLED, FORM_TYPE_QUICK_CREATE OR FORM_TYPE_BULK_EDIT
    GetFormType: function () {
        return Xrm.Page.ui.getFormType();
    },
    //Save ActualForm
    //USE SaveForm('TYPE_OF_FORM_SAVE')
    //Values of TYPE_OF_FORM_SAVE: FORM_SAVE_SAVEANDCLOSE, FORM_SAVE_SAVEANDNEW or FORM_SAVE_NOTHING
    SaveForm: function (typeOfSave) {
        Xrm.Page.data.entity.save(typeOfSave);
    },
    //Stop Form Saving
    CancelSaveForm: function () {
        var context = S2G_V9.Context.GetContext();
        if (context != null) {
            context.getEventArgs().preventDefault();
        }
    },
    GetSaveMode: function () {
        var context = S2G_V9.Context.GetContext();
        if (context != null) {
            context.getEventArgs().getSaveMode();
        }
    },
    GetFormName: function () {
        var returnValue = null;
        if (typeof (Xrm.Page.ui.formSelector) != 'undefined' && typeof (Xrm.Page.ui.formSelector.getCurrentItem) != 'undefined') {
            var item = Xrm.Page.ui.formSelector.getCurrentItem();
            if (item != null) {
                returnValue = item.getLabel();
            }
        }
        return returnValue;
    },
    PreventAutoSave: function (econtext) {
        var eventArgs = econtext.getEventArgs();

        if (eventArgs.getSaveMode() == this.FORM_SAVEMODE_AUTOSAVE) {
            eventArgs.preventDefault();
        }
    },
    //Close Form
    CloseForm: function () {
        Xrm.Page.ui.close();
    },
    //Open a New form of type passed by parameter and return a new window object
    //USE: S2G.Functions.OpenNewForm("account");
    OpenNewForm: function (entityName) {
        return this.OpenForm(entityName);
    },
	/*
	Open a form of type passed by entityName with id passed and return a new window object
	USE: S2G.Functions.OpenForm("account");
		   OR
	     S2G.Functions.OpenForm("account","A85C0252-DF8B-E111-997C-00155D8A8410");
	       OR
	      var parameters = {};
		      parameters.formid = "A85C0252-DF8B-E111-997C-00155D8A8410";
          parameters.telephone1 = "(425) 555-1234";
          S2G.Functions.OpenForm("account", null, parameters);

	*/
    OpenForm: function (entityName, entityRecordId, parameters) {
        //Xrm.Utility only exists since rollup 8
        var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes";
        if (entityName == null) {
            return null;
        }

        if (entityRecordId == null) {
            if (typeof (Xrm.Utility) == 'undefined') {
                var recordUrl = S2G_V9.Context.GetServerUrl() + "/main.aspx?";
                var params = "etn=" + entityName + "&pagetype=entityrecord";
                recordUrl += params;
                return window.open(recordUrl, "_blank", features, false);
            }
            else {
                return Xrm.Utility.openEntityForm(entityName);
            }
        }
        else {
            if (parameters == null) {
                if (typeof (Xrm.Utility) == 'undefined') {
                    var recordUrl = S2G_V9.Context.GetServerUrl() + "/main.aspx?";
                    var params = "etn=" + entityName + "&pagetype=entityrecord&id=" + entityRecordId;
                    recordUrl += params;
                    return window.open(recordUrl, "_blank", features, false);
                }
                else {
                    return Xrm.Utility.openEntityForm(entityName, entityRecordId);
                }
            }
            else {
                if (typeof (Xrm.Utility) == 'undefined') {
                    var recordUrl = S2G_V9.Context.GetServerUrl() + "/main.aspx?";
                    var params = "etn=" + entityName + "&pagetype=entityrecord&id=" + entityRecordId;
                    recordUrl += encodeURIComponent(params);
                    return window.open(recordUrl, "_blank", features, false);
                }
                else {
                    return Xrm.Utility.openEntityForm(entityName, entityRecordId, parameters);
                }
            }
        }
    },
    AttachEventOnRefreshToGrid: function (gridName, functionToCall) {
        var grid = document.getElementById(gridName);
        if (grid == null) {
            setTimeout(function () { S2G_V9.Forms.AttachEventOnRefreshToGrid(gridName, functionToCall); }, 2500);
            return;
        }
        if (typeof (grid.control.add_onRefresh) == 'undefined') {
            //Código para antes del RU12
            grid.attachEvent("onrefresh", functionToCall);
        }
        else {
            //Código para después del RU12
            grid.control.add_onRefresh(functionToCall);
        }
    },
    RefreshWebPage: function (EntityName) {
        Xrm.Utility.openEntityForm(EntityName, Xrm.Page.data.entity.getId());
    },
    __namespace: true
};