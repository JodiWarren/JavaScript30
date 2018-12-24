// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Some data we can work with
var inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];
var people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
var firstXChars = function (firstNumber) { return function (input) { return input.toString().slice(0, firstNumber); }; };
var test = function (a, b) { return (a === b); };
var firstTwoChars = firstXChars(2);
// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
var bornIn1500s = function (person) { return test(firstTwoChars(person.year), '15'); };
var inventorsBornIn1500s = inventors.filter(bornIn1500s);
console.log("inventorsBornIn1500s");
console.table(inventorsBornIn1500s);
// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
var combineName = function (person) { return person.first + " " + person.last; };
var inventorsNames = inventors.map(combineName);
console.log({ inventorsNames: inventorsNames });
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
/**
 * Sort function builder
 * @param callback
 */
var sortCallback = function (callback) {
    return function (compareType) {
        return function (a, b) { return compareType(callback(a), callback(b)); };
    };
}; // Last, perform the actual comparison
var sortNumberAsc = function (a, b) { return a - b; };
var sortKey = function (key) { return sortCallback(function (value) { return value[key]; }); };
var sortYearsAsc = sortKey('year')(sortNumberAsc);
var inventorsSortedByBirthdate = inventors.sort(sortYearsAsc);
console.log("inventorsSortedByBirthdate");
console.table(inventorsSortedByBirthdate);
// Array.prototype.reduce()
// 4. How many years did all the inventors live?
var personLifespan = function (person) { return person.passed - person.year; };
var personArrayReducer = function (acc, currVal) { return acc + personLifespan(currVal); };
var totalInventorLifespan = inventors.reduce(personArrayReducer, 0);
console.log({ totalInventorLifespan: totalInventorLifespan });
// 5. Sort the inventors by years lived
var appendLifespan = function (person) { return (__assign({ lifespan: personLifespan(person) }, person)); };
var sortByLifespan = sortCallback(personLifespan)(sortNumberAsc);
var inventorsSortedByYearsLived = inventors
    // .map(appendLifespan)
    .sort(sortByLifespan);
console.log("inventorsSortedByYearsLived");
console.table(inventorsSortedByYearsLived);
// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
var $ = function (selector) { return [].slice.call(document.querySelectorAll(selector)); };
var containsText = function (text) { return function (element) { return element.innerText.indexOf(text) > -1; }; };
var containsDe = containsText('de');
var boulevardsWithDe = $('.mw-category-group a').filter(containsDe);
console.log(boulevardsWithDe);
// 7. sort Exercise
// Sort the people alphabetically by last name
var sortAlphaAsc = function (a, b) { return a > b ? 1 : a < b ? -1 : 0; };
var sortByFirstElement = sortCallback(function (array) { return array[0]; });
var sortByFirstElementAlpha = sortByFirstElement(sortAlphaAsc);
var splitOnComma = function (string) { return string.split(','); };
var joinWithComma = function (array) { return array.join(', '); };
var peopleByLastName = people
    .map(splitOnComma)
    .sort(sortByFirstElementAlpha)
    .map(joinWithComma);
console.table(peopleByLastName);
// 8. Reduce Exercise
// Sum up the instances of each of these
var data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];
var dataCount = data.reduce(function (acc, currVal) {
    if (!acc[currVal]) {
        acc[currVal] = 1;
    }
    acc[currVal] = acc[currVal] + 1;
    return acc;
}, {});
console.table(dataCount);
