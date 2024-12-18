
async function fetchData() {
    try {
        const response = await fetch('db.json');
        if (!response.ok) {throw new Error('netError');}
        const data = await response.json();
        console.log(data);
        console.log(data.products);
        data.products.forEach((product)=>{
            const li = document.createElement('li');
            
            const img = document.createElement('img');
            img.classList.add('cardPreview');
            img.src = `assets/imgs/${product.category}.png`;
            
            const productName = document.createElement('span');
            productName.classList.add('productName');
            productName.textContent = product.name;

            const productPrice = document.createElement('span');
            productPrice.classList.add('productPrice');
            productPrice.textContent = product.price;

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove');
            removeButton.textContent = "-";
            
            const quantitySpan = document.createElement('span');
            quantitySpan.classList.add('quantity');
            quantitySpan.textContent = "0";

            const addButton = document.createElement('button');
            addButton.classList.add('add');
            addButton.textContent = "+";

            li.appendChild(img);
            li.appendChild(productName);
            li.appendChild(productPrice);
            li.appendChild(removeButton);
            li.appendChild(quantitySpan);
            li.appendChild(addButton);
            document.getElementById((product.category).toLowerCase()+"Menu").appendChild(li);
        })
        document.querySelectorAll(".add,.remove").forEach((btn)=>{
            btn.addEventListener('click',(e)=>{
                console.log('click');
                const span = e.target.parentNode.querySelector('.quantity');
                if(e.target.className==='add'){
                    span.textContent = parseInt(span.textContent)+1;
                    return
                }
                if(span.textContent!=0){
                    span.textContent = parseInt(span.textContent)-1;
                }
        
            })
        })
    } catch (error) {
        console.error('erro:', error);
    }
}
fetchData();

document.getElementById("addTable").addEventListener("click",()=>{
    // db add table function needed
    //id should be db index or sequential number?
    document.querySelector("ul").innerHTML += `
    <li class="table" id="t${10}">
        <span class="tableName">${"new"}</span>
        <div class="tableStatus" value >free</div>
    </li>   
    `;
});

const dialog = document.querySelector("dialog");
document.querySelectorAll(".table").forEach((table)=>{
    table.addEventListener("click",(e)=>{
        //db select table/order info call
        dialog.querySelector("span").textContent = e.target.id;
        dialog.querySelector(".deleteTableBtn").id = `d${e.target.id}`;
        dialog.show();
    })
});

document.querySelector(".closeDialogBtn").addEventListener("click",(e)=>{
    dialog.close();
});
document.querySelector(".deleteTableBtn").addEventListener("click",(e)=>{

    //db delete table call
    document.getElementById("tablesList").removeChild(document.getElementById(e.target.id.slice(1)))
});
function listSearch(list,input){
    const li = document.getElementById(list).querySelectorAll("li"),
        filter = document.getElementById(input),
        search = filter.value.toUpperCase();
    document.querySelectorAll("li").forEach((_,index) => {
        li[index].style.display = li[index].textContent.toUpperCase().indexOf(search) > -1 ? "flex" : "none";
    });
}
document.getElementById("tableInput").addEventListener("keyup",()=>{
    listSearch("tablesList","tableInput")
});
const navBtns = document.querySelectorAll(".navBtn"),
    sections = document.querySelectorAll("section");

navBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        dialog.close();
        if(e.target.classList.contains('active')){return}
        navBtns.forEach((btnCheck)=>{btnCheck.classList.remove("active")});
        e.target.classList.add("active");
        sections.forEach((sec)=>{sec.style.display="none"});
        document.getElementById(e.target.value).style.display="flex";
    })
});
document.getElementById("configsBtn").addEventListener("click",(e)=>{
    navBtns.forEach((btnCheck)=>{btnCheck.classList.remove("active")});
    sections.forEach((sec)=>{sec.style.display="none"});
    document.getElementById(e.target.value).style.display="flex";
});

document.getElementById("createOrder").addEventListener('click',()=>{
    createOrder("list",document.querySelector('[name="customerName"]').value,document.querySelector('[name="orderDetails"]').value);
    //db insert new order
})
function createOrder(products,client,obs){
    console.log(products,client,obs);
}

const orderList = document.getElementById("orderProductsList");
const btnsss = orderList.querySelectorAll("button").forEach((categoryBtn)=>{
    categoryBtn.addEventListener('click',(e)=>{
        orderList.querySelectorAll('menu').forEach((menu)=>{
            menu.style.display="none";
        })
        document.getElementById(e.target.value).style.display="flex";
        // console.log(e.target.textContent);
    })
})