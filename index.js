//تخزين عناصر في متغيرات عن طريق استدعاء id 
let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let cleanButton = document.getElementById('clean-button');
let searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', search);//ربط المتغير ب مستمع الحدث اي اذا ضغط عليه يشغل الدالة 
cleanButton.addEventListener('click', clean);//فعل شيء , الحدث للعنصر


function search() {//دالة البحث
    //ياخذ النص المدخلة ويخزنها في المتغير
    //الدالة الاولى لحذف المسافات الزائدة
    //الدالة الثانية لضمان حالة الحروف
    let searchTerm = searchInput.value.trim().toLowerCase();
    let content = document.body.textContent.toLowerCase();    //يستخرج نص كامل الصفحة 
    let results = [];    //النواتج على شكل قائمة
  let words = content.split(/\s+/);  // قسم الكود النص (المخزن في content) إلى كلمات منفصلة باستخدام split(/\s+/). وهذا يعطينا مصفوفة words تحتوي على كل كلمة على حدة.

  // Loop through each word and check if it matches the search term
  //لوب لتحقق من كل كلمة ومقارنة بالكلمة المدخلة في searchTerm 
  words.forEach((word) => {  //forEach لتكرار كل كلمة في المصفوفة
    if (word.includes(searchTerm)) {
      results.push(word);    //اذا كانت الكلمة تحتوي على المصطلح البحث تتم اضافته الى صف جديد في المصفوفة
    }
  });
  searchResults.innerHTML = '';  // مسح نتائج البحث السابقة
  // عرض نتائج البحث
  if (results.length > 0) {
  results.forEach((result) => {     //ستخدم حلقة forEach أخرى لتكرار كل نتيجة بحث مخزنة في results.
    let listItem = document.createElement('li');    //داخل الحلقة، يتم إنشاء عنصر قائمة جديد (li) باستخدام document.createElement('li').
    listItem.textContent = result;    //تم ضبط محتوى عنصر القائمة على الكلمة التي تم العثور عليها
    searchResults.appendChild(listItem);    //يتم إضافة عنصر القائمة إلى قائمة نتائج البحث (searchResults.appendChild(listItem)) لعرضها على الصفحة.
  });
} else {
  //اذا مافي كلمة متطابقة
  let noResults = document.createElement('li');
  noResults.textContent = 'No Results';
  searchResults.appendChild(noResults);
}
}
function clean() {
  searchInput.value = ''; // تقوم هذه الدالة بمسح محتوى حقل إدخال البحث
  searchResults.innerHTML = ''; //إزالة أي نتائج سابقة
}





