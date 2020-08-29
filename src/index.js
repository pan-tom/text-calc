import autosize from 'autosize';
import storage from './lib/storage';
import './index.scss';

const getEl = id => document.getElementById(id);

const app = getEl('app');

let markup = '<div id="container">';
markup += '<header>';
markup += '<h1>Text Calc</h1>';
markup += '<div>';
markup += '<button id="example">show example</button>';
markup += '<button id="clear">clear</button>';
markup += '</div>';
markup += '</header>';
markup += '<textarea id="text" autofocus></textarea>';
markup += '<div id="calcs"></div>';
markup += '<div id="result"></div>';
markup += '<div id="info"></div>';
markup += '</div>';
app.innerHTML = markup;

const clearBtn = getEl('clear');
const exampleBtn = getEl('example');
const textBox = getEl('text');
const calcsBox = getEl('calcs');
const resultBox = getEl('result');
const infoBox = getEl('info');

autosize(textBox);

const setResult = (calcs, sum) => {

    const resultText = (calcs.length > 0 ? ' = ' + sum.toFixed(2) : '');
    const calcsKeys = Object.keys(calcs);

    const textBoxSelect = el => {
        textBox.focus();
        textBox.setSelectionRange(el.getAttribute('data-pos-from'), el.getAttribute('data-pos-to'));
    };

    calcsBox.classList.toggle('visible', calcs.length);
    calcsBox.innerHTML = '';
    
    for(const key of calcsKeys) {
        const num = calcs[key].num;
        const numStr = num.toFixed(2).toString().replace('-', '');
        const sign = (num > 0 ? ' + ' : ' - ');
        const sign1st = (num > 0 ? '' : '-');
        const textRange = [ calcs[key].pos, calcs[key].pos + calcs[key].len ];
        let text = '';
        text += (key === '0' ? sign1st : sign);
        text += '<span data-pos-from="'+textRange[0]+'" data-pos-to="'+textRange[1]+'">' + numStr + '</span>';
        calcsBox.innerHTML += text;
    }

    resultBox.classList.toggle('visible', resultText.length);
    resultBox.innerText = resultText;

    calcsBox.querySelectorAll('span').forEach(el => {
        el.addEventListener('click', () => textBoxSelect(el));
    });

};

exampleBtn.addEventListener('click', () => {
    textBox.value = 'John gives me +100 for a good job\n+100 from Jane\nAdam wants -200 from me\nEve is generous +300\nThis does not count: (-100)';
    textBox.dispatchEvent(new Event('input'));
    textBox.focus();
});

clearBtn.addEventListener('click', () => {
    textBox.value = '';
    textBox.dispatchEvent(new Event('input'));
    textBox.dispatchEvent(new Event('blur'));
    textBox.focus();
});

textBox.addEventListener('input', evt => {

    const text = evt.target.value;
    const regexp = new RegExp('(\\s|^)(\\-|\\+)\\d+((\\.|,)\\d{1,2})?', 'gmi');
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

    setResult(calcs, sum);

});

textBox.addEventListener('blur', evt => {

    const text = evt.target.value;

    if(text !== storage.get('text')) {
    
        storage.set('text', text);

        infoBox.innerText = storage.afterSetText;
        infoBox.classList.add('visible');
        setTimeout(() => {
            infoBox.classList.remove('visible');
        }, 500);

    }

});

textBox.value = storage.get('text');
textBox.dispatchEvent(new Event('input'));
