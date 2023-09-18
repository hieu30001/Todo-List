const btnSubmit = document.querySelector('.btn_submit');
const head = document.querySelector('.head');
const body = document.querySelector('.body');
const text = document.querySelector('#ip_text');
let count = 0;

function saveList() {
    let array = [];
    const Item = document.querySelectorAll('.item');
    for(let i=Item.length - 1; i>=0; i--) {
            const id = Item[i].dataset.id;
            const text = Item[i].querySelector('.span').textContent;
            array.push({id, text});
        }
    localStorage.setItem('arrays', JSON.stringify(array));
    console.log(array);
};

function loadCheckBox() {
    const Item = document.querySelectorAll('.item');
    const loadCheck = JSON.parse(localStorage.getItem('id_check')) || [];
    for(const a of loadCheck) 
         for(const b of Item)
            if(a == b.dataset.id) {b.querySelector('.check_box').checked = true}

};

function loadList() {
    const load = JSON.parse(localStorage.getItem('arrays')) || [];
    for(const i of load)
        createList(i.id, i.text)
};

function createList (id, text) {
    let add = document.createElement('div');
    add.classList.add('item');
    add.dataset.id = id;
    const currentCount = id; 
    add.innerHTML = `
    <table>
        <tr>
            <td class="td_1">
                <input class="check_box" type="checkbox"></input> 
                <span class="span" id="span_text${currentCount}">${text}</span> 
            </td>
            <td class="td_2">
                <button class="btn btn_view" id="btn_view_${currentCount}"> View </button> 
                <button class="btn btn_edit" id="btn_edit_${currentCount}"> Edit </button>
                <button class="btn btn_delete" id="btn_delete_${currentCount}"> Delete </button>
            </td>
        </tr>
    </table>`;
    
    body.prepend(add);
    const btnView = document.querySelector(`#btn_view_${currentCount}`);
    const btnEdit = document.querySelector(`#btn_edit_${currentCount}`);
    const btnDelete = document.querySelector(`#btn_delete_${currentCount}`);
    const btnClose = document.querySelector('.close-modal');

    saveList();

    //checkbox
    const checkbox = document.querySelector('.check_box');
    checkbox.addEventListener('change', function(event) {
        const id_check = JSON.parse(localStorage.getItem('id_check')) || [];
        event.target.checked ? id_check.push(`${id}`) : id_check.splice(id_check.indexOf(id), 1);
        
        // Lưu mảng id_check vào localStorage
        localStorage.setItem('id_check', JSON.stringify(id_check));
        console.log(localStorage.getItem('id_check'))
    });


    //view
    btnView.addEventListener('click', function () {
        const itemDiv = document.querySelector(`#item`);
        const textSpan = document.querySelector(`#span_text${currentCount}`).textContent;
        itemDiv.textContent = textSpan; 
        document.querySelector('.modal').classList.remove('hidden'); 
        
      });
      
    btnClose.addEventListener('click', function () {
        document.querySelector('.modal').classList.add('hidden'); // Ẩn view khi đóng
    });

    //add input edit
    let isEditing = false; // Biến kiểm tra xem đang chỉnh sửa hay không

    btnEdit.addEventListener('click', function () {
        // Kiểm tra nếu đang chỉnh sửa thì không tạo thẻ div mới
        if (isEditing) return;
        isEditing = true; // Đánh dấu rằng đang trong quá trình chỉnh sửa
    
        let edit = document.createElement('div');
        edit.classList.add('div_edit');
        edit.innerHTML = `
                <input type="text" class="ip_edit" id="edit_text_${currentCount}"></input> 
                <button class="btn" type="submit" id="confirm_${currentCount}">Confirm</button>
        `;
    
        add.append(edit);
    
        const confirmBtn = document.querySelector(`#confirm_${currentCount}`);
        // Chỉnh sửa văn bản
        confirmBtn.addEventListener('click', function () {
            const editedText = document.querySelector(`#edit_text_${currentCount}`).value;
            const paragraph = document.querySelector(`#span_text${currentCount}`);
            paragraph.textContent = editedText;
            saveList();
            edit.remove();
            isEditing = false; // Kết thúc quá trình chỉnh sửa
        });
    });
    

    //delete
    btnDelete.addEventListener('click', function () {
        const id_check = JSON.parse(localStorage.getItem('id_check')) || [];
        const v = add.dataset.id;
        id_check.splice(id_check.indexOf(v),1);
        localStorage.setItem('id_check', JSON.stringify(id_check));
        //console(id_check);
        add.remove();
        saveList();
    });
};
//localStorage.clear();
console.log(localStorage.getItem('id_check'))
loadList();
loadCheckBox();
const submit  = function() {
    const load = JSON.parse(localStorage.getItem('arrays')) || []; // chuyển kiểu dữ liệu trong localStorage từ chuỗi sang mảng
    let text = document.getElementById('ip_text').value; // lấy dữ liệu từ input text
    load.length > 0 ? count = Number(load[load.length - 1].id) + 1 : count = 1; 
    text === ''? alert('Please write name in box text !') : (
    //console.log(load[load.length - 1]);
    createList(count, text),
    document.getElementById('ip_text').value = '')
}
btnSubmit.addEventListener('click', submit)







