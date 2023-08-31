export let labels: { [key: string]: string } = {};
export let errorTitle = "";

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

function cleanTitle(title: string, emoji: string) {
  let emr = "";
  if (title.includes("emoji") && title.indexOf("emoji") > 0) {
    // localerrorAdd("!Title: Emoji has to be at the beginning of your Title \n");
    emr += "!Title: Emoji has to be at the beginning of your Title \n";
  } else if (title.length < 5) {
    //   localerrorAdd("!Title: Title is to short \n");
    emr += "!Title: Title is to short \n";
  }
  return emr;
}

export function cleanBody(title: string, body: string, emoji: string) {
  const cT = cleanTitle(title, emoji);
  console.log("EMR=" + cT);

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

function localerrorAdd(value: string) {
  if (errorTitle.length == 0) {
    console.log("localerroradd if 1");
    errorTitle == "Errors in the Title: \n" + value;
  } else {
    errorTitle = errorTitle + value;
    console.log("localerroradd if 2");
  }
}

export function returnErrorTitle() {
  return errorTitle;
}
