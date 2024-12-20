// العنصر الذي سيتم إضافة جميع الكورسات فيه
let AllCoffe = document.querySelector(".Coffes");

// بيانات الكورسات المتاحة في الموقع
let Coffes = [
{
    id: 1,
    title: "Salted Caramel Latte", // اسم المشروب
    price: "10$", // سعر المشروب
    rate: "★★★☆☆", // تقييم المشروب
    imageUrl: "images/Salted caramel latte.jpeg", // رابط الصورة الخاصة بالمشروب
    count: 1 // عدد الوحدات المُختارة من هذا المشروب
},
{
   id: 2,title: "Turkish Coffee", price: "17$",rate: "★★★★☆",imageUrl: "images/Turkish coffee.jpeg",count: 1
},
{
    id: 3,title: "White Chocolate Mocha",price: "15$",rate: "★★★★☆",imageUrl: "images/White mocha.jpeg",count: 1
},
{
    id: 4,title: "Apple Cider Tea",price: "33$",rate: "★★★☆☆",imageUrl: "images/Apple cider tea.jpeg", count: 1
},
{
    id: 5,title: "Hot Chocolate",price: "25$",rate: "★★★☆☆",imageUrl: "images/Hot chocolate.jpeg",count: 1
},
{
    id: 6,title: "Carmel Frappe",price: "45$",rate: "★★★★☆",imageUrl: "images/Carmel frappe.jpeg",count: 1
},
{
    id: 7,title: "Espresso",price: "27$",rate: "★★★☆☆",imageUrl: "images/Espresso.jpeg",count: 1
},
{
    id: 8,title: "Black Tea",price: "19$",rate: "★★★☆☆",imageUrl: "images/Black tea.jpeg",count: 1
},
{
    id: 9,title: "Cappuccino",price: "15$",rate: "★★★☆☆",imageUrl: "images/Cappuccino.jpeg",count: 1
}
];

// دالة لرسم الكورسات على الصفحة (عرض المشروبات في شكل بطاقات)
function drawCoffes() {
let x = Coffes.map((item) => {
return `
<div class="col-12 col-sm-4">
<div class="card card1 mx-auto" style="width: 18rem;" data-aos="fade-up">
<img src="${item.imageUrl}" class="card-img-top" alt="${item.title} learning image">
<div class="font card-body z-1">
    <h5 class="fw-bold">Name: ${item.title}</h5>  <!-- عرض اسم المشروب -->
    <p class="fw-bold">Price: ${item.price}</p>  <!-- عرض السعر -->
    <p class="fw-bold">Rating: ${item.rate}</p>  <!-- عرض التقييم -->
    <div class="action d-flex justify-content-between align-items-center">
        <button class="btn btn-outline-primary" id="purchase-${item.id}" data-price="${item.price}" onclick="ADD(${item.id})">Shop Coffe</button> <!-- زر شراء المشروب -->
        <i id="favcolor-${item.id}" class="fas fa-heart ms-auto fs-4 text-secondary colorfav" onclick="fav(${item.id})"></i> <!-- أيقونة المفضلة -->
    </div>
</div>
</div>
</div>
`
}).join('');
AllCoffe.innerHTML = `<div class="row g-3 mb-3">${x}</div>`; // إضافة جميع الكورسات داخل العنصر المحدد
}
drawCoffes();

// العنصر الذي سيعرض أسماء الكورسات المُختارة
let titleCoffes = document.querySelector(".items_coffe div");

// العنصر الذي سيعرض فيه عدد الكورسات المُختارة
let badge = document.querySelector(".badge");

// استرجاع العناصر المُضافة سابقًا من localStorage
let addItem = localStorage.getItem("CoffesInShop") ? JSON.parse(localStorage.getItem("CoffesInShop")) : [];

