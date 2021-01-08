const fs = require("fs");
const Mustache = require("mustache");
var commandExistsSync = require("command-exists").sync;

const metadata = {
    paths: {
        templateFile: "./src/index.mustache.tex",
        outputDir: "./output/"
    },
    enums: {
        documentType: {
            RESUME: "res",
            CV: "cv"
        },
        jobType: {
            BA: "ba",
            PM: "pm",
            QA: "qa"
        }
    },
    mustache: {
        customTags: ["<&", "&>"]
    }
};

const data = (() => {
    const arguments = process.argv.slice(2);

    const outputPath = metadata.paths.outputDir + "output.tex";

    const documentName = "CURRICULUM VITAE";

    return { outputPath, documentName };
})();

if (Object.values(metadata.paths).map(fs.existsSync)) {
    const template = fs.readFileSync(metadata.paths.templateFile, "utf8");

    fs.writeFileSync(
        data.outputPath,
        Mustache.render(template, data, {}, metadata.mustache.customTags)
    );

    console.log(`Wrote to ${data.outputPath}`);
} else {
    console.error("Source or output paths were not found.");
}

if (commandExistsSync("pdflatex")) {
    // proceed
} else {
    console.error("`pdflatex` command not found in your PATH.");
}
