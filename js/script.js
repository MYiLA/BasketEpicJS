ready(function(){

  // В этом месте должен быть написан ваш код
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const productsList = [
  {
    name: book,
    imgSrc: 'img/tsennye-resheniya.jpg',
    imgAlt: 'Ценные решения',
    price: 1000,
    quantity: 1,
  }
] 
  // 2. должна работать смена кол-ва книг (при этом пересчитывается цена)
  // сделать рабочие кнопки + и -, почитай про делегирование. как оно будет реализовано?

  // 3. должно работать удаление книг из корзины (пересчитывать цену, менять кол-во в заголовке)
  
  // 4. должны проверяться текстовые поля раздела «Ваши контакты» (все обязательны, проверяем только их заполнение, 
  // без проверок телефона, мыла и пр.)
  
  // 5. при выборе радиокнопок в блоке «Доставка и адрес» должны скрываться/показываться блок с селектором самовывоза 
  // и блок с картой (выбран самовывоз — виден только селектор пункта самовывода; выбрана доставка или курьер — 
  // показать блок с картой (там сейчас текст, карту добавлять не обязательно))
  
  // 6. должен анализироваться текстовой инпут промо-кода (если там введено EPIXX, то под полем показать скидку 150 р 
  // (она сейчас показана) и пересчитать цену)
  // взять значение ввода, убрав пробелы и сравнить со строкой 'EPIXX'






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ВНИМАНИЕ!
  // Нижеследующий код (кастомный селект и выбор диапазона цены) работает
  // корректно и не вызывает ошибок в консоли браузера только на главной.
  // Одна из ваших задач: сделать так, чтобы на странице корзины в консоли
  // браузера не было ошибок.

  // Кастомные селекты (кроме выбора языка)
  new Choices('.field-select:not(#lang) select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
  });
  // Кастомный селект выбора языка отдельно
  new Choices('#lang select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
    callbackOnCreateTemplates: function (template) {
      return {
        item: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
              ${getLangInSelectIcon(data.value)} ${data.label.substr(0,3)}
            </div>
          `);
        },
        choice: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
              ${getLangInSelectIcon(data.value)} ${data.label}
            </div>
          `);
        },
      };
    }
  });
  function getLangInSelectIcon(value) {
    if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
    else if (value == 'en') return '<span class="field-select__lang-en"></span>';
    return '<span class="field-select__lang-null"></span>';
  }

  // Выбор диапазона цен
  var slider = document.getElementById('price-range');
  noUiSlider.create(slider, {
    start: [400, 1000],
    connect: true,
    step: 100,
    range: {
      'min': 200,
      'max': 2000
    }
  });

});

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
