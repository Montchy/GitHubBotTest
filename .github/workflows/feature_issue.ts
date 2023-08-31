let labels: { [key: string]: string } = {};
let error = "";

function cleanTitle(title: string) {
  if (title.includes("✨") && title.indexOf("✨") > 0) {
    errorAdd("!Title: Emoji has to be at the beginning of your Title \n");
    return "w";
  } else if (title.length < 5) {
    errorAdd("!Title: Title is to short \n");
    return "w";
  } else return "w";
}

export function cleanBodyFeature(title: string, body: string) {
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
      } catch (error) {}
    });
    console.log("OOAIJAIBEGIOAEI");
    for (const key in labels) {
      if (labels.hasOwnProperty(key)) {
        const value = labels[key];
        cleanup(key);
      }
    }
    for (const key in labels) {
      console.log(key + " / " + labels[key]);
    }
  } else return "l";
}

function cleanup(key: string) {
  if (key == " What feature or enhancement are you suggesting?") {
    let value = labels[key];
    console.log("WHAT FEATURE LENGTH: " + value.length);
    if (value != "" && value != null && value.length >= 5) {
    } else
      errorAdd(
        "!What feature or enhancement are you suggesting?: Empty or less than 5 letters\n"
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
  if (key == "  Alternatives/Workarounds") {
    let value = labels[key];
    console.log("ALTERNATIVES LENGTH: " + value.length);
    if (value != "" && value != null && value.length >= 5) {
    } else
      errorAdd("!Alternatives/Workarounds: Empty or less than 5 letters\n");
  }
}

function errorAdd(value: string) {
  if (error == "") {
    error = "Errors: \n" + value;
  } else {
    error = error + value;
  }
}

export function returnErrorFeature() {
  console.log(error);
  return error;
}
