//تخزين عناصر في متغيرات عن طريق استدعاء id 
let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let cleanButton = document.getElementById('clean-button');
let searchResults = document.getElementById('search-results');
//ربط المتغير ب مستمع الحدث اي اذا ضغط عليه يشغل الدالة 
//فعل شيء , الحدث للعنصر
searchButton.addEventListener('click', search);
cleanButton.addEventListener('click', clean);
//دالة البحث
function search() {
    //ياخذ النص المدخلة ويخزنها في المتغير
    //الدالة الاولى لحذف المسافات الزائدة
    //الدالة الثانية لضمان حالة الحروف
    let searchTerm = searchInput.value.trim().toLowerCase();
    //يستخرج الكود نص كامل الصفحة 
    let content = document.body.textContent.toLowerCase();
    //النواتج على شكل قائمة
    let results = [];
  // قسم الكود النص (المخزن في content) إلى كلمات منفصلة باستخدام split(/\s+/). وهذا يعطينا مصفوفة words تحتوي على كل كلمة على حدة.
  let words = content.split(/\s+/);
  // Loop through each word and check if it matches the search term
  //لوب لتحقق من كل كلمة ومقارنة بالكلمة المدخلة في searchTerm 
  //forEach لتكرار كل كلمة في المصفوفة
  words.forEach((word) => {
    if (word.includes(searchTerm)) {
        //اذا كانت الكلمة تحتوي على المصطلح البحث تتم اضافته الى صف جديد في المصفوفة
      results.push(word);
    }
  });
  // مسح نتائج البحث السابقة
  searchResults.innerHTML = '';
  // عرض نتائج البحث
  //ستخدم حلقة forEach أخرى لتكرار كل نتيجة بحث مخزنة في results.
  results.forEach((result) => {
    //داخل الحلقة، يتم إنشاء عنصر قائمة جديد (li) باستخدام document.createElement('li').
    let listItem = document.createElement('li');
    //تم ضبط محتوى عنصر القائمة على الكلمة التي تم العثور عليها
    listItem.textContent = result;
    //يتم إضافة عنصر القائمة إلى قائمة نتائج البحث (searchResults.appendChild(listItem)) لعرضها على الصفحة.
    searchResults.appendChild(listItem);
  });
}
function clean() {
  searchInput.value = ''; // تقوم هذه الدالة بمسح محتوى حقل إدخال البحث
  searchResults.innerHTML = ''; //إزالة أي نتائج سابقة
}





