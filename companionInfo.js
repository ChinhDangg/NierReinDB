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
let pos = -1;
let effect_skill = ['1 time', 'blind', 'burn', 'combo', 'heal', 'ignore defense', 'increase Agility', 
'increase Attack', 'increase Critical Rate', 'increase Defense', 'poison', 'recover', 'reduce Attack', 'reduce Defense'];
let fire_bear = [100, 105, 110, 114, 120, 125, 132, 139, 146, 153, 160, 168, 176, 184, 200]; // fire bear does ignore damage
let damage_deal1 = [125, 131, 137, 143, 150, 156, 165, 173, 182, 191, 200, 210, 220, 230, 250]; //bear, doll, spirit, pod
let damage_deal2 = [145, 152, 159, 166, 174, 181, 191, 201, 211, 221, 232, 243, 255, 266, 290]; //dragon
let damage_deal3 = [170, 178, 187, 195, 204, 212, 224, 236, 248, 260, 272, 285, 299, 312, 340]; //book
let ability_1 = [8, 8.4, 8.8, 9.2, 9.6, 10, 10.5, 11.1, 11.6, 12.2, 12.8, 13.4, 14, 14.7, 16]; //bear, doll
let ability_2 = [7, 7.3, 7.7, 8, 8.4, 8.7, 9.2, 9.7, 10.2, 10.7, 11.2, 11.7, 12.3, 12.8, 14]; //spirit, dragon
let ability_3 = [10, 10.5, 11, 11.5, 12, 12.5, 13.2, 13.9, 14.6, 15.3, 16, 16.8, 17.6, 18.4, 20]; //book
let ability_4 = [9, 9.4, 9.9, 10.3, 10.8, 11.2, 11.8, 12.5, 13.1, 13.7, 14.4, 15.1, 15.8, 16.5, 18]; //pod
function importData(data) {
    compan_info = JSON.parse(data);
    outerKeys = Object.keys(compan_info);
    let assume_test = sessionStorage.getItem('picked_companion_name');
    let where = -1;
    for (var j = 0; j < outerKeys.length; j++) 
        if (outerKeys[j] == assume_test) {
            where = j;
            break;
        }
    pos = where;

    var type = compan_info[outerKeys[where]].Type;
    var element = compan_info[outerKeys[where]].Element;
    var name = outerKeys[where];
    document.getElementById('companion_Name').innerText = type+': '+name;
    document.getElementById('companion_Pic').src = 'Pics/Companions/'+type+' '+name+'.png';
    document.getElementById('companion_Element').src = 'Pics/ElementPics/'+element+'.png'; 
    
    var skillName = compan_info[outerKeys[where]].Skill.Name;
    document.getElementsByClassName('abilityName')[0].innerText = skillName;
    for (var j = 0; j < effect_skill.length; j++) 
        if (compan_info[outerKeys[where]].Skill.Effect.includes(effect_skill[j])) {
            document.getElementsByClassName('abilityPic')[0].src = 'Pics/EffectSkills/'+effect_skill[j]+'.png';
            break;
        }

    displaySkillInfo(where, 8, type);

    var abilityName = compan_info[outerKeys[where]].Ability.Name;
    document.getElementsByClassName('abilityName')[1].innerText = abilityName;
    document.getElementsByClassName('abilityPic')[1].src = 'Pics/ComAbilities/'+ abilityName+'.png';

    displayAbilityInfo(element, type, 8, abilityName);

    document.getElementsByClassName('statnumber')[0].innerText = compan_info[outerKeys[where]].Stats.Min.HP;
    document.getElementsByClassName('statnumber')[1].innerText = compan_info[outerKeys[where]].Stats.Min.ATK;
    document.getElementsByClassName('statnumber')[2].innerText = compan_info[outerKeys[where]].Stats.Min.DEF;
}

function displaySliderValue(value, where) {
    document.getElementById(where).innerText = 'Lv: '+value;
    var type = compan_info[outerKeys[pos]].Type;
    if (where.includes('2')) {
        var abilityName = compan_info[outerKeys[pos]].Ability.Name;
        var element = compan_info[outerKeys[pos]].Element;
        displayAbilityInfo(element, type, (value-1), abilityName);
    }
    else {
        displaySkillInfo(pos, (value-1), type);
    } 
}

function displaySkillInfo(where, lv, type) {
    var dam;
    if (type == 'Dragon') dam = damage_deal2[lv];
    else if (type == 'Tome') dam = damage_deal3[lv];
    else { 
        if (outerKeys[where] == 'Precious') dam = fire_bear[lv];
        else dam = damage_deal1[lv];
    }
    var effect = 'Deal '+dam+'% damage to one enemy '+compan_info[outerKeys[where]].Skill.Effect;
    var min = compan_info[outerKeys[where]].Skill.Min;
    if (min != null) {
        var effectnum;
        if (min == '3') effectnum = ((10-parseInt(min))/14 * lv + parseInt(min)).toFixed(1);
        else if (min == '8') effectnum = ((15-parseInt(min))/14 * lv + parseInt(min)).toFixed(1);
        else effectnum = (parseInt(min) + lv);
        effect += ' '+ effectnum +'% '+ compan_info[outerKeys[where]].Skill.Detail;
    }
    document.getElementsByClassName('effect')[0].innerText = effect;
}

function displayAbilityInfo(element, type, lv, abilityName) {
    var abi_effect = 'All allies '+element+ ' damage ';
    if (abilityName.includes('Support'))
        abi_effect += 'dealt up by ';
    else 
        abi_effect += 'taken down by ';
    if (type == 'Machine')
        abi_effect += ability_4[lv] + '%.';
    else if (type == 'Tome')
        abi_effect += ability_3[lv] + '%.';
    else if (type == 'Dragon' || type == 'Spirit')
        abi_effect += ability_2[lv] + '%.';
    else
        abi_effect += ability_1[lv] + '%.';
    document.getElementsByClassName('effect')[1].innerText = abi_effect;
}

function addNewInfoBlock(block, others) {
    block.style.backgroundColor = 'rgb(102, 102, 102)';
    var other_blocks = document.getElementsByClassName(others);
    for (var j = 0; j < other_blocks.length; j++) 
        if (other_blocks[j] != block) 
            other_blocks[j].style.backgroundColor = 'rgb(50, 50, 50)';
    var which = block.innerText;
    document.getElementsByClassName('statnumber')[0].innerText = compan_info[outerKeys[pos]].Stats[which].HP;
    document.getElementsByClassName('statnumber')[1].innerText = compan_info[outerKeys[pos]].Stats[which].ATK;
    document.getElementsByClassName('statnumber')[2].innerText = compan_info[outerKeys[pos]].Stats[which].DEF;
}