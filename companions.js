var main = document.getElementById('mainContent');
var parent = document.getElementById('layout');
function duplicateChildNodes() {
    NodeList.prototype.forEach = Array.prototype.forEach;
    var children = parent.childNodes;
    children.forEach(function(item) {
        var cln = item.cloneNode(true);
        main.appendChild(cln);
    });
};

function getData() {
    fetch("companions.json")
    .then(function(response) {
        return response.text(); })
    .then(function(data) {
        importData(data); })
    .catch(function(error) {
        console.log(`Error - ${error}`); })
}

let compan_info;
let outerKeys;
function importData(data) {
    compan_info = JSON.parse(data);
    outerKeys = Object.keys(compan_info);
    for (var j = 0; j < outerKeys.length; j++) {
        duplicateChildNodes();
        var type = compan_info[outerKeys[j]].Type;
        var pic_name = 'Pics/Companions/'+ type +' '+ outerKeys[j]+'.png';
        document.getElementsByClassName('companion')[j].src = pic_name;
        document.getElementsByClassName('nameTitle')[j].innerText = type +': '+ outerKeys[j];
        var e = document.getElementsByClassName('outer')[j];
        var name = outerKeys[j];
        addClickedHandler(e, name);
    }
}

function addClickedHandler(ele, name) {
    ele.addEventListener('click', function(e) {
        sessionStorage.setItem('picked_companion_name', name);
        location.href = 'companionInfo.html';
    }, false);
}

let companionChoice_Type = document.getElementById('weaponChoice_Type');
let companionChoice_Element = document.getElementById('weaponChoice_Element');
function searchWeapon() {
    var name_guess = document.getElementById('findBar').value.toLowerCase();
    var name_check = document.getElementsByClassName('nameTitle');
    for (var j = 0; j < name_check.length; j++) 
        if (name_check[j].innerText.toLowerCase().includes(name_guess) &&
           (compan_info[outerKeys[j]].Type == companionChoice_Type.value || companionChoice_Type.value == 'All') &&
           (compan_info[outerKeys[j]].Element == companionChoice_Element.value.toLowerCase() || companionChoice_Element.value == 'All'))
            document.getElementsByClassName('outer')[j].style.display = 'block';
        else 
            document.getElementsByClassName('outer')[j].style.display = 'none';
}

companionChoice_Type.onchange = searchWeaponType;
function searchWeaponType() {
    if (companionChoice_Type.value != 'All')
        for (var j = 0; j < outerKeys.length; j++) 
            if (compan_info[outerKeys[j]].Type == companionChoice_Type.value && 
               (compan_info[outerKeys[j]].Element == companionChoice_Element.value.toLowerCase() || 
                companionChoice_Element.value == 'All'))
                document.getElementsByClassName('outer')[j].style.display = 'block';
            else
                document.getElementsByClassName('outer')[j].style.display = 'none';
    else if (companionChoice_Element.value != 'All')
        searchWeaponElement();
    else 
        for (var j = 0; j < outerKeys.length; j++) 
            document.getElementsByClassName('outer')[j].style.display = 'block';
}

companionChoice_Element.onchange = searchWeaponElement;
function searchWeaponElement() {
    if (companionChoice_Element.value != 'All')
        for (var j = 0; j < outerKeys.length; j++) 
            if (compan_info[outerKeys[j]].Element == companionChoice_Element.value && 
               (compan_info[outerKeys[j]].Type == companionChoice_Type.value || 
                companionChoice_Type.value == 'All'))
                document.getElementsByClassName('outer')[j].style.display = 'block';
            else
                document.getElementsByClassName('outer')[j].style.display = 'none';
    else if (companionChoice_Type.value != 'All')
        searchWeaponType();
    else 
        for (var j = 0; j < outerKeys.length; j++) 
            document.getElementsByClassName('outer')[j].style.display = 'block';
}