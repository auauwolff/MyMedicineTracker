var Medication = /** @class */ (function () {
    function Medication(id, name, dose, doseRepeat) {
        this.id = id;
        this.name = name;
        this.dose = dose;
        this.doseRepeat = doseRepeat;
    }
    return Medication;
}());
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.displayMedication = function () {
        var StoredMedication = [
            {
                id: 123,
                name: "Beozepan",
                dose: 1,
                doseRepeat: 4
            },
            {
                id: 456,
                name: "Sarapan",
                dose: 2,
                doseRepeat: 2
            },
        ];
        var medications = StoredMedication;
        medications.forEach(function (medication) { return UI.addMedicationToList(medication); });
    };
    UI.addMedicationToList = function (medication) {
        var list = document.querySelector("#medication-list");
        var row = document.createElement("tr");
        row.innerHTML = "\n      <td>" + medication.id + "</td>\n      <td>" + medication.name + "</td>\n      <td>" + medication.dose + "</td>\n      <td >" + medication.doseRepeat + "</td>\n      <td ><a href=\"#\" class=\"btn-edit\" id=\"btn-edit\"  >&#9998;</a></td>\n      <td><a href=\"#\" class=\"btn-delete\"  >X</a></td>\n      ";
        list.appendChild(row);
    };
    UI.editMedication = function (btn) {
        if (btn.classList.contains("btn-edit")) {
            var b = btn.parentElement.parentElement.children[0];
            var c = btn.parentElement.parentElement.children[1];
            var d = btn.parentElement.parentElement.children[2];
            var e = btn.parentElement.parentElement.children[3];
            b.contentEditable = "true";
            c.contentEditable = "true";
            d.contentEditable = "true";
            e.contentEditable = "true";
            alert("Select the table to Edit");
        }
    };
    UI.deleteMedication = function (el) {
        if (el.classList.contains("btn-delete")) {
            el.parentElement.parentElement.remove();
            alert("Medication Removed from the List");
        }
    };
    UI.clearFields = function () {
        var i = document.querySelector("#identifier");
        var m = document.querySelector("#medication");
        var d = document.querySelector("#dose");
        var r = document.querySelector("#repeats");
        i.value = "";
        m.value = "";
        d.value = "";
        r.value = "";
    };
    return UI;
}());
//Display Medication
document.addEventListener("DOMContentLoaded", UI.displayMedication);
//Add Medication
document.querySelector("#medication-form").addEventListener("submit", function (e) {
    e.preventDefault();
    //Get form values
    var identifier = document.querySelector("#identifier");
    var medicationName = document.querySelector("#medication");
    var dose = document.querySelector("#dose");
    var repeats = document.querySelector("#repeats");
    //Validate
    if (identifier.value === "" ||
        medicationName.value === "" ||
        dose.value === "" ||
        repeats.value === "") {
        alert("Please fill in all fields");
    }
    else {
        //Instatiate Medication
        var medication = new Medication(identifier.valueAsNumber, medicationName.value, dose.valueAsNumber, repeats.valueAsNumber);
        //Add Medication to UI
        UI.addMedicationToList(medication);
        alert("Medication Add to the List!");
        //Clear fields
        UI.clearFields();
    }
});
//Remove Medication
document.querySelector("#medication-list").addEventListener("click", function (e) {
    UI.deleteMedication(e.target);
});
document.querySelector("#medication-list").addEventListener("click", function (e) {
    UI.editMedication(e.target);
});
//Search Input
var searchInput = document.querySelector("#search");
searchInput.addEventListener("keyup", function (e) {
    var t = e.target;
    var term = t.value.toLowerCase();
    var rows = document.querySelectorAll("tbody tr");
    rows.forEach(function (row) {
        var medication = row.children[1].textContent;
        if (medication.toLowerCase().indexOf(term) != -1) {
            row.style.display = "";
        }
        else {
            row.style.display = "none";
        }
    });
});
