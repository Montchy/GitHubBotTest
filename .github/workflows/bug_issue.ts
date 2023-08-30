const labels: { [key: string]: string } = {};

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

        labels[key] = value;
        console.log("Worked: " + labels[key]);
      } catch (error) {
        console.log("Didn‘t Wwork: " + s);
      }
    });
  } else return "l";
}
