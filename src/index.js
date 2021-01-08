const fs = require("fs");
const Mustache = require("mustache");
var commandExistsSync = require("command-exists").sync;
const { execSync } = require("child_process");

const metadata = {
    paths: {
        templateFile: "./src/index.mustache.tex",
        outputDir: "./output/"
    },
    options: {
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

    const documentType = arguments;

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
    console.error("One or more source or output paths were not found.");
}

if (commandExistsSync("pdflatex")) {
    execSync(`pdflatex ${data.outputPath}`);
} else {
    console.error("`pdflatex` command not found in your PATH.");
}
