var _ = require('lodash');
const fs = require('fs');

/**
 * Before providing JSON Files, validate that orignal CSVs were sorted
 * using this unix based terminal command: sort -u oldUnsorted.csv > newSorted.csv
 */
let oldJson = require("../json_files/sorted_json_deltas_75.json");
let newJson = require("../json_files/sorted_json_deltas_72.json");

/**
 * Function compares two files to check if matching for deltas.
 * Currently checking remapping values of oldID
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
const isSameUser = (a, b) => a.oldID === b.oldID;

/**
 * Get items that only occur in the left array,
 * using the compareFunction to determine equality.
 * @param {*} left - oldJson that will serve as our larger base count.
 * @param {*} right - newJson to be compared against, assumed to have a smaller count.
 * @param {*} compareFunction - Function used to comapre properties found in both files.
 * @returns All Accounts/Visitors found in both the oldJson and newJson files, to provide a full list of submitted data.
 */
const onlyInLeft = (left, right, compareFunction) => left.filter( leftValue => !right.some(rightValue => compareFunction(leftValue, rightValue)));

const onlyInA = onlyInLeft(oldJson, newJson, isSameUser);
console.log(onlyInA, onlyInA.length);

/** Additional Options, not required for this comparison. */
// const onlyInB = onlyInLeft(newJson, oldJson, isSameUser);
// const result = [...onlyInA, ...onlyInB];

/**
 * Output a JSON file of of your deltas, which contain all oldIds not found in both files.
 */
fs.writeFile("growens_deltas.json", JSON.stringify(onlyInA), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
});