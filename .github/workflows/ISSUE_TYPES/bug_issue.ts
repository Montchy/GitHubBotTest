import { isSemVer } from "../UTILS/helpingMethods";
import { cleanBody, labels, returnErrorTitle } from "../UTILS/checkissues";

let error = "";
let tierror = "";

export function cleanBodyBug(title: string, body: string) {
  tierror = "" + cleanBody(title, body, "✨", error);

  for (const key in labels) {
    if (labels.hasOwnProperty(key)) {
      const value = labels[key];
      cleanup(key);
    }
  }
}

function cleanup(key: string) {
  if (key == " What were you trying to do?") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("_!_What were you trying to do: Not enough information\n");
  }
  if (key == " Reproduceable Code") {
    let value = labels[key];

    if (value != "" && value != null && value.length >= 14) {
    } else errorAdd("_!_Reproducable Code: Not enough information\n");
  }
  if (key == " What happened instead?") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("_!_What happened instead: Not enough information\n");
  }
  if (key == " Relevant log output") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 16) {
    } else errorAdd("_!_Relevant log output: Not enough information\n");
  }
  if (key == " Device") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("_!_Device:  Not enough information\n");
  }
  if (key == " VisionCamera Version") {
    let value = labels[key];
    const cleanvalue = value.replace(" ", "");

    if (isSemVer(cleanvalue) == true) {
      return null;
    } else errorAdd("_!_VisionCamera Version: Isn't SemVer!\n");
  }
  return "Fatal error";
}

function errorAdd(value: string) {
  if (error == "") {
    error = "**Errors in the Body:** \n" + value;
  } else {
    error = error + value;
  }
}

export function returnErrorBug() {
  if (tierror + "\n" + error != undefined) {
    return tierror + "\n" + error;
  } else {
    console.log("undefined error");
    return "";
  }
}
