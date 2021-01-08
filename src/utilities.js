const { execSync } = require("child_process");
const chalk = require("chalk");
const { STATE } = require("./state");
const { metadata } = require("./metadata");

module.exports.identity = x => x;

module.exports.reverse = ls => ls.slice().reverse();

module.exports.logOutput = path => {
    console.log(
        chalk`{magenta.bold ${metadata.general.programName} (${STATE.taskNumber}):} Wrote to {blue ${path}}`
    );
    STATE.taskNumber++;
};

module.exports.argSettingOrDefault = (
    commandLineArguments,
    selections,
    defaultVal
) =>
    commandLineArguments.find(el => Object.values(selections).includes(el)) ||
    defaultVal;

module.exports.execSyncPrint = command => {
    execSync(command, { stdio: "inherit" });
};
