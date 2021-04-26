//handle the fields that I'll use later
var pNameInp = document.getElementById('pName');
var pCatInp = document.getElementById('pCat');
var pPriceInp = document.getElementById('pPrice');
var pDescInp = document.getElementById('pDesc');
var tBody = document.getElementById('tbody');
var searchInp = document.getElementById('search');
var addBtn = document.getElementById('add');
var updateBtn = document.getElementById('update');

/* if this is the first time you open the project then the local storage will be empty
so to avoid the error create the if statment */
if (localStorage.getItem('allProducts') == null) {
    var productsList = [];
} else {
    /* while refreshing the local storage data will be stored in the array 
    and also change the array from string to be array to use their functions */
    var productsList = JSON.parse(localStorage.getItem('allProducts'));
}

//display to the data from the local storage
displayProduct();

//create data
addBtn.addEventListener('click', function addProduct() {

    var product = {
        productName: pNameInp.value,
        productCategory: pCatInp.value,
        productPrice: pPriceInp.value,
        productDescription: pDescInp.value
    };
    //add objects to the array
    productsList.push(product);

    //add array on the local storage
    var stringArr = JSON.stringify(productsList);
    localStorage.setItem('allProducts', stringArr);

    //display the objects on the table
    displayProduct();

    //clear the form after the display
    clearForm();
})


//retrive data
function displayProduct() {

    var trs = '';

    for (var i = 0; i < productsList.length; i++) {
        trs += ` <tr>
        <td>${i}</td>
        <td>${productsList[i].productName}</td>
        <td>${productsList[i].productCategory}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDescription}</td>
        <td><i onclick='retriveProductInfo(${i});' class="fa fa-edit"></i></td>
        <td><i onclick='deleteProduct(${i});' class="far fa-trash-alt"></i></td>
    </tr>`
    }

    tBody.innerHTML = trs;
}

//clear form data after the display
function clearForm() {

    pNameInp.value = '';
    pCatInp.value = '';
    pPriceInp.value = '';
    pDescInp.value = '';

}

//real time search
searchInp.addEventListener('keyup', function search() {

            var trs = '';


            for (var i = 0; i < productsList.length; i++) {
                if (productsList[i].productName.toLowerCase().includes(searchInp.value.toLowerCase())) {
                    trs += ` <tr>
        <td>${i}</td>
        <td>${productsList[i].productName.replace(searchInp.value,`<span style='background-color:yellow;'>${searchInp.value}</span>`)}</td>
        <td>${productsList[i].productCategory}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDescription}</td>
        <td><i class="fa fa-edit"></i></td>
        <td><i class="far fa-trash-alt"></i></td>
    </tr>`
        }
    }

    tBody.innerHTML = trs;

})

//delete the selected item
function deleteProduct(ind) {

    productsList.splice(ind, 1);

    //update the local storage
    var stringArr = JSON.stringify(productsList);
    localStorage.setItem('allProducts', stringArr);

    //update the dipalyed table
    displayProduct();
}

//update

var updatedIndex;

function retriveProductInfo(ind) {

    updatedIndex = ind;

    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');

    pNameInp.value = productsList[ind].productName;
    pCatInp.value = productsList[ind].productCategory;
    pPriceInp.value = productsList[ind].productPrice;
    pDescInp.value = productsList[ind].productDescription;

}

updateBtn.addEventListener('click',function(){
 
    productsList[updatedIndex].productName = pNameInp.value;
    productsList[updatedIndex].productCategory = pCatInp.value;
    productsList[updatedIndex].productPrice = pPriceInp.value;
    productsList[updatedIndex].productDescription = pDescInp.value;

    displayProduct();

    var stringArr = JSON.stringify(productsList);
    localStorage.setItem('allProducts', stringArr);

    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');

    clearForm();
})