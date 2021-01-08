const chalk = require("chalk");
const { STATE } = require("./state");
const { metadata } = require("./metadata");

module.exports.identity = x => x;

module.exports.logNumber = () =>
    chalk`{magenta.bold ${
        metadata.general.programName
    } (${STATE.taskNumber++}):} `;

module.exports.argSettingOrDefault = (
    commandLineArguments,
    selections,
    defaultVal
) =>
    commandLineArguments.find(el => Object.values(selections).includes(el)) ||
    defaultVal;
