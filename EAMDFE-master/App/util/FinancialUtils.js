export const SimpleInterest = (capital, interestRate, timePeriod) => {
    return capital * (interestRate / 100) * (timePeriod / 12);
}


export const CompoundInterest = (capital, interestRate, timePeriod) => {

    return capital * (((1 + (interestRate / 100)) ** timePeriod) - 1);
}

export const CapitalFromSimpleInterest = (simpleInterest, interestRate, timePeriod) => {

    return simpleInterest / ((interestRate / 100) * (timePeriod / 12));
}

export const CapitalFromCompoundInterest = (compoundInterest, interestRate, timePeriod) => {

    return compoundInterest / (((1 + (interestRate / 100)) ** timePeriod) - 1);
}


export const InterestRateFromSimpleInterest = (simpleInterest, capital, timePeriod) => {

    return 100 * simpleInterest * (12 / (capital * timePeriod));
}

export const InterestRateFromCompoundInterest = (compoundInterest, capital, timePeriod) => {

    return 100 * ((((compoundInterest - capital) / capital) ** (1 / timePeriod)) - 1);
}

