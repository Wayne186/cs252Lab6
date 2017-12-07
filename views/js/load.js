var start = "Ash and Fantasy of Grimgar";
var game_start = false;

var done = true;
var stage;
var start_scene = [
	"(Hi. Do you know where is this place?)",
	"Someone near me asking."
]/*
	"(Wow, the moon is red.) ---- Another person near me speak excitedly",
	"The moon is red... It seems to be very strange.",
	"The moon of the place I used to be seems to be some other color.",
	"Where do I come from?",
	"I don't remember.",
	"The harder I try to think about it, the more I lost."
];*/

var stop = false;
var fight = false;

var team = [ 	["Shihoru", 75, 60, 18, 2, 5, "Magic Missile", "Shadow"],
				["Manato", 120, 60, 18, 10, 18, "Revenge", "Heal"],
				["Haruhiro", 90, 30, 15, 5, 32, "Handcut", "Swap"],
				["Yume", 80, 40, 10, 5, 30, "Arrow", "Slash"], 
				["Ranta", 100, 30, 12, 10, 18, "Slash", "Pierce"], 
				["Moguzo", 150, 25, 20, 15, 3, "Heavy Slash"] ];

var skills = [  ["Heal", "Heal 20 hp of the player with lowest hp percentage", 10], 
				["Shadow", "Use a dark magic to make the enemy's speed to 0", 15], 
				["Handcut", 10, 70, 5, 0, 0, "Lower the attack of enemy", 5],
				["Swap", 15, 50, 0, 0, 3, "An attack with high Critical", 5],
				["Revenge", 12, 80, 0, 0, 1, "An attack from Priest", 5], 
				["Magic Missile", 15, 50, 0, 0, 1, "A normal magic attack", 5],
				["Arrow", 10, 50, 2, 2, 1, "An attack that can lower both defence and attack of enemy", 5],
				["Slash", 15, 70, 0, 0, 1, "An attack with sword", 5],
				["Pierce", 12, 50, 0, 0, 2, "An sword attack that has higher critical", 5],
				["Heavy Slash", 30, 40, 0, 0, 1, "A high damage attack from Warrior", 5]
];//[名，傷害，Mp, 命中，減攻，減防，爆擊]


var goblin_stat = ["Goblin", 200, 50, 20, 13, 30, "Slash"];
var enemy = goblin_stat;

var team_temp = [team[0], team[1], team[2], team[3], team[4], team[5]];

var list;
var list_index = 0;
var inBattleStat;


var intro_scene = [
	"Kire: Hey kids... Ok, so this time we have 13 people.",
	"Kire: Well, my name is Kire, good to see you at Grimgar.",
	"Kire: You guys might have some questions but I will not be able to answer you.",
	"Kire: You need money to live in this world and if you don't have any special." + 
			"skills, The best way to make money is to become a Reservist Soldier and hunt for living.",
	"Kire: There are various of monster that you can hunt near this place.",
	"Kire: It's better for you to form a team of 6 that has various of class for fighting.",
	"Kire: 1 gold is 100 silver, 1 silver is 100 bronze.",
	"Kire: Here is 10 silver for each of you, which should be enough for you to get into a guild,"+
			" learn a skill and live for 2 weeks.",
	"Kire: That's all I need to say, good luck rookies.",
	"The crowd start to talk.",
	"A guy that looks mature and nice near me start talking too.",
	"Manato: Hi, my name is Manato, maybe, let's form a team.",
	"(OOh, ok, let's form a team, I'm Yume.) A energetic girl near me said",
	"(Well, me too, I'm Moguzo.) A strong and quiet guy said.",
	"I look around, everyone is trying to form a team. Don't wanna become the only one"+
			"that gets drop out...\nI'm Haruhiro.",
	"(Ahh, if you really really want to invite me, then maybe I will consider to join you.)"+
			" An annoying guy said. (I'm Ranta.)",
	"I really don't want this guy in my team if possible... And actually no one will invite you...",
	"(Can I join too?) A shy girl hiding in the corner try really hard and finally say this."+
			" (I'm Shihoru.).",
	"Manato: Ok, we have 6 people. We should be able to make a good team. It seems to be pretty late."+
			" Now, let's get a place for rest and decide what class we are going to become.",
	"Cool... Everyone says."
];

