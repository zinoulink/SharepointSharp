import info from './info.js'
import ajax from '../utils/ajax.js'
import getRequestDigest from '../utils/getRequestDigest.js'

/**
  @name $SP().list.restoreVersion
  @function
  @description When versionning is activated on a list, you can use this function to restore another version label/number for a list item

  @param {Object} [setup] Options (see below)
    @param {Number} setup.ID The item ID
    @param {Number} setup.VersionID The version ID from $SP().list().getVersions()
  @return {Promise} resolve(true), reject(errorMessage)

  @example
  $SP().list("My List").restoreVersion({
    ID:1,
    VersionID:3849
  })
*/
export default async function restoreVersion(setup) {
  if (arguments.length===0) throw "[SharepointSharp 'restoreVersion'] the arguments are mandatory.";
  if (!this.listID) throw "[SharepointSharp 'restoreVersion'] the list ID/Name is required.";
  if (!this.url) throw "[SharepointSharp 'restoreVersion'] not able to find the URL!"; // we cannot determine the url
  if (!setup.ID) throw "[SharepointSharp 'restoreVersion'] the item ID is required.";
  if (!setup.VersionID) throw "[SharepointSharp 'restoreVersion'] the VersionID is required.";

  // we need the real path to the list
  let infos = await info.call(this);
  let rootFolder = infos._List.RootFolder;

  // if no versionning
  if (infos._List.EnableVersioning !== "True") return Promise.reject("[SharepointSharp 'restoreVersion'] No versionning enabled on the list '"+this.listID+"'.");
  let reqDigest = await getRequestDigest.call(this, {cache:false});
  return ajax.call(this, {
    url:this.url + "/_layouts/15/versions.aspx?FileName="+encodeURIComponent(rootFolder+"/"+setup.ID+"_.000")+"&list="+infos._List.Name+"&ID="+setup.ID+"&col=Number&order=d&op=Restore&ver="+setup.VersionID,
    method:"POST",
    body:"__REQUESTDIGEST="+encodeURIComponent(reqDigest),
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  .then(res => {
    if (res.includes("Sorry, something went wrong")) return Promise.reject("Something went wrong.")
    return true;
  })
}
