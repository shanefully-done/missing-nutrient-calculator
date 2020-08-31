var dataLanguage = {
	"en": {
		"calories": "Calories",
		"totalcarb": "Total Carbs",
		"protein": "Protein",
		"fat": "Fat",
		
		"calculate": "Calculate",
		"reset": "Reset",
		
		"impossible": "Impossible calculation. Try again.",
		"full": "Please delete one input.",

		"lang": "한국어",
		"bug": "Report bugs to Shane, thanks."
	},
	"ko": {
		"calories": "칼로리",
		"totalcarb": "총 탄수화물",
		"protein": "단백질",
		"fat": "지방",

		"calculate": "계산하기",
		"reset": "리셋",

		"impossible": "불가능한 계산입니다. 다시 입력해주세요.",
		"full": "입력된 칸 하나를 지워주세요.",

		"lang": "ENGLISH",
		"bug": "버그 제보는 쉐인에게 해주세요."
	}
}
var userLanguage = "en";
var interfaceLanguage = "en";

detectLanguage();
setLanguage();

function detectLanguage() {
	if (window.navigator.language == "ko") {
		userLanguage = "ko";
		interfaceLanguage = dataLanguage.ko;
	} else {
		userLanguage = "en";
		interfaceLanguage = dataLanguage.en;
	}
}

function setLanguage() {
	document.querySelector("#cal").placeholder = interfaceLanguage.calories;
    document.querySelector("#totalcarb").placeholder = interfaceLanguage.totalcarb;
    document.querySelector("#protein").placeholder = interfaceLanguage.protein;
    document.querySelector("#fat").placeholder = interfaceLanguage.fat;
    document.querySelector("#calculate").innerHTML = interfaceLanguage.calculate;
    document.querySelector("#reset").innerHTML = interfaceLanguage.reset;
    document.querySelector("#lang").innerHTML = interfaceLanguage.lang;
    document.querySelector("#bug").innerHTML = interfaceLanguage.bug;
}

function switchLanguage() {
	if (userLanguage == "ko") {
		userLanguage = "en";
		interfaceLanguage = dataLanguage.en;
		setLanguage();
	} else {
		userLanguage = "ko";
		interfaceLanguage = dataLanguage.ko;
		setLanguage();
	}
}