var go_hunt = [
	"After that day, we start our life in Grimgar.",
	"We form a team of 6 with Yume, Manato, Mogozu, Shihoru and Ranta.",
	"Because of the lack of money, all of us live in the dorm of Reservist Soldier.",
	"After some talks, Manato is going to become a Priest, Yume to Hunter, Moguzo to Warrior, "+
			"Shihoru to Mage, Ranta to Dread Knight. For me, I'm going to be a thief.",
	"And although Ranta keeps suggesting himself to be the leader of the team."+
			" All of us choose Manato to be the leader.",
	"We decided go to the guild of each class, learn some skills for 7 days.",
	"Then we will gather together again and go for hunt.",
	"(Hey Haruhiro), someone greeting me when I'm heading to the gather place.",
	"(Yo, Haruhiro.) Manato say with smile.",
	"Manato: Well, all of us are here, let's go.",
	"Manato: Before we get here, I did some research. I think we should go for goblin, which "+
			"should be one of the weakest creatures in this place. Most of them should carrying "+
			"Something that we can sell.",
	"(I think we should go for the boss, because I, the superman can beat it with my little"+
			" finger) Ranta says...",
	"No one know how to respond...",
	"Manato: Ranta, we don't know how those creatures fight in this world. We should get to " +
			"know about them first. If it's easy then we will go for stronger one.",
	"(Well, I will kill it super fast...)",
	"Manato: Ok, then I know that most of them are living in the old, abandoned town name 'Romuck' "+
			"in the North, let's go",
	"Although a little bit nervous, I feel exciting, just feel like live in a world of game",
	"Wait, what is a game... Why would I think of this word... I don't remember...",
	"However, on the way to Romuck, in the woods, we heard something.",
	"(There is a Goblin, he is alone)",
	"Manato: Let's attack it with surprise, It's best if we can kill it without a fight.",
	"(Ahhhhh), at the mean time, Ranta change with a shout...",
	"That brain-damage...",
	"Manato: Let's surround it, don't let it escape.",
	"Ranta charge to the Goblin, yelling and slashing the air.",
	"Manato: Moguzo, get to the front, protect Shihoru.",
	"Manato: Get into formation we should be able to kill it."
];

var firstFight = [
	"--In the fight, Everyone would have their own round, the one with higher speed attack first.",
	"--In your round, you can press 'S' for checking the character's status, "+
		"press '1' to '6' for using skills, press 'E' for escape.",
	"because of the formation, Mage will not be attack unless Priest and Warrior is dead.",
	"Once a character is dead, he will not be able to revive.",
	"A dead man is dead, you will not be able to see him again, so be careful.",
	"Now, let's get into the first round",
	"In battle",
	"The goblin hurts badly and try to use it's last breath to attack.",
	"Awwwww",
	"The goblin throw it's knife and charge to me",
	"It's unexpectedly strong and I can't get away from it",
	"Help...",
	"It was pull away.",
	"Manato come and heal me immediately",
	"Stab by Ranta and slash on the head by Moguzo's huge sword",
	"Finally the goblin is dead...",
	"Everyone's hand is trambling.",
	"It should be the first time we kill something",
	"It's just so hard to kill even one monster",
	"It fought fiercely, I somehow just feel that the goblin is even stronger than me.",
	"We pick up a coin and a teeth like stuff from the goblin",
	"Manato: We don't know what can be sell, so just pick up things as much as we can",
	"Manato: Everyone looks tired, I think it's enough for today.",
	"Manato: Just head back and sell these stuff and see how much we can earn.",
	"Everyone head back to the town quietly.",
	"The coin is a silver and the teeth, which is from a wolf that's hard to found sold "+
			"unexpectedly high, for 1 silver.",
	"This is the start of our Reservist Soldiors live in the world.",
	"I just hoping live can be easier after this."
];



var index_of_text = 0;
var press = false;
var press_key;
var hide = true;
var round = 0;


window.onload = function() {
	html = '<p class="title">'+start+'</p></br>'
				+'<p class="get_start">press space to start</p></br>';
	$('.start').append(html);
}

