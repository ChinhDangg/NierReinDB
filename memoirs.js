function getData() {
    fetch("memoirs.json")
    .then(function(response) {
        return response.text(); })
    .then(function(data) {
        importData(data); })
    .catch(function(error) {
        console.log(`Error - ${error}`); })
}

let memoir_info;
let outerKeys;
function importData(data) {
    memoir_info = JSON.parse(data);
    outerKeys = Object.keys(memoir_info);
    addMemoirFindOptions();
    addMemoirInfo();
}

function addMemoirFindOptions() {
    let findset = document.getElementById('memoirChoice');
    for (var j = 0; j < outerKeys.length; j++) 
    {
        var option = document.createElement("option");
        option.text = outerKeys[j];
        option.value = outerKeys[j];
        findset.add(option);
    }
}

var main = document.getElementById('memoirs_section');
var parent = document.getElementById('layout');
function duplicateChildNodes() {
    NodeList.prototype.forEach = Array.prototype.forEach;
    var children = parent.childNodes;
    children.forEach(function(item) {
        var cln = item.cloneNode(true);
        main.appendChild(cln);
    });
};

function duplicateChild(which, parentset) {
    var m = document.getElementsByClassName('allset')[which];
    NodeList.prototype.forEach = Array.prototype.forEach;
    var children = parentset.childNodes;
    children.forEach(function(item) {
        var cln = item.cloneNode(true);
        m.appendChild(cln);
    });
}

function addMemoirInfo() {
    for (var j = 0; j < outerKeys.length; j++) {
        duplicateChildNodes();
        document.getElementsByClassName('setName')[j].innerText = outerKeys[j];
        document.getElementsByClassName('smallbonus')[j].innerText = memoir_info[outerKeys[j]].Small;
        document.getElementsByClassName('bigbonus')[j].innerText = memoir_info[outerKeys[j]].Big;
        duplicateChild(j, document.getElementById('layout2'));
        var sets = memoir_info[outerKeys[j]].Set1;
        for (var k = 0; k < sets.length; k++) {
            var pos = (j+1)*3-1;
            var memoir = memoir_info[outerKeys[j]].Set1[k];
            var mempic = 'Pics/Memoirs/'+memoir+'.png';
            document.getElementsByClassName('memoirPic')[pos-k].src = mempic;
            document.getElementsByClassName('memoirName')[pos-k].innerText = memoir;
        }
        var set2 = memoir_info[outerKeys[j]].Set2;
        if (set2 != null) {
            duplicateChild(j, document.getElementById('layout3'));
            for (var k = 0; k < set2.length; k++) {
                var pos = (j+1)*3-1;
                var memoir = memoir_info[outerKeys[j]].Set2[k];
                var mempic = 'Pics/Memoirs/'+memoir+'.png';
                document.getElementsByClassName('memoirPic2')[pos-k].src = mempic;
                document.getElementsByClassName('memoirName2')[pos-k].innerText = memoir;
            }
        }
    }
}

let memoirChoice = document.getElementById('memoirChoice');
function searchMemoirs() {
    var name_guess = document.getElementById('findBar').value.toLowerCase();
    var name_check = document.getElementsByClassName('setName');
    for (var j = 0; j < name_check.length; j++) 
        if (name_check[j].innerText.toLowerCase().includes(name_guess) && 
           (outerKeys[j] == memoirChoice.value || memoirChoice.value == 'All')) 
            document.getElementsByClassName('setinfo')[j].style.display = 'block';
        else 
            document.getElementsByClassName('setinfo')[j].style.display = 'none';
}
memoirChoice.onchange = searchMemoirChoice;
function searchMemoirChoice() {
    var mem_choice =  this.value;
    if (mem_choice != 'All')
        for (var j = 0; j < outerKeys.length; j++) 
            if (outerKeys[j] == mem_choice)
                document.getElementsByClassName('setinfo')[j].style.display = 'block';
            else
                document.getElementsByClassName('setinfo')[j].style.display = 'none';
    else 
        for (var j = 0; j < outerKeys.length; j++) 
            document.getElementsByClassName('setinfo')[j].style.display = 'block';
}
