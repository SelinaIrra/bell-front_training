var doc = document;
var flag = false;
var inputs = doc.getElementsByTagName('input');
var error = doc.getElementsByTagName('img')[0];
var input_expr = inputs[0];
var input_res = inputs[1];

input_expr.onblur = function () {
    var str = input_expr.value;
    str = str.replace(/\s/g, '');
    if (str)
        if (str.match(/^-?[0-9]+(\.[0-9]+)?([\+\-\/\*]-?[0-9]+(\.[0-9]+)?)*=$/g) === null) {
            error.style = 'visibility: visible;';
            flag = false;
            input_res.value = '';
        }
        else flag = true;
};

input_expr.onfocus = function () {
    error.style = 'visibility: hidden;';
};

doc.querySelector('button').onclick = function () {
    if (flag) {
        var str = input_expr.value;
        str = str.replace(/\s/g, '');
        var numbers = [];
        var operators = [];
        var negative = false;
        while (str !== '=') {
            if (str.match(/^[0-9]/) !== null) {
                numbers.push(Number(str.match(/^[0-9]+(\.[0-9]+)?/)[0]));
                str = str.replace(/^[0-9]+(\.[0-9]+)?/, '');
                if (negative) {
                    numbers[numbers.length - 1] *= -1;
                    negative = false;
                }
            }
            else if (numbers.length !== operators.length) {
                operators.push(str.match(/^[\+\-\/\*]/)[0]);
                str = str.replace(/^[\+\-\/\*]/, '');
            }
            else {
                negative = true;
                str = str.replace(/^\-/, '');
            }
        }
        var ans = numbers[0];
        for (var i = 0; i < operators.length; i++) {
            switch (operators[i]) {
                case '+':
                    ans += numbers[i + 1];
                    break;
                case '-':
                    ans -= numbers[i + 1];
                    break;
                case '*':
                    ans *= numbers[i + 1];
                    break;
                case '/':
                    ans /= numbers[i + 1];
                    break;
            }
        }
        input_res.value = Math.round(ans * 100) / 100;
    }
};