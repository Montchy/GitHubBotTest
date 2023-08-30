export let labels: { [key: string]: string } = {};
export let error = "";

function cleanTitle(title: string) {
  if (title.startsWith("🐛")) {
    return "w";
  } else return "l";
}

export function cleanBody(title: string, body: string) {
  if (cleanTitle(title) == "w") {
    const parts = body.split("###");

    parts.forEach((s) => {
      try {
        const twPart = s.split("\n");
        const key = twPart[0];
        const value = twPart.slice(1).join("\n");
        const cleanvalue = value.replace(/\n/g, " ");

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
  }
  if (key == " Reproduceable Code") {
    let value = labels[key];
  }
  if (key == " What happened instead?") {
    let value = labels[key];
  }
  if (key == " Relevant log output") {
    let value = labels[key];
  }
  if (key == " Device") {
    let value = labels[key];
  }
  if (key == " VisionCamera Version") {
    let value = labels[key];
  }
  return "l";
}
