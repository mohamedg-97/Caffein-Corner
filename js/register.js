// ===== جلب العناصر اللازمة من DOM =====
let fname = document.querySelector("#register-firstname"); // حقل إدخال الاسم الأول
let lname = document.querySelector("#register-lastname"); // حقل إدخال اسم العائلة
let email = document.querySelector("#register-email"); // حقل إدخال البريد الإلكتروني
let password = document.querySelector("#register-password"); // حقل إدخال كلمة المرور
let registerbtn = document.querySelector("#register-button"); // زر التسجيل

// ===== إضافة حدث للنقر على زر التسجيل =====
registerbtn.addEventListener("click", function (register) {
    register.preventDefault(); // منع السلوك الافتراضي للنموذج (إعادة التحميل)

    // ===== التحقق من الحقول الفارغة =====
    if (fname.value === "" || lname.value === "" || email.value === "" || password.value === "") {
        alert("Please fill in all the required fields."); // رسالة تنبيه إذا كانت الحقول فارغة
    } else {
        // ===== تخزين البيانات في localStorage =====
        localStorage.setItem("First Name", fname.value); // تخزين الاسم الأول
        localStorage.setItem("Last Name", lname.value); // تخزين اسم العائلة
        localStorage.setItem("Email", email.value); // تخزين البريد الإلكتروني
        localStorage.setItem("Password", password.value); // تخزين كلمة المرور

        // ===== إعادة توجيه المستخدم إلى صفحة تسجيل الدخول =====
        setTimeout(() => {
            window.location = "login.html"; // التوجيه إلى صفحة تسجيل الدخول
        }, 1500); // تأخير بسيط قبل التوجيه
    }
});
