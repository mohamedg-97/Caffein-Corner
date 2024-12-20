// ===== جلب العناصر اللازمة من DOM =====
let email = document.querySelector("#login-email"); // حقل إدخال البريد الإلكتروني
let password = document.querySelector("#login-password"); // حقل إدخال كلمة المرور
let loginbtn = document.querySelector("#login-button"); // زر تسجيل الدخول

// ===== استدعاء البيانات المخزنة في localStorage =====
let getemail = localStorage.getItem("Email"); // البريد الإلكتروني المخزن
let getpassword = localStorage.getItem("Password"); // كلمة المرور المخزنة

// ===== إضافة حدث للنقر على زر تسجيل الدخول =====
loginbtn.addEventListener("click", function (login) {
    login.preventDefault(); // منع السلوك الافتراضي للنموذج (إعادة التحميل)

    // ===== التحقق من الحقول الفارغة =====
    if (email.value === "" || password.value === "") {
        alert("Please fill in all the required fields."); // رسالة تنبيه إذا كانت الحقول فارغة
    } else {
        // ===== التحقق من صحة البريد الإلكتروني وكلمة المرور =====
        if (
            getemail && getemail.toLocaleLowerCase() === email.value || // التحقق من تطابق البريد الإلكتروني (غير حساس لحالة الأحرف)
            getpassword && getpassword.toLocaleLowerCase() === password.value // التحقق من تطابق كلمة المرور (غير حساس لحالة الأحرف)
        ) {
            // ===== في حال نجاح التحقق =====
            setTimeout(() => {
                window.location = "index.html"; // إعادة توجيه المستخدم إلى الصفحة الرئيسية
            }, 1500); // تأخير بسيط قبل التوجيه
        } else {
            // ===== في حال فشل التحقق =====
            alert("User Or Pass Is Wrong !"); // رسالة تنبيه إذا كانت البيانات خاطئة
        }
    }
});
