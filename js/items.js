// ===== استدعاء القهوة المخزنة في localStorage =====
const CoffesInShop = localStorage.getItem("CoffesInShop"); // استدعاء القيم المخزنة
const AllCoffe = document.querySelector(".Coffes"); // تحديد العنصر الذي سيتم فيه إضافة القهوة

// ===== التحقق إذا كانت القهوة موجودة في localStorage ثم رسمها =====
if (CoffesInShop) {
    const item = JSON.parse(CoffesInShop); // تحويل البيانات المخزنة من صيغة JSON إلى مصفوفة
    drawCoffes(item); // استدعاء دالة رسم القهوة إذا كانت البيانات موجودة
}

// ===== دالة لرسم القهوة على الصفحة =====
function drawCoffes(Coffes) {
const x = Coffes.map((item) => { // إنشاء عناصر HTML لكل قهوة
return `
<div class="col-md-6" id="coffe-${item.id}"> <!-- إضافة بادئة 'coffe-' للـ ID -->
<div class="card mb-3" style="max-width: 540px;">
<div class="row g-0">
<div class="col-md-4">
<img src="${item.imageUrl}" class="card-img-top" alt="${item.title} coffee image">
</div>
<div class="col-md-8">
<div class="card-body font">
    <h5 class="fw-bold"> Name: ${item.title}</h5>
    <p class="fw-bold">Price: ${item.price}</p>
    <p class="fw-bold">Rating: ${item.rate}</p>
<div class="action d-flex justify-content-between align-items-center font">
    <div class="plusAndMinus">
        <i class="fas fa-minus text-danger colorfav countMinus" onclick="minusCoffe(${item.id})"></i>
        <span class="count" id="countNum-${item.id}">${item.count}</span>
        <i class="fas fa-plus text-primary colorfav countPlus" onclick="plusCoffe(${item.id})"></i>
    </div>
    <button class="btn btn-outline-danger" onclick="Remove(${item.id})">Delete Item</button>
</div>
</div>
</div>
</div>
</div>
</div>
`;
}).join('');
AllCoffe.innerHTML = `<div class="row">${x}</div>`; // إضافة القهوة إلى الصفحة داخل العنصر المحدد
}

// ===== دالة لإزالة القهوة من الصفحة وlocalStorage =====
function Remove(id) {
    const removedItem = document.getElementById(`coffe-${id}`); // تحديد العنصر بناءً على الـ ID
    if (removedItem) {
        const priceText = removedItem.querySelector('p').textContent; // استخراج النص الذي يحتوي على السعر
        const price = parseFloat(priceText.split(': ')[1]); // استخراج السعر من النص
        removedItem.remove(); // إزالة العنصر من الصفحة

        const CoffesInShop = localStorage.getItem("CoffesInShop"); // تحديث البيانات المخزنة في localStorage
        if (CoffesInShop) {
            const items = JSON.parse(CoffesInShop);
            const updatedCoffes = items.filter(coffe => coffe.id !== id); // إزالة القهوة من المصفوفة
            localStorage.setItem("CoffesInShop", JSON.stringify(updatedCoffes)); // تخزين المصفوفة المحدثة

            let getTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0; // تحديث السعر الإجمالي
            getTotalPrice -= price; // تقليل السعر
            localStorage.setItem("totalPrice", getTotalPrice); // تخزين السعر الجديد
            updateTotalPrice(); // تحديث عرض السعر الإجمالي
        }
    }
}

// ===== استدعاء دالة تحديث السعر الإجمالي عند تحميل الصفحة =====
updateTotalPrice();

// ===== دالة لتحديث عرض السعر الإجمالي =====
function updateTotalPrice() {
    const getTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0; // جلب السعر الإجمالي
    const showPrice = document.querySelector(".totalprice");
    const priceSpan = showPrice.querySelector("span");

    if (getTotalPrice > 0) {
        showPrice.style.display = "block"; // عرض السعر إذا كان أكبر من 0
        priceSpan.innerHTML = getTotalPrice + " $"; // عرض السعر الإجمالي
    } else {
        showPrice.style.display = "none"; // إخفاء العرض إذا لم يكن هناك سعر
    }
}

// ===== دوال زيادة وتقليل الكمية =====
function plusCourse(id) {
    let xPlus = localStorage.getItem("CoffesInShop") ? JSON.parse(localStorage.getItem("CoffesInShop")) : []
    let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0

    xPlus.forEach((ele) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            totalPrice += price // زيادة السعر الإجمالي
            ele.count += 1

            // تحديث الكمية في الصفحة
            document.getElementById(`countNum-${id}`).textContent = ele.count
        }
    })

    localStorage.setItem("CoffesInShop", JSON.stringify(xPlus))
    localStorage.setItem("totalPrice", totalPrice) //localStorage تحديث السعر الإجمالي في 
    updateTotalPrice() // تحديث عرض السعر
}

 // دالة لتقليل الكمية
function minusCourse(id) {
    let xMinus = localStorage.getItem("CoffesInShop") ? JSON.parse(localStorage.getItem("CoffesInShop")) : []
    let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0

    xMinus.forEach((ele, index) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            ele.count -= 1
            if (ele.count <= 0) { // إذا كانت الكمية أقل من أو تساوي 0
                totalPrice -= price // تقليل السعر الإجمالي
                xMinus.splice(index, 1) // حذف الكورس من المصفوفة
                document.getElementById(`coffe-${id}`).remove() // إزالة العنصر من الواجهة
            } else {
                totalPrice -= price // تقليل السعر الإجمالي
                document.getElementById(`countNum-${id}`).textContent = ele.count // تحديث الكمية
            }
        }
    })

    localStorage.setItem("CoffesInShop", JSON.stringify(xMinus))
    localStorage.setItem("totalPrice", totalPrice) // localStorage تحديث السعر الإجمالي في 
    updateTotalPrice() // تحديث عرض السعر
}

// ===== تهيئة Swiper لعرض القهوة المفضلة =====
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// ===== دوال القهوة المفضلة =====
let favinShop = localStorage.getItem("favinShop");
let favCoffes = document.querySelector(".swiper-wrapper");

if (favinShop) {
    let itemfav = JSON.parse(favinShop);
    drawCoffesfav(itemfav);
}

function drawCoffesfav(Coffes) {
    let x = Coffes.map((item) => {
        return `
            <div class="swiper-slide" id="fav-${item.id}">
                <div class="card card1 mx-auto" style="width: 18rem;">
                    <img src="${item.imageUrl}" class="card-img-top" alt="${item.title} coffee image">
                    <div class="font card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="fw-bold"> Name: ${item.title}</h5>
                                <p class="fw-bold">Price: ${item.price}</p>
                            </div>
                            <i class="fas fa-heart ms-auto fs-3 text-danger colorfav" onclick="Removefav(${item.id})"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    favCoffes.innerHTML = x;
}

function Removefav(id) {
    const removedItem = document.getElementById(`fav-${id}`);
    if (removedItem) {
        removedItem.remove();
    }
    const CoffesInShop = localStorage.getItem("favinShop");
    if (CoffesInShop) {
        const item = JSON.parse(CoffesInShop);
        const updatefav = item.filter(coffe => coffe.id !== id);
        localStorage.setItem("favinShop", JSON.stringify(updatefav));
    }
}
