function displaySliderValue(value, which) {
    document.getElementById(which).innerText = value;
    var val = (which.includes('2')) ? 'Second' : 'First';
    var a1 = parseFloat(info[outerKeys[pos]].Passive[val].A1);
    var num = (parseFloat(info[outerKeys[pos]].Passive[val].A4) - a1)/3;
    var eff2 = info[outerKeys[pos]].Passive[val].Effect2;
    document.getElementsByClassName('effect')[(which.includes('2')) ? 2 : 1].innerText = info[outerKeys[pos]].Passive[val].Effect1 + ' ' +
                                                                                        ((value == 0) ? a1 : (a1 + num*(value-1)).toFixed(1)) + '% ' + 
                                                                                        ((eff2 != null) ? eff2 : '');
} 

function getData() {
    fetch("characters.json")
    .then(function(response) {
        return response.text(); })
    .then(function(data) {
        importData(data); })
    .catch(function(error) {
        console.log(`Error - ${error}`); })
}

let info;
let outerKeys;
let pos = -1;
function importData(data) {
    info = JSON.parse(data);
    outerKeys = Object.keys(info);
    let assume_test = sessionStorage.getItem('picked_char_name');
    pos = -1;
    for (var j = 0; j < outerKeys.length; j++) 
        if (outerKeys[j] == assume_test) {
            pos = j;
            break;
        }
    var characterImg = 'Pics/Chars/'+outerKeys[pos]+'.png';
    document.getElementById('charPic').src = characterImg;
    
    var rarityImage = 'Pics/'+info[outerKeys[pos]].Rarity+' star.png';
    document.getElementById('charRarity').src = rarityImage;

    document.getElementById('charname').innerText = outerKeys[pos];

    var weaponName = info[outerKeys[pos]].Weapon;
    var weaponImg = 'Pics/WeaponType/'+weaponName.toLowerCase()+'.png';
    document.getElementById('wepChoiceImg').src = weaponImg;
    document.getElementById('wepChoice').innerText = weaponName;

    var skillName = info[outerKeys[pos]].Skill.Name;
    document.getElementById('skillName').innerText = skillName;
    document.getElementById('skillPic').src = 'Pics/CharSkillPics/'+skillName+'.png';

    var skilleffect = info[outerKeys[pos]].Skill.Effect1 + ' ' + info[outerKeys[pos]].Skill.Min.Num1+ '% ' + 
                          info[outerKeys[pos]].Skill.Effect2;
        var num2 = info[outerKeys[pos]].Skill.Min.Num2;
        skilleffect += (num2 != null) ? (' '+ num2 +'% '+ info[outerKeys[pos]].Skill.Effect3) : '';
        document.getElementsByClassName('effect')[0].innerText = skilleffect;
    document.getElementsByClassName('gauge')[0].innerText = info[outerKeys[pos]].Skill.Min.Gauge;

    var abilityName1 = info[outerKeys[pos]].Passive.First.Name;
    document.getElementsByClassName('abilityName')[0].innerText = abilityName1;
    var abilityPic1 = 'Pics/AbilityPics/'+abilityName1+'.png';
    document.getElementsByClassName('abilityPic')[0].src = abilityPic1;
    displaySliderValue(2, 'abilityRangeLabel');

    var abilityName2 = info[outerKeys[pos]].Passive.Second.Name;
    document.getElementsByClassName('abilityName')[1].innerText = abilityName2;
    var abilityPic2 = 'Pics/AbilityPics/'+abilityName2+'.png';
    document.getElementsByClassName('abilityPic')[1].src = abilityPic2;
    displaySliderValue(3, 'abilityRangeLabel2');

    document.getElementsByClassName('statnumber')[0].innerText = info[outerKeys[pos]].Min.HP;
    document.getElementsByClassName('statnumber')[1].innerText = info[outerKeys[pos]].Min.ATK;
    document.getElementsByClassName('statnumber')[2].innerText = info[outerKeys[pos]].Min.DEF;
    document.getElementsByClassName('statnumber')[3].innerText = '1000';
    document.getElementsByClassName('statnumber')[4].innerText = '10%';
    document.getElementsByClassName('statnumber')[5].innerText = '150%';
    document.getElementsByClassName('statnumber')[6].innerText = '10%';
}

function addNewInfoBlock(block, others) {
    block.style.backgroundColor = 'rgb(102, 102, 102)';
    var other_blocks = document.getElementsByClassName(others);
    for (var j = 0; j < other_blocks.length; j++) 
        if (other_blocks[j] != block) 
            other_blocks[j].style.backgroundColor = 'rgb(50, 50, 50)';
    var which = block.innerText;
    if (block.getAttribute('name') == 'main') {
        var skilleffect = info[outerKeys[pos]].Skill.Effect1 + ' ' + info[outerKeys[pos]].Skill[which].Num1+ '% ' + 
                          info[outerKeys[pos]].Skill.Effect2;
        var num2 = info[outerKeys[pos]].Skill[which].Num2;
        skilleffect += (num2 != null) ? (' '+ num2 +'% '+ info[outerKeys[pos]].Skill.Effect3) : '';
        document.getElementsByClassName('effect')[0].innerText = skilleffect;
        document.getElementsByClassName('gauge')[0].innerText = info[outerKeys[pos]].Skill[(which == 'Full Ascend') ? 'Full Ascend' : 'Min'].Gauge;
    }
    else {
        document.getElementsByClassName('statnumber')[0].innerText = info[outerKeys[pos]][which].HP;
        document.getElementsByClassName('statnumber')[1].innerText = info[outerKeys[pos]][which].ATK;
        document.getElementsByClassName('statnumber')[2].innerText = info[outerKeys[pos]][which].DEF;
    }
}
