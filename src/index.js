const fs = require("fs");
const Mustache = require("mustache");
const { execSync } = require("child_process");
const chalk = require("chalk");

const STATE = {
    taskNumber: 1
};

const settings = {
    general: {
        programName: "Resume Templater"
    },
    selections: {
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

const logNumber = () =>
    chalk`{magenta.bold ${settings.general.programName.toUpperCase()} (${STATE.taskNumber++}):} `;

const data = (() => {
    const arguments = process.argv.slice(2);

    const documentType = arguments;

    const outputPath = "./output/output.tex";

    const documentName = "CURRICULUM VITAE";

    return { outputPath, documentName };
})();

try {
    const template = fs.readFileSync("./src/index.mustache.tex", "utf8");

    fs.writeFileSync(
        data.outputPath,
        Mustache.render(template, data, {}, settings.mustache.customTags)
    );

    console.log(logNumber() + chalk`Wrote to {blue ${data.outputPath}}`);
} catch (error) {
    console.error(error);
}

try {
    // execSync(`pdflatex ${data.outputPath}`);
} catch (error) {
    console.error(error);
}
