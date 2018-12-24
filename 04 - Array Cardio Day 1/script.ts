// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
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

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

interface Person {
    first: string;
    last: string;
    year: number;
    passed: number;
}

const firstXChars = (firstNumber: number) => (input: string | number) => input.toString().slice(0, firstNumber);
const test = (a, b) => (a === b);

const firstTwoChars = firstXChars(2);

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const bornIn1500s = (person: Person) => test(firstTwoChars(person.year), '15' )
const inventorsBornIn1500s = inventors.filter(bornIn1500s);
console.log(`inventorsBornIn1500s`);
console.table(inventorsBornIn1500s);

// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
const combineName = (person: Person) => `${person.first} ${person.last}`;
const inventorsNames = inventors.map(combineName);
console.log({inventorsNames});

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest

/**
 * Sort function builder
 * @param callback
 */
const sortCallback =
    (callback: (a: any) => any) => // First, curry with callback saved
        (compareType: (a: any, b: any) => any) => // Second, curry with comparison function
            (a, b) => compareType(callback(a), callback(b)); // Last, perform the actual comparison

const sortNumberAsc = (a: number, b: number) => a - b;
const sortKey = (key: string) => sortCallback(value => value[key]);
const sortYearsAsc = sortKey('year')(sortNumberAsc);

const inventorsSortedByBirthdate = inventors.sort(sortYearsAsc);
console.log(`inventorsSortedByBirthdate`);
console.table(inventorsSortedByBirthdate);

// Array.prototype.reduce()
// 4. How many years did all the inventors live?
const personLifespan = (person: Person) => person.passed - person.year;
const personArrayReducer = (acc, currVal) => acc + personLifespan(currVal);
const totalInventorLifespan = inventors.reduce(personArrayReducer, 0);
console.log({totalInventorLifespan});

// 5. Sort the inventors by years lived
const appendLifespan = (person) => ({
    lifespan: personLifespan(person),
    ...person
})
const sortByLifespan = sortCallback(personLifespan)(sortNumberAsc);
const inventorsSortedByYearsLived = inventors
    // .map(appendLifespan)
    .sort(sortByLifespan);

console.log(`inventorsSortedByYearsLived`);
console.table(inventorsSortedByYearsLived);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
const $ = (selector) => [].slice.call(document.querySelectorAll(selector));
/**
 * Construct text search
 * @param text
 */
const containsText = (text: string) => // Curries text to find
    (element: HTMLElement) => element.innerText.indexOf(text) > -1;
const containsDe = containsText('de');
const boulevardsWithDe = $('.mw-category-group a').filter(containsDe);
console.log(boulevardsWithDe);

// 7. sort Exercise
// Sort the people alphabetically by last name
const sortAlphaAsc = (a, b) => a > b ? 1 : a < b ? -1 : 0;
const sortByFirstElement = sortCallback((array: any[]) => array[0]);
const sortByFirstElementAlpha = sortByFirstElement(sortAlphaAsc);
const splitOnComma = (string: string) => string.split(',');
const joinWithComma = (array: any[]) => array.join(', ');
const peopleByLastName = people
    .map(splitOnComma)
    .sort(sortByFirstElementAlpha)
    .map(joinWithComma);
console.table(peopleByLastName);

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

const dataCount = data.reduce((acc, currVal) => {
    if (!acc[currVal]) {
        acc[currVal] = 1;
    }
    acc[currVal] = acc[currVal] + 1;
    return acc;
}, {});

console.table(dataCount);
