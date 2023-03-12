const NEWS = [
	"Wait a minute! When the mouse needs to be clicked quickly, please check whether there is a water cup around. If you touch it... hiss -",

	"After playing for a long time, please remember to close your eyes and take a rest.",
	
	"GuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGuGu",
	
	"Our slogan is 'Science, Obduracy, and Daring!!' ",
	
	"Please pay more attention to the new version! If you encounter a bug, you can find the author's private chat and feedback!",
	
	"Producer Fallen_Cat is staying up late every day to develop a new version. He is almost bald. Can I have some hair tonic or something...",
	
	"I don't think hair growth agents are necessarily useful, so we should have hair implants",
	
	'Do you know? The production of this game is planned to start on May 3, 2022, which is also the birthday of the game! ',
	
	'As we all know, FC has 377 days a year',
	
	'How to play the Tab button gracefully? ↑← ↙ → ↗ ↓ ↖↗ ↓↑→ ↙ ←……',
	
	'Guess how many hours you have to wait to see this tip again',
	
	'When you feel that everything is not going well for three times, look at the current idea points. Is it a lot higher than at the beginning? Now also, you have been growing ',
	
	"Don't care what others say to you, you are unique, you are your own light",
	
	"Jiangyuan Express: code OA-3584, the underground city of the planet opens a new node, and opens the public test of living environment experience after the ice is completely restored",
	
	"Jiangyuan Express: the person in charge of SOD Group is missing for three days, and the OA-7168 police are still investigating",
	
	'Jiangyuan Express News: The population growth rate of OA-19866 in the first half of the year hit a new low, and the new fertilization technology was frustrated',
	
	"Sorry, the number you dialed does not exist",
	
	"72788433374733678633778263464",
	
	"Jiangyuan Express: He Qiongyu, a famous singer, died unexpectedly in the early morning of last night on the other planet. The murderer is still under investigation. The witness location is at the entrance of Line 69 of the OA-144 K City subway",
	
	"Jiangyuan Express: The code OA-3584 planet has arrived near Jupiter and is extremely affected by Jupiter's gravity. Half of the thrusters have been damaged and all the deflection force has been lost. Civilization has reached a life-and-death moment!",
	
	"Jiangyuan Express: A 72nd team in the world, code-named OA-3584, unexpectedly lost to the 100th team in the world on the first day of the New Year. The fans shouted disappointment, and Fan xx's prediction came true!",
	
	"Gather together as a group of pigeons and scatter as pigeons all over the sky",
	
	"Using the mouse to click the button for a long time may lead to the risk of tenosynovitis. Pay attention to rest.",
	
	"Jiangyuan Express: SG-117908244890, the parent star of planet OA-3584, will turn into a red giant star in 100 years and devour OA-3584. The intelligent creatures on it show unprecedented unity and work together to cope with this disaster.",
	
	"If you feel that pushing challenges is weak and prone to repeated mistakes, you can think about whether you can use better strategies.",
	
	"You know what? In fact, tips are all nonsense (sure",
	
	"Ah! What tip should I show you?",
	
	"Suddenly came a message! Oh, this is tips. It's all right ",
	
	"The total producer, game map artist and code coder of this game are Fallen_Cat, which is also the largest pigeon OwO in the test group",
	
	"I hope SOD can accompany you forever and embrace you",
	
	"When referring to this game, you can use the first letter SOD to replace the complete game name=w=, and the producer's name can also use the abbreviation FC to replace ^ w ^, but it's better not to take the nickname",
	
	"What is the Chinese name of this game? I'm sorry, I haven't...",
	
	'console.log("Hello Solitary Orbiting Dream")',
	
	"FC's kind-hearted tip: Don't modify the game data too frequently and randomly. There is a risk of bad files!",
	
	"If you want to make mod-related content for the game, the author still strongly supports it here, but if you want to make a mod version, you'd better say it to the author.",
	
	"The author is a child of Grade 7. She needs to take into account her own studies and may mumble at any time.",
]

function getNewsSpeed() {
	let nm = gameData.newsMarj+gameData.newsLength/2
	if (nm>300&&nm<400) return 90;
	else if (nm>=400) return Math.min(nm/40+80, 97.5);
	else if (nm<=300) return Math.min(97.5-nm/40, 97.5);
	else return 10000000000;
};

function newsTick(diff) {
	if (gameData.newsMarj<gameData.newsLength*(-1) || gameData.newsRS) {
		gameData.newsRS = true;
		gameData.newsCooldown += diff/1000;
		
		if (gameData.newsCooldown>=0.3) {
			gameData.newsMsg = NEWS[Math.floor(Math.random()*NEWS.length)];
			gameData.newsMarj = 700;
			gameData.newsLength = gameData.newsMsg.length*2;
		}
		if (gameData.newsCooldown>=0.6) {
			gameData.newsRS = false;
			gameData.newsCooldown = 0;
		}
	} else {
		gameData.newsMarj -= getNewsSpeed()*diff/1000;
	}
}