document.addEventListener('keydown', function(event) {
	var temp = event.keyCode
	if(!game_start) {
    	if(temp == 32) {
        	game_start = true;
        	stage = 1;
        	start_game();
        }
    } else {
    	var left_part = document.getElementById("left_sec");
    	var right_part = document.getElementById("right_sec");

    	if (stage == 1) {
    		if(temp == 32) {
    			if(done) {
       				document.getElementById("canvas").innerHTML = "";
    				printLetterByLetter("canvas", start_scene[index_of_text], 1);
	    			index_of_text++;
	    			if (index_of_text >= start_scene.length) {
	    				stage = 2;
	    				index_of_text = 0;
	    			}
	    		}
	    	}
	    }	
	    else if (stage == 2) {
	    	if(temp == 32) {
	    		if(done) {
	    			console.log(index_of_text);
	    			if (index_of_text == 0) {
	    				var elem = document.getElementById("left_sec");
						elem.style.display = "block";
						html = '<img class="left_img" src="/img/Kire.png"></img>';
						$('.left').append(html);
	    			} else if (index_of_text == 9) {
	    				left_part.innerHTML = "";
	    			} else if (index_of_text == 11) {
						html = '<img class="left_img" src="/img/Manato.png"></img>';
						$('.left').append(html);
	    			} else if (index_of_text == 12) {
	    				left_part.innerHTML = "";
						html = '<img class="left_img" src="/img/Yume.png"></img>';
						$('.left').append(html);
	    			} else if (index_of_text == 13) {
	    				left_part.innerHTML = "";
						html = '<img class="left_img" src="/img/Moguzo.png"></img>';
						$('.left').append(html);
	    			} else if (index_of_text == 14) {
	    				left_part.innerHTML = "";
	    			} else if (index_of_text == 15) {
	    				left_part.innerHTML = "";
						html = '<img class="left_img" src="/img/Ranta.png"></img>';
						$('.left').append(html);
	    			} else if (index_of_text == 16) {
	    				left_part.innerHTML = "";
	    			} else if (index_of_text == 17) {
	    				left_part.innerHTML = "";
						html = '<img class="left_img" src="/img/Shihoru.png"></img>';
						$('.left').append(html);
	    			} else if (index_of_text == 18) {
	    				left_part.innerHTML = "";
						html = '<img class="left_img" src="/img/Manato.png"></img>';
						$('.left').append(html);
	    			} else if (index_of_text == 19) {
	    				left_part.innerHTML = "";
	    			}
       				document.getElementById("canvas").innerHTML = "";
    				printLetterByLetter("canvas", intro_scene[index_of_text], 1);
	    			index_of_text++;
	    			if (index_of_text >= intro_scene.length) {
	    				stage = 3;
	    				index_of_text = 0;
	    			}
	    		}
	    	} 
	    }
	    else if (stage == 3) {
	    	if(temp == 32) {
	    		if (index_of_text == 0) {
	    			setBackground("city");
	    		}
	    		console.log(index_of_text);
	    		if(done) {
	    			if (index_of_text == 8) {
	    				setBackground("go");
	    			} else if (index_of_text == 19) {
	    				setBackground("goblin");
	    			} else if (index_of_text == 21) {
	    				setBackground("ranta_charge");
	    			} else if (index_of_text == 23) {
	    				setBackground("surround");
	    			}
	    			document.getElementById("canvas").innerHTML = "";
    				printLetterByLetter("canvas", go_hunt[index_of_text], 1);
	    			index_of_text++;
	    			if (index_of_text >= go_hunt.length) {
	    				stage = 4;
	    				index_of_text = 0;
	    			}	    	
	    		}
	    	}
	    } 
	    else if (stage == 4) {
	    	//list = [Haru_temp, Yume_temp, enemy, Mana_temp, Shihoru_temp, Moguzo_temp, Ranta_temp];
	    	if(temp == 32) {
	    		console.log(index_of_text);
	    		if (index_of_text == 0) {
	    			setBackground("fight_bg");
	    		}
	    		if(done) {
	    			if (index_of_text == 6) {
	    				if (!fight) {
		    				fight = true;
		    				console.log(team);
		    				displayBattleField(1, "goblin_type");
							showInfo(team_temp[round]);
		    			} else {
		    				if (round == 6) {
	    						cal_damage(team_temp[5], 0);
	    						enemy[5] = 30;
	    						round = 0;
	    					}
	    					else {
	    						document.getElementById("canvas").innerHTML = "";
    							printLetterByLetter("canvas", "What would you like to do?", 1);
		    					console.log(round);
		    					document.getElementById("battle_info").innerHTML = "";
			    				showInfo(team_temp[round]);
			    			}
		    			}
	    			} else {
	    				if (index_of_text == 8) {
	    					left_part.innerHTML = "";
	    					right_part.innerHTML = "";
	    					setBackground("danger");
	    				} else if (index_of_text == 12) {
	    					setBackground("kill");
	    				} else if (index_of_text == 25) {
	    					setBackground("city");
	    				}
	    				document.getElementById("canvas").innerHTML = "";
    					printLetterByLetter("canvas", firstFight[index_of_text], 1);
	    				index_of_text++;
	    				if (index_of_text >= firstFight.length) {
	    					stage = 5;
	    					index_of_text = 0;
	    				}
	    			}	    	
	    		}
	    	} else if (temp == 49 && fight) {
	    		if (hide) {
	    			console.log(team_temp);
	    			cal_damage(inBattleStat, (1+5));
	    			round++;
	    			document.getElementById("battle_info").innerHTML = "";
	    			if (enemy[1] <= 0){
	    				fight = false;
			    		index_of_text++;
			    	}
	    		}
	    	} else if (temp == 50 && fight) {
	    		if (hide) {
	    			console.log(team_temp);
	    			cal_damage(inBattleStat, (2+5));
	    			round++;
	    			document.getElementById("battle_info").innerHTML = "";
	    			if (enemy[1] <= 0){
	    				fight = false;
			    		index_of_text++;
			    	}
	    		}
	    	} else if (temp == 51 && fight) {
	    		if (hide) {
	    			console.log(3);
	    		}
	    	} else if (temp == 52 && fight) {
	    		if (hide) {
	    			console.log(4);
	    		}
	    	} else if (temp == 53 && fight) {
	    		if (hide) {
	    			console.log(5);
	    		}
	    	} else if (temp == 54 && fight) {
	    		if (hide) {
	    			console.log(6);
	    		}
	    	} else if (temp == 69) {
	    		alert("It's our first battle, please try harder to win it.");
	    	} else if (temp == 83) {
	    		if (hide) {
	    			hide = false;
	    			showCharacterStat(inBattleStat);
	    		} else {
	    			hide = true;
	    			document.getElementById("cha_info_sec").style.display = "none";
	    		}
	    	}
	    }
	    else {
	    	if (!stop) {
	    		document.getElementById("canvas").innerHTML = "";
    			printLetterByLetter("canvas", "You have clear the first stage, enter your name for saving", 1);
    			var form_sec = document.getElementById("form_sec");
    			form_sec.style.display = "block";
    			stop = true;
    		}
	    }
    }
});

