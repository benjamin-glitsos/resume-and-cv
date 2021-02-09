const path = require("path");
const fs = require("fs");
const Mustache = require("mustache");
const yaml = require("yaml");
const chalk = require("chalk");
const match = require("switchcase");
const { oneLine } = require("common-tags");
const { metadata } = require("./metadata");
const {
    identity,
    reverse,
    logMessage,
    argSettingOrDefault,
    execSyncPrint
} = require("./utilities");

try {
    Mustache.tags = metadata.mustache.customTags;
    Mustache.escape = identity;

    const content = yaml.parse(
        fs.readFileSync(path.join("resources", "content.yaml"), "utf8")
    );

    const data = (() => {
        const commandLineArguments = process.argv.slice(2);

        const { documentTypes, jobTypes } = metadata.selections;

        const documentType = argSettingOrDefault(
            commandLineArguments,
            documentTypes,
            documentTypes.RESUME
        );

        const jobType = argSettingOrDefault(
            commandLineArguments,
            jobTypes,
            jobTypes.BA
        );

        const output = {};

        output.documentName = match({
            [documentTypes.CV]: content.documentName.cv,
            default: content.documentName.resume
        })(documentType);

        output.headerName = match({
            [documentTypes.CV]: content.documentType.cv,
            default: content.documentType.resume
        })(documentType);

        output.introduction = match({
            [jobTypes.PM]: content.intro.pm,
            [jobTypes.PA]: content.intro.pa,
            default: content.intro.ba
        })(jobType);

        output.tonic = match({
            [jobTypes.PM]: content.tonic.pm,
            [jobTypes.PA]: content.tonic.pa,
            default: content.tonic.ba
        })(jobType);

        output.freelanceWebDev = match({
            [jobTypes.PM]: content.freelanceWebDev.ba,
            [jobTypes.PA]: content.freelanceWebDev.pa,
            default: content.freelanceWebDev.ba
        })(jobType);

        output.dlook = match({
            [jobTypes.PM]: content.dlook.ba,
            [jobTypes.PA]: content.dlook.pa,
            default: content.dlook.ba
        })(jobType);

        output.partTimeEducationJobs = match({
            default: content.partTimeEducationJobs.ba
        })(jobType);

        output.education = match({
            default: content.education.ba
        })(jobType);

        return output;
    })();

    const templateFilename = "template.mustache.tex";
    const outputFilename = extension =>
        `${data.documentName} of Benjamin Glitsos.${extension}`;

    const template = fs.readFileSync(
        path.join("resources", templateFilename),
        "utf8"
    );

    fs.mkdirSync("build");
    fs.writeFileSync(
        path.join("build", outputFilename("tex")),
        Mustache.render(template, data)
    );

    const commands = oneLine`
    rm *.pdf;
    cp resources/resume.cls build/resume.cls;
    cd build/;
    pdflatex "${outputFilename("tex")}";
    mv "${outputFilename("pdf")}" "../${outputFilename("pdf")}";
    cd ..;
    rm -r build/;
    `;

    logMessage(commands);
    execSyncPrint(commands);

    logMessage("Done.");
} catch (error) {
    console.error(error);
}
