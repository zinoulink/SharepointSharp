# Changelog

**Change Log v6.2.0 (June 8, 2022)**

/!\ Starting from this release, SharePoint 2013 is not tested anymore. Moving forward, only SharePoint Online will be tested.

  - Added option `modify` to `$SP().getManager()`
  - Added `$SP().isSPO()`
  - Changed `$SP().ajax()` to better managed 401 error for the REST API calls
  - Changed `$SP().cleanResult()` when dealing with a date (`$SP().cleanResult("2022-01-19 00:00:00")` will now return "2022-01-19" instead of "2022-01-19 00:00:00")
  - Changed `$SP().toDate()` to ignore the timezone (e.g. `$SP().toDate("2022-01-19")` used to return different result based on the user's timezone, but now it returns the correct date at 00:00:00 in the current timezone)
  - Changed `$SP().getVersions()`: only compatible with REST API, and it returns a different result/outcome than before
  - Changed `$SP().hasREST()`: it will always return TRUE (it's possible to override the value) because REST API is around for a while now and I assume everyone is using at least SP2013 (see issue https://github.com/Aymkdn/SharepointSharp/issues/180)
  - Fixed `$SP().isMember()` for the `url` option (see issue https://github.com/Aymkdn/SharepointSharp/issues/175)
  - Removed support for IE10 in the bundle for browsers

**Change Log v6.1.5 (March 5, 2021)**

  - Fixed `$SP().list().get()` when using `join` option and when there is no data in the left-list
  - Fixed `$SP().list().setReadOnly()` (see https://github.com/Aymkdn/SharepointSharp/issues/166)

**Change Log v6.1.4 (February 1, 2021)**

  - Added `$SP().list().removeAttachment()`
  - Added `$SP().list().getVersions()`
  - Added `$SP().list().restoreVersion()`
  - Changed `$SP().list().stopWorkflow()` to not use `iframe` and make it work with NodeJS Server Application
  - Fixed a Sharepoint bug: if a list has the versioning enabled, then add/remove an attachment will created an empty version which could reset the values for the "Multiple Lines of Text" fields with "Append" option – `$SP().list().addAttachment()` and `$SP().list().removeAttachment()` will restore the previous version to avoid this buggy behavior
  - Fixed `$SP().list().get()` with option `json:true` to return an object for each item instead of an array of keys
  - Fixed `$SP().list().getWorkflowID()` when there are more than 1 workflow for an item (see https://github.com/Aymkdn/SharepointSharp/issues/162)

**Change Log v6.1.3 (January 8, 2021)**

  - Added `$SP().getServerTime()` to return the server time
  - Added option `overwrite`  to ` $SP().list().createfile()` (see https://github.com/Aymkdn/SharepointSharp/issues/160)
  - Changed a behavior: when `$SP().list().get()` was called with some `outerjoin` and if there was a `where`, then the `outerjoin` was changed to `innerjoin`… I don't recall why, but this behavior doesn't seem right so I removed it
  - Fixed `merge` option with `join` option for `$SP().list().get()`
  - Fixed `merge` option with `json` option for `$SP().list().get()`
  - Fixed `view` option for `$SP().list().get()` when a WHERE clause is defined in the view's server
  - Optimized how `$SP().list().get()` deals with `on` option when the parameters are IDs
  - Updated `SharepointSharp-loader` to support `$SP().getServerTime()`

**Change Log v6.1.2 (June 2, 2020)**

  - Fixed `\\` issue in `$SP().parse()` (see https://github.com/Aymkdn/SharepointSharp/issues/136)

**Change Log v6.1.1 (April 25, 2020)**

  - Fixed bundle size issue introduced with v6.1.0 (see https://github.com/Aymkdn/SharepointSharp/issues/135)

**Change Log v6.1.0 (April 10, 2020)**

  - Added support for short date format ("YYYY-MM-DD") for `$SP().toDate()`
  - Added `$SP().list().hasPermission()` to check the permissions of the current user with a list/library
  - Added support for configuration without transpiling (`const $SP = require('SharepointSharp/dist/');`)
  - Added option `viewCache`  to `$SP().list().get()`
  - Added option to get FedAuth cookie using `$SP().auth()` (see https://github.com/Aymkdn/SharepointSharp/wiki/Using-the-FedAuth-Cookie)
  - Changed behavior for `$SP().getRequestDigest()` and lifetime from 24h to 1800secs
  - Fixed a bug in `$SP().parse()` when too many embedded brackets
  - Fixed a bug in `$SP().ajax()` when the request digest was incorrect

**Change Log v6.0.4 (January 13, 2020)**

  - Fixed `$SP().list().get()` when using `json:true`

**Change Log v6.0.3 (December 30, 2019)**

  - Fixed `$SP().getRequestDigest()` when using on Node server
  - `$SP().addressbook()` was incorrectly named `$SP().adressbook()`

**Change Log v6.0.2 (December 27, 2019)**

  - Additional fix to follow up v6.0.1 release
  - Various tweaks and cleanup

**Change Log v6.0.1 (December 27, 2019)**

  - Fixed object creation that shared data with other instances

**Change Log v6.0 (December 26, 2019)**

  - Added function `$SP().getManager()` to get details about an user's manager
  - Added function `$SP().toPeopleString()` to convert {id, name, username, email} to a "people string"
  - Added function `$SP().setReadOnly()` to change a READONLY column (like 'Created'/'Author'/'Modified'/'Editor') to an EDITABLE column
  - Added option `showListInAttribute` for `$SP().list().get()`
  - Added option `alias` for `$SP().list().get()`
  - Added option `json` for `$SP().list().get()` that returns an array of JSON
  - Added support for `~<>` in `$SP().parse()`
  - Added parameter `folderOptions.rootFolder` for `$SP.list().get()` for when it's a document library with a different name
  - Added option `type` for `$SP().checkin()` ('MinorCheckIn' (incremented as a minor version), 'MajorCheckIn' (incremented as a major version), or 'OverwriteCheckIn' (overwrite the file))
  - Added option `breakOnFailure` for `$SP().list().add()`, `$SP().list().remove()` and `$SP().list().update()`
  - Added more unit tests
  - Changed the way `$SP().notify()` calls `sp.js` and `core.js`
  - Changed the default `packetsize` from 15 to 30 for `$SP().list().add()`, `$SP().list().remove()` and `$SP().list().update()`
  - Changed the call for `$SP().list().get()` with `where` as an array from a succession of calls to calls in parallel
  - Changed changelog to auto-ignore modules that are meant for server-side use (see #https://github.com/Aymkdn/SharepointSharp/issues/123) (based on https://github.com/defunctzombie/package-browser-field-spec)
  - Fixed `view` utilized with `where` as an array in `$SP().list().get()`
  - Renamed `$SP().SPArrayBufferToBase64()` to `$SP().arrayBuffer()`
  - Renamed `$SP().SPExtend()` to `$SP().cloneObject()`
  - Renamed `$SP().SPArrayChunk()` to `$SP().arrayChunk()`
  - Updated the documentation

**Change Log v5.2 (March 25, 2019)**

  - Remove `argument.callee` because it's deprecated and returns error with strict mode
  - Add option `merge` for `$SP().list.get()` that permits to merge several lists in the same dataset
  - Add support for `RecurrenceData`  when adding a recurrent event with `$SP().list().add()`
  - Add option `event` and examples to update one occurrence of a recurrent event with `$SP().list().update()`
  - Add option `event` and examples to remove one occurrence of a recurrent event with `$SP().list().remove()`
  - Add function `$SP().parseRecurrence` that converts a RecurrenceData XML string to an object, and vice-versa
  - Add function `$SP().getTimeZoneInfo` that returns the TimeZoneID, and other information used when setting recurrent event
  - Add support for download `onprogress` for `$SP().ajax()`
  - Add `$SP().list().stopWorkflow()` to stop/terminate workflows 2010
  - Add unit tests for calendar events and `$SP().parseRecurrence()`
  - Change `$SP().showModalDialog()` that now returns a Promise (we can use either the callback function or the promise)
  - Change `PeopleAhead` plugin to be compatible with SharepointSharp 5.1+
  - Fix `outerjoin` when using `onLookup` for `$SP().list.get()`
  - Fix incorrect characters in filenames for `addAttachment` and `createFile`
  - Fix missing catch for `$SP().lists()` (see https://github.com/Aymkdn/SharepointSharp/issues/116)

**Change Log v5.1 (August 21, 2018)**

  - Fix url issue in `$SP().getWorkflowID()`
  - Fix url issue when SharepointSharp is called from the root (see https://github.com/Aymkdn/SharepointSharp/issues/86)
  - Fix `parse()` (see https://github.com/Aymkdn/SharepointSharp/issues/89)
  - Fix `getRequestDigest()` when using it with NodeJS on a sub site collection
  - Fix `addressbook()` (incorrect checks of arguments)
  - Fix `$SP().cleanResult()` when the string was like "-1;#something"
  - Remove `$SP().toCurrency()` (use [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat](Inlt with NumberFormat instead) ... e.g. `new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})`)
  - Use method `GET` by default when calling `ajax()` with NodeJS
  - Change the default value returned by `$SP().view()` for `OrderBy` (from `[]` to `""` when no orderby defined for the view)
  - Add new utility function called `$SP().getPeopleLookup()`
  - Improve support for NodeJS
  - Improve some errors handling

**Change Log v5.0 (November 21, 2017)**

  - Remove all jQuery references
  - Remove old IE support; support starts from IE11 (the user will have to verify compatibility for older versions)
  - Remove `SPArrayIndexOf()`
  - Remove `SPArrayForEach()`
  - Remove `SPIsArray()` (use Array.isArray instead)
  - Remove `Strim.prototype.trim` polyfill
  - Remove `$SP().encode_b64()` and `$SP().decode_b64()` (the code can be retrieved here https://blog.kodono.info/wordpress/2011/07/27/midi-code-encoder-decoder-en-base64-pour-javascript-programmation/)
  - Remove alias `$SP().list().del()` (use `$SP().list().remove()` instead)
  - Remove native support for `$SP().formfields()` (you now need to call the related plugin)
  - Remove callbacks for all functions
  - Add Promise for all functions
  - Change `$SP().ajax()` to integrate `nanoajax` (no need to call `nanoajax` from a seperate file)
  - Change options for `$SP().ajax()` to fit with `nanoajax`
  - Change `$SP().getURL()` to return a Promise (async requests are not supported by recent browsers anymore)
  - Change parameters for `$SP().list().createFile()`, and it must now be called with `$SP().list()`
  - Change parameters for `$SP().list().createFolder()`, and it must now be called with `$SP().list()`
  - Change encoding for `$SP().list().addAttachment()` from `Base64` to `ArrayBuffer`
  - Change values returned by `$SP().list().view()`
  - Change values returned by `$SP().list().views()`
  - Change values returned by `$SP().list().add()`
  - Change values returned by `$SP().list().update()`
  - Change values returned by `$SP().list().remove()`
  - Change values returned by `$SP().list().moderate()`
  - Change behavior for `$SP().list().add()` and `$SP().list().update()` when an empty array of values is passed as a column value to be added/updated (it will now return '' instead of ';#;#')
  - Add option `cache` for `$SP().list().view()`
  - Add option `cache` for `$SP().lists()`
  - Add option `packetsize` for `$SP().list().moderate()`
  - Add `$SP().getPageSize()` that permits to get the size of the document/page
  - Add option `soapURL` to `$SP().webService()` (see https://github.com/Aymkdn/SharepointSharp/issues/51)
  - Add wiki pages for "Term/Taxonomy/Managed Metadata" (see https://github.com/Aymkdn/SharepointSharp/wiki/)
  - Add wiki page for Discussion Board (see https://github.com/Aymkdn/SharepointSharp/wiki/Sharepoint-Discussion-Board)
  - Add `Property` property for a `TaxonomyFieldType` returned by `$SP().list().info()`
  - Add `._List` that returns the details for the list for `$SP().list().info()`
  - Add `$SP().hasREST()` to detect if REST API is supported
  - Add `progress` function for `$SP().createFile()`
  - Add `getXHR` function for `$SP().createFile()`
  - Add support for `ArrayBuffer` for `$SP().createFile()`
  - Add `SPArrayBufferToBase64` function() to transform an ArrayBuffer to a Base64 string
  - Add automatic JSON parsing for results from `$SP().ajax()` which Content-Type that matchs json
  - Add option `soapAction` for `$SP().webService()`
  - Add support for multiple ids/values for `$SP().getLookup()`
  - Add automatic support for digest token on `$SP().ajax()`
  - Add `$SP().getRequestDigest()`
  - Add option `rootFolder` for `$SP().list().add()` for support of Discussion Board
  - Add 30+ new QUnit tests
  - Fix `$SP().formfields()` when there is ampersand (&) into the field's name
  - Fix `$SP().toSPDate()` when time is required (see issue #64)
  - Fix `SP().createFile()` for big upload with REST API (see https://stackoverflow.com/questions/46297625/large-arraybuffer-crashes-with-xmlhttprequest-send/46299028#46299028)
  - Fix `$SP.ajax()` to resolve when the status code returned by the server is 2xx and not 200 only
  - Improve catch error from `$SP().createFile`
  - Optimize code for compression

**Change Log v4.0 (May 4, 2017)**

  - Add NodeJS support: SharepointSharp can now be called as a node module and can be used on server side
  - Add `$SP().auth()` that must be used when using NodeJS (based on https://github.com/s-KaiNet/sp-request)
  - Add `$SP().proxy()` that can be used with NodeJS
  - Add Promise support for `$SP().list().get()`
  - Add Promise support for `$SP().list().add()`
  - Add Promise support for `$SP().list().update()`
  - Add Promise support for `$SP().list().remove()`
  - Add Promise support for `$SP().list().createFolder()`
  - Add Promise support for `$SP().list().createFile()`
  - Add Promise support for `$SP().checkin()`
  - Add `SPExtend()` that permits to clone/extend an object
  - Add `$SP().webService()` to send customized requests to the web services (instead of using SPServices)
  - Add qunit-test on `$SP().webService()`
  - Add qunit-test on `$SP().checkin()`
  - Add `packetsize` option for `$SP().list().update()`
  - Rewrite the documentation using JSDoc 3 instead of JSDoc 2
  - Reorganize the documentation to group the methods by category
  - Use of eslint to clean up the code
  - Change license from GPL 3.0 to LGLP 3.0 (see https://github.com/Aymkdn/SharepointSharp/issues/48)
  - Fix `$SP().checkin()` (see https://github.com/Aymkdn/SharepointSharp/issues/49)

**Change Log v3.14 (March 6, 2017)**

  - Add a sanitize filter for the filename in `$SP().createFile()` because Sharepoint doesn't like some special characters
  - Fix a bug with "Content Type" field in `SP().formfields()`
  - Fix a bug with `SP().formfields().elem()` when mixed fieldtypes where used
  - Handle `callback` even when `showClose:false` in `$SP().showModalDialog()`
  - Add more documentation for `$SP().showModalDialog()`
  - Add option `id` for `$SP().showModalDialog()`
  - Add option `onload` for `$SP().showModalDialog()`
  - Add function `$SP().getModalDialog()`
  - Add function `$SP().resizeModalDialog()`
  - Improve `$SP().parse()` for the `IN` operator
  - Review the code for `join` and `outerjoin` options within `$SP().list().get()`
  - Add new option `join.onLookup` for `$SP().list().get()`

**Change Log v3.13 (August 23, 2016)**

  - Fully compatible with Sharepoint 2013!
  - jQuery is not required anymore!
  - Rewrite `$SP().createFile()` with new options (see [issue #26](https://github.com/Aymkdn/SharepointSharp/issues/26) and [pull #29](https://github.com/Aymkdn/SharepointSharp/pull/29))
  - Add operator "IN" for WHERE clause thru `$SP().parse()` (e.g. 'Location IN ["Los Angeles","San Francisco","New York"]')
  - Add special words "TRUE" and "FALSE" for `$SP().parse()` to use with the Yes/No columns
  - Full rewrite of `$SP().formfields()` to be compatible with Sharepoint 2013 (a few things could be now different from previous versions)
  - Remove option `data-sp-ignore` from `$SP().formfields()`
  - Set 160 qUnit tests for almost all the functions
  - Add automatic qUnit test environment creation to make tests easier
  - Add option `usejQuery` to `$SP().formfields().elem()`
  - Add `$SP().encode_b64()` and `$SP().decode_b64()`
  - Add `$SP().getURL()` to return the current base url
  - Add `$SP().regionalSettings()` to return the user regional settings
  - Add `$SP().regionalDateFormat()` to return the date format based on the user regional settings (usefull for Date Picker fields manipulation)
  - Add `$SP().list().startWorkflow2013()` to start Sharepoint 2013 workflows (the other function remains for Sharepoint 2010 workflows)
  - Add Site Workflow start for `$SP().list().startWorkflow()`
  - Add `$SP().showModalDialog()`, `$SP().closeModalDialog()` and `$SP().waitModalDialog()`
  - Add two parameters (passedItems, failedItems) to options `after` for `$SP().list().add()`, `$SP().list().update()`, ...
  - Add `$SP().list().addAttachment()` to attach a document to a list item

**Change Log v3.12 (January 26, 2016)**

  - Fix problem with IE8 and Array.prototype.indexOf ([issue #25](https://github.com/Aymkdn/SharepointSharp/issues/25))
  - Change the versioning number, from 3.0.11 to 3.12
  - Add qunit tests

**Change Log v3.0.11 (January 11, 2016)**

  - Fix $SP().forms() for Sharepoint 2013
  - Add $SP().formfields().isMandatory() to return the mandatory status of the field(s)
  - Add $SP().formfields().name() to return the name of the field(s)
  - Fix $SP().cleanResult() for "float;"
  - Add $SP().list().getContentTypes() to return the content types for a list
  - Add $SP().list().getContentTypeInfo() to return the content type info for a list
  - Add support of the Enhanced Textarea field
  - Fix $SP().formfields().each() that returns a jQuery object when calling this.elem() and this.row()
  - Fix $SP()).formfields().val() returning an empty array when no value available, and it now returns an empty string
  - Add more data returned by $SP().list().getWorkflowID()
  - Add $SP().workflowStatusToText() to convert the workflow status code to the related message
  - Add option "listItemCollectionPositionNext" to $SP().list().get() for paging
  - Fix $SP().list().getWorkflowID() to use ClientContent when permissions are insufficient

**Change Log v3.0.10 (February 24, 2015)**

  - Fix the $SP().list().get() to not change the original WHERE clause passed to the function when it's an array
  - Fix a bug with the $SP().list().views() because of a cache issue, and add a "cache" option
  - Fix the $SP().list().get() when we pass a ViewID
  - New parameter for $SP().toDate() that permits to force the UTC date
  - Fix a bug with $SP().list().add() and $SP().list().update() when an error is returned by the server
  - Add additional option called `useIndexForOrderBy`, for $SP().list().get(), based on this comment: https://spservices.codeplex.com/discussions/280642#post1323410 that permits to  override the list view threshold
  - Add a `page` option for $SP().list().get()
  - Add a code that runs automatically to change the Sharepoint complex dropdowns (when it's a lookup with more than 20 values) to a regular SELECT -- IE only
  - Add `progress` function with the `paging:true` option for $SP().list().get()
  - Fix a bug with $SP().formfields() when setting a value for a MULTIPLE LINE OF TEXT

**Change Log v3.0.9 (June 20, 2014)**

 - New option "cache" for $SP().groupMembers(),.distributionLists(),isMember(),.usergroups()
 - New function $SP().getUserInfo()
 - New options "calendar" and "calendarOptions" for $SP().list().get() to easily deal with the Calendar Lists / Events
 - Bug fix with $SP().formfields() when we activate the Recurrence in a calendar form
 - Add $SP().notify() and $SP().removeNotify() to deal more easily with SP.UI.Notify.addNotification
 - Fix the doc for the DateInUTC option of $SP().list().get()
 - Add "Node" as a new return for the $SP().list().views() function
 - Fix the option "path" for "folderOptions" in $SP().list().get() that didn't work

**Change Log v3.0.8 (March 28, 2014)**

 - Little bug fix and improvements
 - The WHERE clause of $SP().list().get() now supports "[Today-X]" or "[Today+X]" that is equivalent to the CAML syntax <Today OffsetDays="X">
 - New option `escapeChar` (true by default) for $SP().list().get() that permits to escape special chars (&, < and >) in the WHERE clausse
 - New operator `~=` for $SP().parse() (the function that parses the WHERE clause) that is used to query a large list with an indexed User column (you'll need to know the User ID)
 - ATTENTION : the WHERE clausse of $SP().list().get() is now sensitive to the TIME, so "2012-10-31" will compare only the DATE when "2012-10-31 10:28:19" will compate the DATE AND the TIME (CAML equivalent of "IncludeTimeValue='TRUE'")
 - ATTENTION : $SP().toSPDate() now includes a second parameter -- by default this function will now return a date only (without the time), but if you pass "true" as second argument it will return a datetime (see the documentation)

**Change Log v3.0.7 (December 14, 2013)**

 - Fix a bug with $SP().formfields().elem() when it's a boolean-checkbox field (it returned the INPUT and the BR)
 - Add 'paging' option in $SP().formfields().get() that permits to get data from a very large list (that is useful when there is a list view threshold)

**Change Log v3.0.6 (November 13, 2013)**

 - Change the default value of "dateInUTC" to false for $SP().list().get()
 - Change $SP().toDate() to parse correctly the UTC dates
 - Fix $SP().formfields().val() to select the values passed in the same order as provided for a "lookup multiple" type
 - Add support for "LookupMulti" for $SP().list().info()
 - Fix a bug with $SP().toXLSString() when a number is in the first word
 - Fix a bug with $SP().formfields().val() when the field is a mutiple line of text and we're not on IE
 - Fix a bug with $SP().formfields().val() when the field is a people picker
 - Add the $SP().createFolder() function that permits to create a new folder into a Document Library
 - Add more options to $SP().list().get() to deal with the Document Libraries (see 'folderOptions')
 - Add another option to $SP().list().get() that permits to overwrite the "<QueryOptions>" part of the query
 - Add $SP().list().history() to get the versioning content for a field (like the Multiple Lines of Text when versioning is on)

**Change Log v3.0.5 (August 5, 2013)**

 - Add the $SP().list().startWorkflow() function to manually start a workflow
 - Add the $SP().list().getWorkflowID() function (that is internally used)
 - Fix $SP().formfields().val() for a people picker (Sharepoint 2010 compatibility)
 - Fix $SP().cleanResult() when no separator was provided
 - Add another parameter to the return function for $SP().list().get() that is the error message (in case the request to the webservice didn't work)
 - Fix a bug with the argments mandatory for $SP().list().add()
 - Fix a bug with $SP().parse() when there was a backslash with a single quote and a bracket for a string
 - Change the behavior of $SP().list().add() when you provide an empty array (no more exception returned)
 - Change the order of calling success/error for $SP().list().add/remove/update() -- now the "error" callback is called before the "sucess" callback
 - Fix a bug with $SP().lists() (https://github.com/Aymkdn/SharepointSharp/issues/2)
 - Fix a wrong information in the documentation for $SP().list().get() and "progress"

**Change Log v3.0.4 (March 18, 2013)**

 - Rewrite of the $SP.formfields function for better compatibility and performances
 - Fix a bug with an internal function (that returns the current website URL)
 - Rewrite the $SP().list().getAttachment() function
 - Add $SP().whoami() function to get the current user's details
 - $SP().people() returns the error ("string") when there was a problem
 - $SP().list().remove() with the WHERE clause can now also directly delete the files from a document library
 - Fix a bug for $SP().list().update() when using the function with 1 argument
 - Add the $SP().registerPlugin() and $SP().plugin() (first plugin also done)

**Change Log v3.0.3 (November 2, 2012)**

- Better compatibility with Sharepoint 2010
- Because of the Sharepoint 2010 list view throttling (that limit a query to 5,000 items) you can now use the $SP().list().get() with an array for the WHERE clause (see the documentation)
- A "progress" option is now available for $SP().list().get() when using an array for the "where" option
- Add the $SP().cleanResult() function
- Change $SP().toDate() to work with SP2010 format
- Fix the fact we can use either $SP().list().remove() or $SP().list().del()
- Fix an issue with $SP().formfields() applied to a field with several radio buttons
- Add the $SP().noConflict() function that permits to use _$SP instead of $SP (undocumented)
- Fix: you can now get all the fields from a list with leaving "fields" empty or undefined (e.g. $SP().list("My List").get({where:"ID = 1"},function(data) {}))
- $SP().cleanResult(str) now returns "" when 'str' is null or undefined
- Change the license to GPL v2
- Change the Array.prototype.indexOf function
- Add the SharepointSharp version --> $SP().getVersion();

**Change Log v3.0.2**
- Add "encoded" option for $SP().createFile() when the content is already base64-encoded
- Add $SP().checkin() to Check In a file
- Change $SP().list().remove() to be able to delete a file into a shared document library
- NOTE: I'll probably soon change the API to have something like $SP().file().xxxx for all files related actions...


**Change Log v3.0.1**
- Add warning for when we want to use a field with a comma in formfields()
- Add support for Multiple Lookup Selection in formfields()
- Add "Lookup" result for $SP().list().info() -- with "Choices" you now have an object {list:"List from where the values are coming from",field:"Name of the field to retrieve"}
- Add "distributionLists" that returns the user's distribution lists
- Add "groupMembers" that returns the members of a group
- Add "isMember" that will say if an user is part of a Sharepoint group (we could do it with usegroups() however in some cases, like with the distribution lists, the usergroups() will be useless)
- NOTE: with all these new USER features I'm going to review the way to call them... something like $SP().user().xxx

**Change Log v3.0**
- MAJOR CHANGE: you must now call SharepointSharp with $SP() instead of $SP
- ATTENTION: the listID as parameter for the functions is deprecated... you have to use the $SP().list() to define the list
- ATTENTION: Change the $SP().list().view() function (the behavior is different, see the documentation)
- Improve the $SP().list() : only use the LIST NAME and not the LIST ID anymore
- Use view name or view ID in $SP.list().view()
- The URL parameter must now be configured in $SP.list(), and in most cases the URL will be automatically find (for the current website)
- Fix issue with Chrome and $SP().list().add() function
- Add the context for the callback functions : 'this' is now recognized like the current $SP() object in the returning functions
- Add JOIN and OUTERJOIN features to $SP().list().get() (in BETA and should be improved with the time... also it doesn't use -yet- the JOIN options available with Sharepoint 2010)
- Remove ".each()" for ".list()" because all the AJAX requests are now asynchronous
- Add $SP().usergroups() to retrieve of list of groups for an user
- Remove some jQuery dependencies ... still less jQuery code !


**Change Log v2.5.2**
- Add more properties from the $SP.list().info() function
- Better support for Date into a WHERE clause
- Fix issue with Chrome and $SP.list().get() function
- Fix issue with simple quote inside the WHERE clause (you now need to use \\' when using ' inside '')

**Change Log v2.5.1**
- Add $SP.people() to find the user details based on a name
- Add $SP.addressbook() to find someone in the Active Directory based on a part of his name
- Check compatibility with jQuery 1.7.2

**Change Log v2.5**
- Add compatibility with Sharepoint 2010
- Function "progress" added to $SP.list().add()

**Change Log v2.4**
- First public release
