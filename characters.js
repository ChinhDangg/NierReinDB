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
    fetch("characters.json")
    .then(function(response) {
        return response.text(); })
    .then(function(data) {
        importData(data); })
    .catch(function(error) {
        console.log(`Error - ${error}`); })
}

let characters_info;
function importData(data) {
    characters_info = JSON.parse(data);
    let outerKeys = Object.keys(characters_info);
    for (var j = 0; j < outerKeys.length; j++) {
        duplicateChildNodes();
        var rarity_bg = 'Pics/'+characters_info[outerKeys[j]].Rarity+' star background.JPG';
        var frame = 'Pics/'+characters_info[outerKeys[j]].Rarity+' star frame.PNG';
        document.getElementsByClassName('charBg')[j].src = rarity_bg;
        document.getElementsByClassName('charFrame')[j].src = frame;
        var pic_name = 'Pics/Chars/'+outerKeys[j]+'.png';
        document.getElementsByClassName('char')[j].src = pic_name;
        document.getElementsByClassName('nameTitle')[j].innerText = outerKeys[j];
        var e = document.getElementsByClassName('outer')[j];
        var name = outerKeys[j];
        addClickedHandler(e, name);
    }
}

function addClickedHandler(ele, name) {
    ele.addEventListener('click', function(e) {
        sessionStorage.setItem('picked_char_name', name);
        location.href = 'charInfo.html';
    }, false);
}

let weaponChoice = document.getElementById('weaponChoice');
function searchCharacter() {
    var name_guess = document.getElementById('findBar').value.toLowerCase();
    var name_check = document.getElementsByClassName('nameTitle');
    var outerKeys = Object.keys(characters_info);
    for (var j = 0; j < name_check.length; j++) 
        if (name_check[j].innerText.toLowerCase().includes(name_guess) && 
           (characters_info[outerKeys[j]].Weapon == weaponChoice.value || 
            weaponChoice.value == 'All')) 
            document.getElementsByClassName('outer')[j].style.display = 'block';
        else 
            document.getElementsByClassName('outer')[j].style.display = 'none';
}
weaponChoice.onchange = searchWeaponChoice;
function searchWeaponChoice() {
    var wep_choice =  this.value;
    let outerKeys = Object.keys(characters_info);
    if (wep_choice != 'All')
        for (var j = 0; j < outerKeys.length; j++) 
            if (characters_info[outerKeys[j]].Weapon == wep_choice)
                document.getElementsByClassName('outer')[j].style.display = 'block';
            else
                document.getElementsByClassName('outer')[j].style.display = 'none';
    else 
        for (var j = 0; j < outerKeys.length; j++) 
            document.getElementsByClassName('outer')[j].style.display = 'block';
}
