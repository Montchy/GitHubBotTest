import { isSemVer } from "../UTILS/helpingMethods";
import { cleanBody, labels, returnErrorTitle } from "../UTILS/checkissues";
import { toShort } from "../UTILS/consts";

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
    if (value != "" && value != null && value.length >= toShort) {
    } else errorAdd("!What were you trying to do: Not enough information\n");
  }
  if (key == " Reproduceable Code") {
    let value = labels[key];

    if (value != "" && value != null && value.length >= toShort) {
    } else errorAdd("!Reproducable Code: Not enough information\n");
  }
  if (key == " What happened instead?") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= toShort) {
    } else errorAdd("!What happened instead: Not enough information\n");
  }
  if (key == " Relevant log output") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= toShort) {
    } else errorAdd("!Relevant log output: Not enough information\n");
  }
  if (key == " Device") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= toShort) {
    } else errorAdd("!Device:  Not enough information\n");
  }
  if (key == " VisionCamera Version") {
    let value = labels[key];
    const cleanvalue = value.replace(" ", "");

    if (isSemVer(cleanvalue) == true) {
      return null;
    } else errorAdd("!VisionCamera Version: Isn't SemVer!\n");
  }
  return "Fatal error";
}

function errorAdd(value: string) {
  if (error == "") {
    error = "Errors in the Body: \n" + value;
  } else {
    error = error + value;
  }
}

export function returnErrorBug() {
  if (tierror + "\n" + error != undefined) {
    return tierror + "\n" + error;
  } else console.log("undefined error");
  return "";
}
