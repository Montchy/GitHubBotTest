import { containsLetters } from "./helpingMethods";
export let labels: { [key: string]: string } = {};
export let errorTitle = "";

console.log("LÄNGE: " + errorTitle.length);

export function identify(title: string) {
  if (
    (title.includes("🐛") && title.includes("✨")) ||
    (title.includes("🐛") && title.includes("❓")) ||
    (title.includes("❓") && title.includes("✨"))
  ) {
    return "toManyEmojis";
  }
  if (title.includes("🐛")) {
    return "bug";
  }
  if (title.includes("✨")) {
    return "feature";
  }
  if (title.includes("❓")) {
    return "question";
  } else {
    return "l";
  }
}

function cleanTitle(title: string, emoji: string, error: string) {
  if (title.includes("emoji") && title.indexOf("emoji") > 0) {
    localerrorAdd("!Title: Emoji has to be at the beginning of your Title \n");
    return "w";
  } else if (title.length < 5) {
    localerrorAdd("!Title: Title is to short \n");
    return "w";
  } else return "w";
}

export function cleanBody(
  title: string,
  body: string,
  emoji: string,
  error: string
) {
  const cT = cleanTitle(title, emoji, error);
  if (cT == "w") {
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
  }
}

function localerrorAdd(value: string) {
  console.log("länge in function: " + value.length);
  console.log("value:" + value);
  if (value == null || value.length == 0 || value == "") {
    console.log("1");
    errorTitle == "Errors in the Title: \n" + value + "\n" + "\n";
  } else {
    errorTitle = errorTitle + value;
    console.log("2");
  }
}
