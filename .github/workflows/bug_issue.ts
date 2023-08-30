let labels: { [key: string]: string } = {};
let error = "";

function cleanTitle(title: string) {
  if (title.startsWith("🐛")) {
    return "w";
  } else return "Emoji has to be at the beginning of your Title";
}

export function cleanBody(title: string, body: string) {
  if (cleanTitle(title) == "w") {
    const parts = body.split("###");

    parts.forEach((s) => {
      try {
        const twPart = s.split("\n");
        const key = twPart[0];
        const value = twPart.slice(1).join("\n");
        const valuec = value.replace(/`/g, "");
        const cleanvalue = valuec.replace(/\n/g, " ");

        labels[key] = cleanvalue;
        console.log("Worked: " + labels[key]);
      } catch (error) {
        console.log("Didn‘t Wwork: " + s);
      }
    });

    for (const key in labels) {
      if (labels.hasOwnProperty(key)) {
        const value = labels[key];
        cleanup(key);
      }
    }
  } else return "l";
}

function cleanup(key: string) {
  if (key == " What were you trying to do?") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else
      errorAdd("!What were you trying to do: Empty or less than 5 letters\n");
  }
  if (key == " Reproduceable Code") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("!Reproducable Code: Empty or less than 5 letters\n");
  }
  if (key == " What happened instead?") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("!What happened instead: Empty or less than 5 letters\n");
  }
  if (key == " Relevant log output") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("!Relevant log output: Empty or less than 5 letters\n");
  }
  if (key == " Device") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("!Device: Empty or less than 5 letters\n");
  }
  if (key == " VisionCamera Version") {
    let value = labels[key];
    if (isSemVer(value) == true) {
      return null;
    } else errorAdd("!VisionCamera Version: Isn't SemVer!\n");
  }
  return "Fatal error";
}

const semverPattern =
  /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

function isSemVer(input: string) {
  return semverPattern.test(input);
}

function errorAdd(value: string) {
  if (error == "") {
    error = "Errors: \n" + value + "\n";
  }
  error = error + value;
}

export function returnError() {
  return error;
}