// إذا كانت هناك كورسات مضافة مسبقًا، سيتم عرضها
if (addItem) {
addItem.map(item => {
    titleCoffes.innerHTML += `
        <p>${item.title}
        <i class="fas fa-minus text-danger fs-6 m-lg-0 countMinus" onClick="minusCoffe(${item.id})"></i>
        <span class="count">${item.count}</span>
        <i class="fas fa-plus text-primary fs-6 m-lg-0 countPlus" onClick="plusCoffe(${item.id})"></i>
        <hr>
        </p>`
});
badge.style.display = "block"; // عرض عدد الكورسات المُختارة
badge.innerHTML = addItem.length; // تعيين عدد الكورسات في السلة
}

// استرجاع السعر الإجمالي من localStorage أو تعيينه إلى 0 إذا لم يكن موجودًا
let totalPrice = localStorage.getItem("totalPrice") ? parseFloat(localStorage.getItem("totalPrice")) : 0;

// دالة لتحديث السعر الإجمالي
function refreshPrice() {
let storedTotal = localStorage.getItem("totalPrice");
totalPrice = storedTotal ? parseFloat(storedTotal) : 0;
}

refreshPrice();

// دالة لإضافة كورس إلى السلة
function ADD(id) {
if (localStorage.getItem("First Name") && localStorage.getItem("Last Name")) {
    let choseItem = Coffes.find((item) => item.id === id);
    choseItem.count = 1;

    if (!addItem.some(item => item.id === choseItem.id)) {
        addItem = [...addItem, choseItem];
        localStorage.setItem("CoffesInShop", JSON.stringify(addItem));

        let price = parseFloat(choseItem.price.replace('$', ''));
        totalPrice += price;
        localStorage.setItem("totalPrice", totalPrice);

        updateCoffeDisplay(addItem); // تحديث عرض الكورسات في السلة
    }
} else {
    window.location = "login.html"; // إعادة التوجيه إلى صفحة تسجيل الدخول
}
}

// التعامل مع أيقونة السلة
let ShoppingCartIcon = document.querySelector(".cartIcon");
let ShowHeddin = document.querySelector(".items_coffe");

ShoppingCartIcon.addEventListener("click", Show);

function Show() {
if (titleCoffes.innerHTML != "") {
    ShowHeddin.style.display = ShowHeddin.style.display === "block" ? "none" : "block"; // إظهار أو إخفاء السلة
}
}

// دالة لتحديث عرض الكورسات في السلة
function updateCoffeDisplay(coffes) {
titleCoffes.innerHTML = "";
coffes.forEach((ele) => {
    titleCoffes.innerHTML += `
        <p>${ele.title}
        <i class="fas fa-minus text-danger fs-6 m-lg-0 countMinus" onClick="minusCoffe(${ele.id})"></i>
        <span class="count">${ele.count}</span>
        <i class="fas fa-plus text-primary fs-6 m-lg-0 countPlus" onClick="plusCoffe(${ele.id})"></i>
        </p>`;
});
badge.innerHTML = coffes.length; // تحديث عدد الكورسات المُختارة
badge.style.display = coffes.length ? "block" : "none"; // إظهار عدد الكورسات في السلة
}

// دالة لزيادة عدد الكورس في السلة
function plusCoffe(id) {
let xPlus = localStorage.getItem("CoffesInShop") ? JSON.parse(localStorage.getItem("CoffesInShop")) : [];
let price;

xPlus.forEach((ele) => {
    if (ele.id == id) {
        price = parseFloat(ele.price.replace('$', ''));
        totalPrice += price;
        ele.count += 1;
    }
});
updateCoffeDisplay(xPlus);
localStorage.setItem("CoffesInShop", JSON.stringify(xPlus));
localStorage.setItem("totalPrice", totalPrice);
}

