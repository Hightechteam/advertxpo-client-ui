

export function addCommasToNumber(numberToAddCommas:any=0): string {
    console.log("Number to add commas: " + numberToAddCommas);
    return numberToAddCommas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}