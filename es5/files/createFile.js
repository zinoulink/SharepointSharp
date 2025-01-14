import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _parseInt from "@babel/runtime-corejs3/core-js-stable/parse-int";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/esm/asyncToGenerator";
import ajax from '../utils/ajax.js';
import hasREST from '../utils/hasREST.js';
import info from '../lists/info.js';
import update from '../lists/update.js';
import arrayBufferToBase64 from '../utils/arrayBufferToBase64.js';
import _buildBodyForSOAP from '../lists/_buildBodyForSOAP.js';
import cloneObject from '../utils/cloneObject.js';
/**
  @name $SP().list.createFile
  @function
  @category files
  @description Create/Upload a file into a Document library

  @param {Object} setup Options (see below)
    @param {ArrayBuffer|String} setup.content The file content
    @param {String} setup.filename The relative path (within the document library) to the file to create
    @param {Object} [setup.fields] If you want to set some fields for the created document
    @param {Boolean} [setup.overwrite=true] By default, if the file already exists, it will be overwritten
    @param {Function} [setup.progress=function(percentage){}] The upload progress in percentage
    @param {Function} [setup.getXHR=function(xhr){}] To manipulate the XMLHttpRequest object used during the upload
  @return {Promise} resolve(object that represents the file), reject(error)

  @example
  $SP().list("Documents", "http://my.other.site/website/").createFile({
    content:"*ArrayBuffer*",
    filename:"Demo/HelloWorld.txt"
  }).then(function(file) {
    console.log(file.Url+" has been created")
    // and to get more info, like the ID, you can do:
    $SP().ajax({url:file.AllFieldsUrl}).then(function(body) {
      console.log(body.d)
    })
  }, function(error) {
    console.log("Error: ",error)
  })

  // create a text document with some fields
  $SP().list("Shared Documents").createFile({
    content:"ArrayBuffer*",
    filename:"SubFolder/myfile.txt",
    fields:{
      "Title":"My Document",
      "File_x0020_Description":"This is my file!"
    }
  }).then(function(file) {
    alert("File "+file.Name+" created at " + file.Url);
  });

  // use onprogress and abort
  $SP().list("Documents").createFile({
    content:"*ArrayBuffer*",
    filename:"BigFile.iso",
    progress:function(perc) {
      console.log("percentage of progress => ",perc)
    },
    getXHR:function(xhr) {
      // automtically abort after 3 seconds
      setTimeout(function() {
        xhr.abort()
      }, 3000)
    }
  }).then(function(file) {
    console.log(file.Url+" has been created")
  }, function(error) {
    console.log("Error: ",error)
  })

  // example with a input[type="file"]
  // &lt;input type="file" id="file_to_upload"> &lt;button type="button" onclick="_uploadFile()">Upload&lt;/button>
  function _uploadFile() {
    var files;
    // retrive file from INPUT
    files = document.querySelector('#file_to_upload').files;
    if (!files || files.length === 0) {
      alert("ERROR: Select a file");
      return;
    }
    files = Array.prototype.slice.call(files);
    // read the files
    Promise.all(files.map(function(file) {
      return new Promise(function(prom_res, prom_rej) {
        // use fileReader
        var fileReader = new FileReader();
        fileReader.onloadend = function(e) {
          file.content = e.target.result;
          prom_res(file);
        }
        fileReader.onerror = function(e) {
          prom_rej(e.target.error);
        }
        fileReader.readAsArrayBuffer(file);
      })
    })).then(function(files) {
      // upload files
      return Promise.all(files.map(function(file) {
        return $SP().list("SharepointSharpLibrary").createFile({
          content:file.content,
          filename:file.name,
          progress:function(perc) {
            console.log("Progress => ",perc+"%")
          }
        })
      }))
    })
  }

  // if you want to add some headers, for example for authentication method
  $SP().list("SharepointSharpLibrary").createFile({
    content:file.content,
    filename:file.name,
    getXHR:function(xhr) {
      xhr.setRequestHeader('Authorization','Bearer XYZ')
    }
  })

  // NOTE: in some cases the files are automatically checked out, so you have to use $SP().checkin()
*/

