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
      } catch (error) {}
    });

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

function cleanup(key: string) {}

function errorAdd(value: string) {
  if (error == "") {
    error = "Errors: \n" + value;
  } else {
    error = error + value;
  }
}

export function returnErrorFeature() {
  return error;
}
