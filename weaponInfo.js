function getData() {
    fetch("weapons.json")
    .then(function(response) {
        return response.text(); })
    .then(function(data) {
        importData(data); })
    .catch(function(error) {
        console.log(`Error - ${error}`); })
}

let info;
let pos = -1;
let outerKeys;
function importData(data) {
    info = JSON.parse(data);
    outerKeys = Object.keys(info);
    let assume_test = sessionStorage.getItem('picked_weapon_name');
    let where = -1;
    for (var j = 0; j < outerKeys.length; j++) 
        if (outerKeys[j] == assume_test) {
            where = j;
            break;
        }
    pos  = where;
    var characterImg = 'Pics/Weapons/'+outerKeys[where]+'.png';
    document.getElementById('charPic').src = characterImg;
    
    var rarityImage = 'Pics/'+info[outerKeys[where]].Rarity+' star.png';
    document.getElementById('charRarity').src = rarityImage;

    document.getElementById('charname').innerText = outerKeys[where];

    var weaponType = info[outerKeys[where]].Type;
    var weaponImg = 'Pics/WeaponType/'+weaponType.toLowerCase()+'.png';
    document.getElementById('wepChoiceImg').src = weaponImg;
    document.getElementById('wepChoice').innerText = weaponType;

    var skillName1 = info[outerKeys[where]].Skill.First.Name;
    document.getElementsByClassName('skillName')[0].innerText = skillName1;
    document.getElementsByClassName('skillPic')[0].src = 'Pics/WeaponSkills/'+skillName1+'.png';
    var skillName2 = info[outerKeys[where]].Skill.Second.Name;
    document.getElementsByClassName('skillName')[1].innerText = skillName2;
    document.getElementsByClassName('skillPic')[1].src = 'Pics/WeaponSkills/'+skillName2+'.png';

    skil1Effect = info[outerKeys[where]].Skill.First.Effect1 +' '+ info[outerKeys[where]].Skill.First.Min.Num1 +'% '+ info[outerKeys[where]].Skill.First.Effect2;
    skil1Ef3 =  info[outerKeys[where]].Skill.First.Effect3;
    skil1Effect += (skil1Ef3 != null) ? (' '+ info[outerKeys[where]].Skill.First.Min.Num2 +'% '+ skil1Ef3) : '';
    document.getElementsByClassName('effect')[0].innerText = skil1Effect;
    document.getElementsByClassName('gauge')[0].innerText = info[outerKeys[where]].Skill.First.Cooldown;

    skil2Effect = info[outerKeys[where]].Skill.Second.Effect1 +' '+ info[outerKeys[where]].Skill.Second.Min.Num1 +'% '+ info[outerKeys[where]].Skill.Second.Effect2;
    skil2Ef3 =  info[outerKeys[where]].Skill.Second.Effect3;
    skil2Effect += (skil2Ef3 != null) ? (' '+ info[outerKeys[where]].Skill.Second.Min.Num2 +'% '+ skil2Ef3) : '';
    document.getElementsByClassName('effect')[1].innerText = skil2Effect;
    document.getElementsByClassName('gauge')[1].innerText = info[outerKeys[where]].Skill.Second.Cooldown;

    var abilityName1 = info[outerKeys[where]].Passive.First.Name;
    document.getElementsByClassName('skillName')[2].innerText = abilityName1;
    var abilityPic1 = 'Pics/AbilityPics/'+abilityName1+'.png';
    document.getElementsByClassName('skillPic')[2].src = abilityPic1;
    abi1Effect = info[outerKeys[where]].Passive.First.Effect1 +' '+ info[outerKeys[where]].Passive.First.Min +'% ';
    abi1Ef2 = info[outerKeys[where]].Passive.First.Effect2;
    abi1Effect += (abi1Ef2 != null) ? abi1Ef2 : '';
    document.getElementsByClassName('effect')[2].innerText = abi1Effect;

    var abilityName2 = info[outerKeys[where]].Passive.Second.Name;
    document.getElementsByClassName('skillName')[3].innerText = abilityName2;
    var abilityPic2 = 'Pics/AbilityPics/'+abilityName2+'.png';
    document.getElementsByClassName('skillPic')[3].src = abilityPic2;
    abi2Effect = info[outerKeys[where]].Passive.Second.Effect1 +' '+ info[outerKeys[where]].Passive.Second.Min +'% ';
    abi2Ef2 = info[outerKeys[where]].Passive.Second.Effect2;
    abi2Effect += (abi2Ef2 != null) ? abi2Ef2 : '';
    document.getElementsByClassName('effect')[3].innerText = abi2Effect;

    document.getElementsByClassName('statnumber')[0].innerText = info[outerKeys[where]].Min.HP;
    document.getElementsByClassName('statnumber')[1].innerText = info[outerKeys[where]].Min.ATK;
    document.getElementsByClassName('statnumber')[2].innerText = info[outerKeys[where]].Min.DEF;
}

var arr = ['First', 'Second', 'First', 'Second'];
function addNewInfoBlock(block, others) {
    block.style.backgroundColor = 'rgb(102, 102, 102)';
    var other_blocks = document.getElementsByClassName(others);
    for (var j = 0; j < other_blocks.length; j++) 
        if (other_blocks[j] != block) 
            other_blocks[j].style.backgroundColor = 'rgb(50, 50, 50)';
    var which = block.innerText;
    if (block.getAttribute('name') == 'main') {
        var w = parseInt(others.slice(-1), 10)-1;
        console.log(w);
        if (w < 2) {
            skilEffect = info[outerKeys[pos]].Skill[arr[w]].Effect1 +' '+ info[outerKeys[pos]].Skill[arr[w]][which].Num1 +'% '+ info[outerKeys[pos]].Skill[arr[w]].Effect2;
            skilEf3 =  info[outerKeys[pos]].Skill[arr[w]].Effect3;
            skilEffect += (skilEf3 != null) ? (' '+ info[outerKeys[pos]].Skill[arr[w]][which].Num2 +'% '+ skilEf3) : '';
            document.getElementsByClassName('effect')[w].innerText = skilEffect;

            skilCoolDown = parseInt(info[outerKeys[pos]].Skill[arr[w]].Cooldown);
            if (which != 'Min') 
                skilCoolDown = skilCoolDown - ((which == 'Max') ? 2 : 1);
            document.getElementsByClassName('gauge')[w].innerText = skilCoolDown;   
        }
        else {
            abiEffect = info[outerKeys[pos]].Passive[arr[w]].Effect1 +' '+ info[outerKeys[pos]].Passive[arr[w]][which] +'% ';
            abiEf2 = info[outerKeys[pos]].Passive[arr[w]].Effect2;
            abiEffect += (abiEf2 != null) ? abiEf2 : '';
            document.getElementsByClassName('effect')[w].innerText = abiEffect;
        }
    }
    else {
        document.getElementsByClassName('statnumber')[0].innerText = info[outerKeys[pos]][which].HP;
        document.getElementsByClassName('statnumber')[1].innerText = info[outerKeys[pos]][which].ATK;
        document.getElementsByClassName('statnumber')[2].innerText = info[outerKeys[pos]][which].DEF;
    }
}
