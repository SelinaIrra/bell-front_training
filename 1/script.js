var doc = document;
separators = ['?', '!', ':', ';', '.', ',', ' ', '\t'];

function remover(str, ans, word_begin, word_end) {
    var word = str.substring(word_begin, word_end);
    for (var k = 0; k <= word.length; k++)
        if (word.lastIndexOf(word[k]) !== word.indexOf(word[k])) {
            ans = ans.split(word[k]).join('');
            ans = ans.split(word[k].toUpperCase()).join('');
        }
    return ans;
}

doc.querySelector('button').onclick = function () {
    var inputs = doc.querySelectorAll('input');
    str = inputs[0].value;
    var ans = str;
    str.toLowerCase();
    var word_begin = 0,
        word_end = 0;
    for (var i = 0; i < str.length; i++) {
        if (!separators.includes(str[i]))
            word_end++;
        else {
            ans = remover(str, ans, word_begin, word_end);
            word_begin = i + 1;
            word_end = i + 1;
        }
    }
    ans = remover(str, ans, word_begin, word_end);

    inputs[1].setAttribute('value', ans);
};