function start_game() {
	console.log("in start");
	var elem = document.getElementById("start_sec");
	elem.style.display = "none";
	setBackground("sky");
	showCanvas();
}

function showCanvas() {
	var elem = document.getElementById("canvas");
	elem.style.display = "block";
	var spanWidth = $('#text span').width();
	printLetterByLetter("canvas", start_scene[index_of_text], 0);
	index_of_text++;
}

function setBackground(pic) {
	var elem = document.getElementById("bg_div");
	elem.innerHTML = "";
	html = '<img class="bg" src="/img/'+pic+'.png"></img>';
	$('.bg').append(html);
}

function displayBattleField(enemy, type) {
	console.log("in here");
	document.getElementById("canvas").innerHTML = "";
    printLetterByLetter("canvas", "What would you like to do?", 1);
	var cv = document.getElementById("canvas");
	var left_part = document.getElementById("left_sec");
    var right_part = document.getElementById("right_sec");
    left_part.style.display = "block";
    right_part.style.display = "block";
    cv.innerHTML = "";
    left_part.innerHTML = "";
    right_part.innerHTML = "";
    for (i = 0; i < enemy; i++) {
    	html = '<img class="left_img'+i+'" src="/img/'+type+'.png"></img>';
    	$('.left').append(html);
    }
    for (i = 0; i < 6; i++) {
    	html = '<img class="right'+i+'" src="/img/'+team[i][0]+'_f.png"></img>';
    	$('.right').append(html);
    }
    var enemy_str = type.substring(0, type.charAt('_'));
}

function showInfo(stat) {
	$('info').innerHTML = "";
	html = 	'<img class="avatar" src="/img/'+stat[0]+'_v.png"></img>'+
			'<p class="name">'+stat[0]+'</p>'+
			'<p class="hp">HP:'+stat[1]+'</p>'+
			'<p class="mp">MP:'+stat[2]+'</p>';
	for (i = 6; i < stat.length; i++) {
		html += '<p class="skills">'+(i-5)+': '+stat[i]+'</p>'; 
	}
	html += '<p class="target_hp">Target HP:'+enemy[1]+'</p>'+
			'<p class="escape">E: Escape</p>'+
			'<p class="stat">S: Stat</p>';

    $('.info').append(html);
    inBattleStat = stat;
}