// دالة لتقليل عدد الكورس في السلة
function minusCoffe(id) {
let xMinus = localStorage.getItem("CoffesInShop") ? JSON.parse(localStorage.getItem("CoffesInShop")) : [];
let price;

xMinus.forEach((ele, index) => {
    if (ele.id == id) {
        price = parseFloat(ele.price.replace('$', ''));
        ele.count -= 1;
        if (ele.count === 0) {
            totalPrice -= price;
            xMinus.splice(index, 1);
        } else {
            totalPrice -= price;
        }
    }
});
updateCoffeDisplay(xMinus);
localStorage.setItem("CoffesInShop", JSON.stringify(xMinus));
localStorage.setItem("totalPrice", totalPrice);
}

// إدارة المفضلات
let addItemfav = localStorage.getItem("favinShop") ? JSON.parse(localStorage.getItem("favinShop")) : [];

// دالة لتحديد أو إزالة الكورسات من المفضلة
function fav(id) {
if (localStorage.getItem("First Name") && localStorage.getItem("Last Name")) {
    let choseItem = Coffes.find((item) => item.id === id);
    let iconFvColor = document.querySelector(`#favcolor-${choseItem.id}`);

    if (addItemfav.some(item => item.id === choseItem.id)) {
        addItemfav = addItemfav.filter(item => item.id !== choseItem.id);
        iconFvColor.classList.remove('text-danger');
    } else {
        addItemfav = [...addItemfav, choseItem];
        iconFvColor.classList.add('text-danger');
    }
    localStorage.setItem("favinShop", JSON.stringify(addItemfav));
} else {
    window.location = "login.html";
}
}
// إدارة عملية الدفع
let checkoutButton = document.querySelector("#checkout-button");

// دالة الدفع أو متابعة التسوق
checkoutButton.addEventListener("click", function() {
if (addItem.length === 0) {
    alert("Your cart is empty. Please add some items before proceeding.");
} else {
    // الانتقال إلى صفحة الدفع أو تنفيذ خطوات الدفع (يمكن إضافة خطوات الدفع هنا)
    window.location = "checkout.html"; // توجيه المستخدم إلى صفحة الدفع
}
});

// عرض السعر الإجمالي في السلة
let totalPriceDisplay = document.querySelector("#total-price");

function updateTotalPrice() {
totalPriceDisplay.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// تحديث السعر عند إضافة أو إزالة كورس من السلة
function refreshCart() {
updateTotalPrice(); // تحديث عرض السعر الإجمالي
if (addItem.length === 0) {
    document.querySelector(".cart-empty-message").style.display = "block";
} else {
    document.querySelector(".cart-empty-message").style.display = "none";
}
}

// عند تحميل الصفحة يتم تحديث السلة
window.onload = function() {
refreshCart();
};

// دالة لإلغاء إضافة كورس من السلة
let removeButton = document.querySelector("#remove-button");

removeButton.addEventListener("click", function() {
let idToRemove = parseInt(prompt("Enter the ID of the coffee to remove from the cart:"));
let updatedItems = addItem.filter(item => item.id !== idToRemove);
addItem = updatedItems;
localStorage.setItem("CoffesInShop", JSON.stringify(addItem));
totalPrice = 0;
updatedItems.forEach(item => {
    let price = parseFloat(item.price.replace('$', ''));
    totalPrice += price * item.count;
});
localStorage.setItem("totalPrice", totalPrice);
refreshCart();
});

// إذا أراد المستخدم تنظيف السلة
let clearCartButton = document.querySelector("#clear-cart");

clearCartButton.addEventListener("click", function() {
localStorage.removeItem("CoffesInShop");
localStorage.removeItem("totalPrice");
addItem = [];
totalPrice = 0;
refreshCart();
});

// استعراض المفضلات
let favListButton = document.querySelector("#fav-list-button");

favListButton.addEventListener("click", function() {
if (addItemfav.length === 0) {
    alert("You have no favorite items.");
} else {
    let favItemsList = addItemfav.map(item => `<p>${item.title}</p>`).join("");
    document.querySelector(".fav-items").innerHTML = favItemsList;
}
});
