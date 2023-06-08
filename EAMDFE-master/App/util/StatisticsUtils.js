export const max = (arr) => {

    let maxVal = 0;

    arr.forEach(el => {
        if (el > maxVal) {
            maxVal = el;
        }
    });

    return maxVal;
}

export const computeAbsoluteFrequencies = (arr) => {

    const frequencies = new Map();

    arr.forEach(el => {
        if (frequencies.has(el)) {
            frequencies.set(el, frequencies.get(el) + 1);
        } else {
            frequencies.set(el, 1);
        }
    })

    return frequencies;
}

export const stringifyMapValues = (absoluteFrequencies) => {
    const stringifiedMap = new Map(absoluteFrequencies);
    absoluteFrequencies.forEach((value, key, map) => {
        const stringifiedValue = JSON.stringify(value);
        stringifiedMap.set(key, stringifiedValue);
    })
    return stringifiedMap;
}

export const computeRelativeFrequencies = (arr, absoluteFrequencies) => {

    const relativeFrequencies = new Map();
    const population = arr.length;

    absoluteFrequencies.forEach((value, key, map) => {
        relativeFrequencies.set(key, parseFloat((value / population * 100).toFixed()))
    });

    return relativeFrequencies;
}

export const createFrequenciesMap = (arr) => {

    const frequencies = new Map();

    arr.forEach(el => {
        if (!frequencies.has(el)) {
            frequencies.set(el, "");
        }
    })

    return frequencies;
}

export const getUniques = (arr) => {

    const unique = [];
    arr.forEach(el => {
        if (!unique.includes(el)) {
            unique.push(el);
        }
    })

    return unique;
}

export const median = (data) => {

    const n = data.length;
    const sortedData = data.sort();
    let med;
    if (n % 2 === 0) {
        med = (sortedData[n / 2] + sortedData[n / 2 + 1]) / 2;
    } else {
        med = sortedData[(n + 1) / 2];
    }

    return med;
}

export const maxFrequency = (absoluteFrequencies) => {

    let maxFr = 0;
    absoluteFrequencies.forEach((value, key, map) => {
        if (value > maxFr) {
            maxFr = value;
        }
    });
    return maxFr;
}


export const mode = (absoluteFrequencies) => {

    const m = [];
    const maxFr = maxFrequency(absoluteFrequencies);

    absoluteFrequencies.forEach((value, key, map) => {

        if (value === maxFr) {
            m.push(key);
        }
    });

    if (m.length === absoluteFrequencies.size) {
        return [];
    }
    return m;
}

export const stringifyArr = (array) => {

    const stringifiedArray = [];

    array.forEach(el => {
        const stringifiedEl = JSON.stringify(el);
        stringifiedArray.push(stringifiedEl);
    })

    return stringifiedArray;
}

export const mean = (data) => {

    const length = data.length;
    let sum = 0;
    data.forEach(el => {
        sum += el;
    })

    return sum / length;
}