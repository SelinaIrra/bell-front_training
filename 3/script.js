var doc = document;

addEventListener('load', function () {
    var blocks = doc.querySelectorAll('.block');
    for (var i = 0; i < blocks.length; i++) {
        var available_list = blocks[i].getElementsByClassName('select_box')[0];
        blocks[i].getElementsByClassName('select_box')[1].style = 'width: ' + available_list.offsetWidth + 'px;';
    }
});

addEventListener('click', function (event) {
    var target = event.target;
    var block = target.closest('.block');
    remove_error();
    if (block !== null && target.tagName === 'BUTTON')
            button_for_move_click(block, target);
    remove_select(block);
});

function remove_select(block) {
    var blocks = doc.querySelectorAll('.block');
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i] !== block) {
            var options = blocks[i].getElementsByTagName('option');
            for (var j = 0; j < options.length; j++)
                options[j].selected = '';
        }
    }
}

function remove_error() {
    var blocks = doc.querySelectorAll('.block');
    for (var i = 0; i < blocks.length; i++)
        blocks[i].getElementsByTagName('img')[0].style = 'visibility: hidden';
}

function button_for_move_click(block, btn) {
    var buttons = block.querySelectorAll('button');
    var selected_list = block.getElementsByClassName('select_box')[1];
    var available_list = block.getElementsByClassName('select_box')[0];
    switch (btn) {
        case buttons[0]:
            move(block, available_list, selected_list, true);
            remove_select();
            break;
        case buttons[1]:
            move(block, available_list, selected_list, false);
            break;
        case buttons[2]:
            move(block, selected_list, available_list, false);
            break;
        case buttons[3]:
            move(block, selected_list, available_list, true);
            remove_select();
            break;
    }
}

function checkSelect(options, all) {
    var selected_el = Array.prototype.slice.call(options).some(function (el) {
        return el.selected;
    });
    return !(options.length === 0 || (!selected_el && !all));
}

function move(block, list1, list2, all) {
    var options = list1.children;
    if (checkSelect(options, all))
        for (var i = 0; i < options.length; i++) {
            if (all) {
                options[i].selected = 'true';
                remove_error();
            }
            if (options[i].selected) {
                var option = doc.createElement('option');
                option.innerText = options[i].innerHTML;
                list2.appendChild(option);
                list1.removeChild(options[i]);
                i--;
            }
        }
    else
        block.getElementsByTagName('img')[0].style = 'visibility: visible';
    list1.style = 'width:' + list2.offsetWidth + 'px;';
}