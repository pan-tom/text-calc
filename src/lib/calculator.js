export default text => {

    const regexp = new RegExp('(\\s|^)(\\-|\\+)\\d+((\\.|,)\\d{1,2})?', 'gmi');

    return new Promise(resolve => {
        
        const matchesAll = text.matchAll(regexp);
        const matches = Array.from(matchesAll, data => {
            return {
                num: data[0].trim(),
                pos: data.index + 1,
            };
        });
        
        const calcs = [];
        const sum = matches.reduce((prev, currObj, index) => {
            const curr = parseFloat(currObj.num.replace(',', '.'));
            calcs[index] = {
                num: curr,
                pos: currObj.pos + 1,
                len: currObj.num.length - 1,
            };
            return prev + curr;
        }, 0);

        resolve({
            calcs,
            sum,
        });

    });
    
};
