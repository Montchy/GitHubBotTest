export let labels: { [key: string]: string } = {};
export let error = "";

export function identify(title: string) {
  console.log("Identifier is running...");
  if (
    (title.includes("🐛") && title.includes("✨")) ||
    (title.includes("🐛") && title.includes("❓")) ||
    (title.includes("❓") && title.includes("✨"))
  ) {
    return "toManyEmojis";
  }
  if (title.includes("🐛")) {
    console.log("Identity: BUG");
    return "bug";
  }
  if (title.includes("✨")) {
    console.log("Identity: FEATURE");
    return "feature";
  }
  if (title.includes("❓")) {
    console.log("Identity: QUESTION");
    return "question";
  } else {
    return "l";
  }
}

function cleanTitle(title: string, emoji: string) {
  if (title.includes("emoji") && title.indexOf("emoji") > 0) {
    errorAdd("!Title: Emoji has to be at the beginning of your Title \n");
    return "w";
  } else if (title.length < 5) {
    errorAdd("!Title: Title is to short \n");
    return "w";
  } else return "w";
}

export function cleanBody(title: string, body: string, emoji: string) {
  if (cleanTitle(title, emoji) == "w") {
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

export function errorAdd(value: string) {
  if (error == "") {
    error = "Errors: \n" + value;
  } else {
    error = error + value;
  }

  console.log(error);
}

export function returnError() {
  return error;
}
