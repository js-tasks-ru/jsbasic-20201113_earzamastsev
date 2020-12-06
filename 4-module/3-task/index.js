/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    for (row of table.rows) {

        if (row.cells[3].hasAttribute('data-available')) {
            if (row.cells[3].dataset.available == "true") {
                row.classList.add('available');
            } else { row.classList.add('unavailable'); }
        } else row.setAttribute('hidden', "");

        if (row.cells[2].innerText == "m") {
            row.classList.add('male');
        } else row.classList.add('female');

        if (+row.cells[1].innerText < 18) {
            row.style.textDecoration = "line-through";
        }
    }
}