export default function createFile(_x) {
  return _createFile.apply(this, arguments);
}

function _createFile() {
  _createFile = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(setup) {
    var file, infos, rootFolder, folder, filename, _filename, hasRest, fields, i, destination, soapEnv, data, a, _context, urlCall, body, params, items, attr;

    return _regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // default values
            setup = setup || {};
            _context2.prev = 1;

            if (!(typeof setup.content === "undefined")) {
              _context2.next = 4;
              break;
            }

            throw "[SharepointSharp 'createFile']: the file content is required.";

          case 4:
            if (!(typeof setup.filename === "undefined")) {
              _context2.next = 6;
              break;
            }

            throw "[SharepointSharp 'createFile']: the filename is required.";

          case 6:
            if (this.listID) {
              _context2.next = 8;
              break;
            }

            throw "[SharepointSharp 'createFile']: the library name is required.";

          case 8:
            if (this.url) {
              _context2.next = 10;
              break;
            }

            throw "[SharepointSharp 'createFile']: not able to find the URL!";

          case 10:
            // we cannot determine the url
            setup.extendedFields = setup.extendedFields || "";

            setup.progress = setup.progress || function () {};

            setup.getXHR = setup.getXHR || function () {};

            setup.overwrite = typeof setup.overwrite === "boolean" ? setup.overwrite : true; // we need to find the RootFolder for the list

            file = {};
            _context2.next = 17;
            return info.call(this);

          case 17:
            infos = _context2.sent;
            rootFolder = infos._List.RootFolder;
            folder = setup.filename.split("/");
            filename = setup.filename;

            if (folder.length > 1) {
              filename = _sliceInstanceProperty(folder).call(folder, -1)[0];
              folder = "/" + _sliceInstanceProperty(folder).call(folder, 0, -1).join("/");
            } else folder = "";

            folder = rootFolder + folder; // to avoid invalid characters
            // see http://www.simplyaprogrammer.com/2008/05/importing-files-into-sharepoint.html
            // eslint-disable-next-line

            _filename = filename.replace(/[\*\?\|:"'<>#{}%~&]/g, "").replace(/^[\. ]+|[\. ]+$/g, "").replace(/ {2,}/g, " ").replace(/\.{2,}/g, ".");

            if (_filename.length >= 128) {
              _filename = _sliceInstanceProperty(_filename).call(_filename, 0, 115) + '__' + _sliceInstanceProperty(_filename).call(_filename, -8);
            } // we now decide what to do based on if we have REST
            // if no, then relay on Copy Web Service


            _context2.next = 27;
            return hasREST.call(this);

          case 27:
            hasRest = _context2.sent;

            if (hasRest) {
              _context2.next = 54;
              break;
            }

            if (!(setup.fields && !setup.extendedFields)) {
              _context2.next = 36;
              break;
            }

            _context2.next = 32;
            return info.call(this);

          case 32:
            fields = _context2.sent;

            // we use extendedFields to define the Type
            for (i = fields.length; i--;) {
              if (setup.fields[fields[i]["StaticName"]]) {
                setup.extendedFields += '<FieldInformation Type="' + fields[i]["Type"] + '" Value="' + setup.fields[fields[i]["StaticName"]] + '" DisplayName="' + fields[i]["StaticName"] + '" InternalName="' + fields[i]["StaticName"] + '" />';
              }
            }

            if (!setup.extendedFields) delete setup.fields;
            return _context2.abrupt("return", createFile.call(this, setup));

          case 36:
            destination = "/" + folder + "/" + _filename;
            destination = (this.url + destination).replace(/([^:]\/)\//g, "$1");
            if (_sliceInstanceProperty(destination).call(destination, 0, 4) !== "http") destination = window.location.protocol + "//" + window.location.host + destination;
            setup.content = arrayBufferToBase64(setup.content); // ArrayBuffer to Base64 String

            soapEnv = "<SourceUrl>http://null</SourceUrl>" + "<DestinationUrls><string>" + destination + "</string></DestinationUrls>" + '<Fields><FieldInformation Type="File" />' + setup.extendedFields + '</Fields>' + "<Stream>" + setup.content + "</Stream>";
            soapEnv = _buildBodyForSOAP("CopyIntoItems", soapEnv);
            _context2.next = 44;
            return ajax.call(this, {
              url: this.url + "/_vti_bin/copy.asmx",
              body: soapEnv,
              onprogress: function onprogress(evt) {
                if (evt.lengthComputable) {
                  setup.progress(_parseInt(evt.loaded / evt.total * 100));
                }
              },
              getXHR: setup.getXHR,
              headers: {
                'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/CopyIntoItems'
              }
            });

          case 44:
            data = _context2.sent;
            a = data.getElementsByTagName('CopyResult');
            a = a.length > 0 ? a[0] : null;

            if (!(a && a.getAttribute("ErrorCode") !== "Success")) {
              _context2.next = 51;
              break;
            }

            return _context2.abrupt("return", _Promise.reject("[SharepointSharp 'createFile'] Error creating (" + destination + "): " + a.getAttribute("ErrorCode") + " - " + a.getAttribute("ErrorMessage")));

          case 51:
            return _context2.abrupt("return", _Promise.resolve({
              Url: destination,
              Name: setup.filename
            }));

          case 52:
            _context2.next = 82;
            break;

          case 54:
            // use REST API
            urlCall = this.url + "/_api/web/GetFolderByServerRelativeUrl('" + encodeURIComponent(folder) + "')/files/add(url='" + encodeURIComponent(_filename) + "',overwrite=" + (setup.overwrite ? "true" : "false") + ")"; // the URL must not be longer than 20 characters
            // The browsers could crash if we try to use send() with a large ArrayBuffer (https://stackoverflow.com/questions/46297625/large-arraybuffer-crashes-with-xmlhttprequest-send)
            // so I convert ArrayBuffer into a Blob
            // note: we cannot use startUpload/continueUpload/finishUpload because it's only available for Sharepoint Online

            if (typeof Blob !== "undefined") setup.content = new Blob([setup.content]);
            _context2.next = 58;
            return ajax.call(this, {
              url: urlCall,
              body: setup.content,
              onprogress: function onprogress(evt) {
                if (evt.lengthComputable) {
                  setup.progress(_parseInt(evt.loaded / evt.total * 100));
                }
              },
              getXHR: setup.getXHR
            });

          case 58:
            body = _context2.sent;
            // retrieve the full path
            cloneObject(true, file, body.d);
            file.Url = _sliceInstanceProperty(_context = file.__metadata.uri.split("/")).call(_context, 0, 3).join("/") + body.d.ServerRelativeUrl;
            file.AllFieldsUrl = body.d.ListItemAllFields.__deferred.uri; // if we want to update some fields

            if (!setup.fields) {
              _context2.next = 81;
              break;
            }

            _context2.next = 65;
            return ajax.call(this, {
              url: file.AllFieldsUrl
            });

          case 65:
            body = _context2.sent;
            cloneObject(true, file, body.d);
            params = {
              ID: file.ID
            };
            cloneObject(params, setup.fields);
            _context2.next = 71;
            return update.call(this, params);

          case 71:
            items = _context2.sent;

            if (!(items.failed.length > 0)) {
              _context2.next = 76;
              break;
            }

            return _context2.abrupt("return", _Promise.reject("File '" + file.Url + "' added, but fields not updated: " + items.failed[0].errorMessage));

          case 76:
            items = items.passed[0];

            for (attr in items) {
              file[attr] = items[attr];
            }

            return _context2.abrupt("return", _Promise.resolve(file));

          case 79:
            _context2.next = 82;
            break;

          case 81:
            return _context2.abrupt("return", _Promise.resolve(file));

          case 82:
            _context2.next = 87;
            break;

          case 84:
            _context2.prev = 84;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", _Promise.reject(_context2.t0));

          case 87:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this, [[1, 84]]);
  }));
  return _createFile.apply(this, arguments);
}