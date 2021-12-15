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
    fetch("weapons.json")
    .then(function(response) {
        return response.text(); })
    .then(function(data) {
        importData(data); })
    .catch(function(error) {
        console.log(`Error - ${error}`); })
}

let weapon_info;
let outerKeys;
function importData(data) {
    weapon_info = JSON.parse(data);
    outerKeys = Object.keys(weapon_info);
    for (var j = 0; j < outerKeys.length; j++) {
        duplicateChildNodes();
        var rarity_bg = 'Pics/'+weapon_info[outerKeys[j]].Rarity+' star background.JPG';
        var frame = 'Pics/'+weapon_info[outerKeys[j]].Rarity+' star frame.PNG';
        document.getElementsByClassName('charBg')[j].src = rarity_bg;
        document.getElementsByClassName('charFrame')[j].src = frame;
        var pic_name = 'Pics/Weapons/'+outerKeys[j]+'.png';
        document.getElementsByClassName('weapon')[j].src = pic_name;
        document.getElementsByClassName('nameTitle')[j].innerText = outerKeys[j];
        var e = document.getElementsByClassName('outer')[j];
        var name = outerKeys[j];
        addClickedHandler(e, name);
    }
}

function addClickedHandler(ele, name) {
    ele.addEventListener('click', function(e) {
        sessionStorage.setItem('picked_weapon_name', name);
        location.href = 'weaponInfo.html';
    }, false);
}

let weaponChoice_Type = document.getElementById('weaponChoice_Type');
let weaponChoice_Element = document.getElementById('weaponChoice_Element');
function searchWeapon() {
    var name_guess = document.getElementById('findBar').value.toLowerCase();
    var name_check = document.getElementsByClassName('nameTitle');
    for (var j = 0; j < name_check.length; j++) 
        if (name_check[j].innerText.toLowerCase().includes(name_guess) &&
           (weapon_info[outerKeys[j]].Type == weaponChoice_Type.value || weaponChoice_Type.value == 'All') &&
           (weapon_info[outerKeys[j]].Element == weaponChoice_Element.value || weaponChoice_Element.value == 'All'))
            document.getElementsByClassName('outer')[j].style.display = 'block';
        else 
            document.getElementsByClassName('outer')[j].style.display = 'none';
}

weaponChoice_Type.onchange = searchWeaponType;
function searchWeaponType() {
    if (weaponChoice_Type.value != 'All')
        for (var j = 0; j < outerKeys.length; j++) 
            if (weapon_info[outerKeys[j]].Type == weaponChoice_Type.value && 
               (weapon_info[outerKeys[j]].Element == weaponChoice_Element.value || 
                weaponChoice_Element.value == 'All'))
                document.getElementsByClassName('outer')[j].style.display = 'block';
            else
                document.getElementsByClassName('outer')[j].style.display = 'none';
    else if (weaponChoice_Element.value != 'All')
        searchWeaponElement();
    else 
        for (var j = 0; j < outerKeys.length; j++) 
            document.getElementsByClassName('outer')[j].style.display = 'block';
}

weaponChoice_Element.onchange = searchWeaponElement;
function searchWeaponElement() {
    if (weaponChoice_Element.value != 'All')
        for (var j = 0; j < outerKeys.length; j++) 
            if (weapon_info[outerKeys[j]].Element == weaponChoice_Element.value && 
               (weapon_info[outerKeys[j]].Type == weaponChoice_Type.value || 
                weaponChoice_Type.value == 'All'))
                document.getElementsByClassName('outer')[j].style.display = 'block';
            else
                document.getElementsByClassName('outer')[j].style.display = 'none';
    else if (weaponChoice_Type.value != 'All')
        searchWeaponType();
    else 
        for (var j = 0; j < outerKeys.length; j++) 
            document.getElementsByClassName('outer')[j].style.display = 'block';
}
 
