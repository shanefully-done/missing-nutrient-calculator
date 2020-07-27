function calculate() {
    console.log("Calculate");
    if (document.querySelector("#cal").value == "") {
        console.log("Calculate Calories");
        document.querySelector("#cal").attributes.placeholder.value =
            document.querySelector("#totalcarb").value * 4 + document.querySelector("#protein").value * 4 + document.querySelector("#fat").value * 9;
    } else if (document.querySelector("#totalcarb").value == "") {
        console.log("Calculate Calories");
        document.querySelector("#totalcarb").attributes.placeholder.value =
            (document.querySelector("#cal").value - (document.querySelector("#protein").value * 4 + document.querySelector("#fat").value * 9)) / 4;
    } else if (document.querySelector("#protein").value == "") {
        console.log("Calculate Calories");
        document.querySelector("#protein").attributes.placeholder.value =
            (document.querySelector("#cal").value - (document.querySelector("#totalcarb").value * 4 + document.querySelector("#fat").value * 9)) / 4;
    } else if (document.querySelector("#fat").value == "") {
        console.log("Calculate Calories");
        document.querySelector("#fat").attributes.placeholder.value =
            (document.querySelector("#cal").value - (document.querySelector("#totalcarb").value * 4 + document.querySelector("#protein").value * 4)) / 9;
    }
}

function empty() {
    console.log("Emptied");

    document.querySelector("#cal").value = "";
    document.querySelector("#totalcarb").value = "";
    document.querySelector("#protein").value = "";
    document.querySelector("#fat").value = "";

    document.querySelector("#cal").attributes.placeholder.value = "";
    document.querySelector("#totalcarb").attributes.placeholder.value = "";
    document.querySelector("#protein").attributes.placeholder.value = "";
    document.querySelector("#fat").attributes.placeholder.value = "";
}