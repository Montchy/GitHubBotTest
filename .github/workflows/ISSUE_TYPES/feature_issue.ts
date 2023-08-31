import {
  cleanBody,
  errorTitle,
  labels,
  returnErrorTitle,
} from "../UTILS/checkissues";

let error = "";
let tierror = "";

export function cleanBodyFeature(title: string, body: string) {
  tierror = "" + cleanBody(title, body, "✨", error);
  for (const key in labels) {
    if (labels.hasOwnProperty(key)) {
      const value = labels[key];
      cleanup(key);
    }
  }
}

function cleanup(key: string) {
  if (key == " What feature or enhancement are you suggesting?") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else
      errorAdd(
        "!What feature or enhancement are you suggesting?:  Not enough information\n"
      );
  }
  if (key == " What Platforms whould this feature/enhancement affect?") {
    let value = labels[key];
    if (value != null) {
    } else
      errorAdd(
        "!What Platforms whould this feature/enhancement affect?: cant be empty"
      );
  }
  if (key == " Alternatives/Workarounds") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("!Alternatives/Workarounds:  Not enough information\n");
  }
}

function errorAdd(value: string) {
  if (error == "") {
    error = "Errors in the Body: \n" + value;
  } else {
    error = error + value;
  }
}

export function returnErrorFeature() {
  return tierror + "\n" + error;
}
