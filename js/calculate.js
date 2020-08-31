// Core
function calculate() {
    console.log("Calculate");
    full();
    if (document.querySelector("#cal").value == "") {
        console.log("Calculate Calories");
        let missingNumber = document.querySelector("#totalcarb").value * 4 + document.querySelector("#protein").value * 4 + document.querySelector("#fat").value * 9;
        if (missingNumber > 0) {
            document.querySelector("#cal").attributes.placeholder.value = missingNumber;
        } else {
            document.querySelector("#alert").innerHTML = interfaceLanguage.impossible;
            document.querySelector("#alert").classList.add("active");
            document.querySelector("#cal").attributes.placeholder.value = "";
        }
    } else if (document.querySelector("#totalcarb").value == "") {
        console.log("Calculate Calories");
        let missingNumber = (document.querySelector("#cal").value - (document.querySelector("#protein").value * 4 + document.querySelector("#fat").value * 9)) / 4;
        if (missingNumber > 0) {
            document.querySelector("#totalcarb").attributes.placeholder.value = missingNumber;
        } else {
            document.querySelector("#alert").innerHTML = interfaceLanguage.impossible;
            document.querySelector("#alert").classList.add("active");
            document.querySelector("#totalcarb").attributes.placeholder.value = "";
        }
    } else if (document.querySelector("#protein").value == "") {
        console.log("Calculate Calories");
        let missingNumber = (document.querySelector("#cal").value - (document.querySelector("#totalcarb").value * 4 + document.querySelector("#fat").value * 9)) / 4;
        if (missingNumber > 0) {
            document.querySelector("#protein").attributes.placeholder.value = missingNumber;
        } else {
            document.querySelector("#alert").innerHTML = interfaceLanguage.impossible;
            document.querySelector("#alert").classList.add("active");
            document.querySelector("#protein").attributes.placeholder.value = "";
        }
    } else if (document.querySelector("#fat").value == "") {
        console.log("Calculate Calories");
        let missingNumber = (document.querySelector("#cal").value - (document.querySelector("#totalcarb").value * 4 + document.querySelector("#protein").value * 4)) / 9;
        if (missingNumber > 0) {
            document.querySelector("#fat").attributes.placeholder.value = missingNumber;
        } else {
            document.querySelector("#alert").innerHTML = interfaceLanguage.impossible;
            document.querySelector("#alert").classList.add("active");
            document.querySelector("#fat").attributes.placeholder.value = "";
        }
    }
}

// Checks
function full() {
    if (document.querySelector("#cal").value != "" && document.querySelector("#totalcarb").value != "" && document.querySelector("#protein").value != "" && document.querySelector("#fat").value != "") {
        document.querySelector("#alert").innerHTML = interfaceLanguage.full;
        document.querySelector("#alert").classList.add("active");
    } else {
        document.querySelector("#alert").innerHTML = "&nbsp;"
        document.querySelector("#alert").classList.remove("active");
    }
}

// Methods
function reset() {
    console.log("Emptied");

    document.querySelector("#cal").value = "";
    document.querySelector("#totalcarb").value = "";
    document.querySelector("#protein").value = "";
    document.querySelector("#fat").value = "";

    document.querySelector("#cal").attributes.placeholder.value = "Calories";
    document.querySelector("#totalcarb").attributes.placeholder.value = "Total Carbs";
    document.querySelector("#protein").attributes.placeholder.value = "Protein";
    document.querySelector("#fat").attributes.placeholder.value = "Fat";
}