function showCharacterStat(stat) {
	document.getElementById("cha_info_sec").innerHTML = "";
	document.getElementById("cha_info_sec").style.display = "block";
	html = '<img class="i_avatar" src="/img/'+stat[0]+'_f.png"></img>'+
			'<p class="i_name">'+stat[0]+'</p>'+
			'<p class="i_hp">HP:'+stat[1]+'</p>'+
			'<p class="i_mp">MP:'+stat[2]+'</p>'+
			'<p class="i_at">Attack:'+stat[3]+'</p>'+
			'<p class="i_df">Defence:'+stat[4]+'</p>'+
			'<p class="i_sp">Speed:'+stat[5]+'</p>';

	var des = "";
	var hit = "";
	for (i = 6; i < stat.length; i++) {
		des = "";
		hit = "";
		for (j = 0; j < skills.length; j++) {
			if (stat[i] === "Heal") {
				des = skills[0][1];
				break;
			} else if (stat[i] === "Shadow") {
				des = skills[1][1];
				break;
			}
			if (skills[j][0] === stat[i]) {
				hit = skills[j][2];
				des = skills[j][6];
			}
		}
		html += '<p class="i_skills">'+(i-5)+': '+stat[i]+' '+hit+' '+des+'</p>'; 
	}

	$('.cha_info').append(html);
}

function cal_damage(stat, num) {
	console.log(stat[num]);
	console.log(enemy);

	if (num == 0) {
		if (Math.random() > 0.1) {
			team_temp[5][1] = team_temp[5][1] - 20;
			document.getElementById("canvas").innerHTML = "";
			printLetterByLetter("canvas", "The goblin due 20 damage to Moguzo!", 1);
		}
		else {
			team_temp[5][1] = team_temp[5][1] - 40;
			document.getElementById("canvas").innerHTML = "";
			printLetterByLetter("canvas", "Critical! The goblin due 40 damage to Moguzo!", 1);
		}
		return;
	}

	if (stat[num] === "Heal") {
		team_temp[1][2] = team_temp[1][2] - 10;
		if (team_temp[5][1] + 20 <= 150) 
			team_temp[5][1] = team_temp[5][1] + 20;
		document.getElementById("canvas").innerHTML = "";
		printLetterByLetter("canvas", "You heal 20 HP for Moguzo!", 1);
		return;
	}
	if (stat[num] === "Shadow") {
		if (Math.random()*100 < 30) {
			enemy[5] = 10;
			document.getElementById("canvas").innerHTML = "";
			printLetterByLetter("canvas", "You hit the enemy!", 1);
		}
		else {
			document.getElementById("canvas").innerHTML = "";
			printLetterByLetter("canvas", "The attack missed!", 1);
		}
		team_temp[0][2] = team_temp[5][1] - 15;
		return;
	}

	var skill;
	for (i = 0; i < skills.length; i++) {
		if (stat[num] === skills[i][0]) {
			skill = skills[i];
			break;
		}
	}
	console.log(skill);
	var rate = stat[5] - enemy[5] + skill[2];

	for (i = 0; i < team_temp.length; i++) {
		if (stat[0] === team_temp[i][0]) {
			team_temp[i][2] = team_temp[i][2] - skill[7];
		}
	}


	if (Math.random()*100 < rate) {
		var damage = stat[3] - enemy[4] + skill[1];
		document.getElementById("canvas").innerHTML = "";
		if (Math.random()*10 < skill[5]) {
			damage = damage * 2;
			printLetterByLetter("canvas", "You hit the enemy! Critical!", 1);
		} else {
			printLetterByLetter("canvas", "You hit the enemy!", 1);
		}
		enemy[1] = enemy[1] - damage;
		enemy[3] = enemy[3] - skill[3];
		enemy[4] = enemy[4] - skill[4];
	} else {
		document.getElementById("canvas").innerHTML = "";
		printLetterByLetter("canvas" ,"The attack Missed!", 1);
	}
	console.log(enemy);
	console.log(team_temp);
}


function printLetterByLetter(destination, message, speed){
    var i = 0;
    done = false;
    var interval = setInterval(function(){
        document.getElementById(destination).innerHTML += message.charAt(i);
        i++;
        if (i > message.length){
            clearInterval(interval);
            done = true;
        }
    }, speed);
}

function submitForm() {
    var form = document.getElementById("form").elements;
    var userInfo = { 'username': form.username.value};
    console.log(userInfo);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(userInfo),
        contentType: 'application/json',
        url: 'http://localhost:5000/submitForm',                      
        success: function(data) {
        	console.log('success');
    		console.log(JSON.stringify(data));
        }
    })
}
