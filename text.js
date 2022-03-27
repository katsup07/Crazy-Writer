const textArea = document.querySelector('[name="text"]');
const result = document.querySelector('.result');
const filterInputs =Array.from(document.querySelectorAll('[name="filter"]'));

/* eslint-disable */ //Since it makes the file too long vertically.
const funkyLetters = {
    '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: 'ₕ', I: 'ᵢ', i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: 'ₖ', k: 'ₖ', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: 'ₘ', n: 'ₙ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ', S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: 'ₜ', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
  };

const filters = {
    sarcastic: function (char, index){
            index%2===0 ? char = char.toUpperCase() : char.toLowerCase();
            return char;
    },

    funky: function (char) {
        let funkyLetter = funkyLetters[char];
        if(funkyLetter) {
            return funkyLetter;
        }
        funkyLetter = funkyLetters[char.toUpperCase()];//Some letters don't have a lowercase letter matching funky letter.
        if(funkyLetter) {
            return funkyLetter;
        }
        return char;
        },

    unable: function (char, index, array){
        let randomNum = Math.floor(Math.random()*4);
        char = char.toLowerCase();
        index === 0 ? char = char.toLowerCase() : '';//Remove any capitalization at the start of text input.
        if(char === '?' || char === '!' || char === '.'){//Change any punctuation to '...'
            char = '...'
        }
        if(char===' ' & randomNum === 2){
            char = '...'
            return char;
        }
        if((char==='a' || char ==='i' || char === 'o' || char==='u') & randomNum === 2){
            char = ''
            return char;
        }
        return char;
    },
    
    yelling: function (char, index, array) {
        let randomNum = Math.floor(Math.random()*2);
        (char === '?' || char === '!' || char === '.') ? char = '!!' : '';
        return index === array.length-1 ? char.toUpperCase()+'!!!' : char.toUpperCase();
    },

    weirdInternet: function(char){
        char === 'i' ? char='!' : '';
        char === 'o' || char === 'O' ? char = '0' : '';
        char === 'a' ? char = '@' : '';
        char === 'e' ? char = '3' : '';
        char === 's' ? char = '$' : '';
        return char;
        
    },
 
}

function transformText(text) {
    // take the text and loop over each letter.
    const filter = filterInputs.find(input => input.checked).value;//=document.querySelector('name=["filter"]: checked').value; works too.
    const charArray = Array.from(text).map(filters[filter]);//Array.from() puts each letter of text into array position.
    result.textContent = charArray.join('');
   
}

textArea.addEventListener('input', e => transformText(e.target.value));//Can pass the event 'e' here or directly into the function.
filterInputs.forEach(input => input.addEventListener('input', () => {
    transformText(textArea.value);
} ));