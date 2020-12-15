/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */

export default class UserTable {
  constructor(rows) {
    this.table = document.createElement('table');
    const HeaderTemplate = `<thead>
    <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
    </tr>
</thead>`;
    this.table.insertAdjacentHTML('afterBegin', HeaderTemplate);
    this.data = rows;
    this.table.addEventListener('click', this.remove);
    this.elem = this.render();
  }

 render()  {
  if (!this.tbody) {
    this.tbody = document.createElement('tbody');
  }

  for (let row of this.data) {
    let template = `<tr>
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.salary}</td>
          <td>${row.city}</td>
          <td><button class='delete'>X</button></td>
        </tr>`;
    this.tbody.insertAdjacentHTML('beforeEnd', template);
  }
    this.table.append(this.tbody);
    return this.table;

 }  

remove(event) {
  let target = event.target;
    if (target.tagName == 'BUTTON') {
        event.target.closest("tr").remove();
    }
}
}


