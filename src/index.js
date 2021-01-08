const fs = require("fs");
const Mustache = require("mustache");

const settings = {
    mustache: {
        customTags: ["<&", "&>"]
    }
};

const data = (() => {
    const outputPath = "./output/output.tex";

    const documentName = "CURRICULUM VITAE";

    return { outputPath, documentName };
})();

const template = fs.readFileSync("./src/index.mustache.tex", "utf8");

fs.writeFileSync(
    data.outputPath,
    Mustache.render(template, data, {}, settings.mustache.customTags)
);

console.log(`Wrote to ${data.outputPath}`);
