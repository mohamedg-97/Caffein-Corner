document.addEventListener("DOMContentLoaded", function () {
    // تحديد العناصر في الصفحة
    let userInfo = document.querySelector("#user_info"); // العنصر الذي يحتوي على معلومات المستخدم
    let usern = document.querySelector("#user"); // العنصر الذي يعرض اسم المستخدم الأول
    let usern2 = document.querySelector("#user2"); // العنصر الذي يعرض اسم المستخدم الأخير
    let links = document.querySelector("#links"); // العنصر الذي يحتوي على روابط تسجيل الدخول

    // تحقق من وجود الأسماء في Local Storage
    if (localStorage.getItem("First Name") && localStorage.getItem("Last Name")) {
        // إذا كانت الأسماء موجودة في Local Storage، نقوم بإخفاء روابط تسجيل الدخول
        if (links) links.remove(); // إزالة روابط تسجيل الدخول إذا كانت موجودة
        userInfo.style.display = "flex"; // إظهار معلومات المستخدم
        // عرض اسم المستخدم في الصفحة باستخدام البيانات المخزنة في Local Storage
        usern.innerHTML = localStorage.getItem("First Name");
        usern2.innerHTML = localStorage.getItem("Last Name");
    }

    // التعامل مع حدث تسجيل الخروج
    let Delete = document.querySelector("#logout");
    if (Delete) {
        // إضافة حدث عند النقر على زر "تسجيل الخروج"
        Delete.addEventListener("click", rem);
    }

    // دالة لتسجيل الخروج
    function rem() {
        localStorage.clear(); // مسح جميع البيانات المخزنة في Local Storage
        location.reload(); // إعادة تحميل الصفحة بعد تسجيل الخروج
    }
});
