interface NewMedication {
  id: number;
  name: string;
  dose: number;
  doseRepeat: number;
}

class Medication implements NewMedication {
  id: number;
  name: string;
  dose: number;
  doseRepeat: number;

  constructor(id: number, name: string, dose: number, doseRepeat: number) {
    this.id = id;
    this.name = name;
    this.dose = dose;
    this.doseRepeat = doseRepeat;
  }
}

class UI {
  static displayMedication() {
    let StoredMedication: NewMedication[] = [
      {
        id: 123,
        name: "Beozepan",
        dose: 1,
        doseRepeat: 4,
      },
      {
        id: 456,
        name: "Sarapan",
        dose: 2,
        doseRepeat: 2,
      },
    ];

    let medications = StoredMedication;

    medications.forEach((medication) => UI.addMedicationToList(medication));
  }

  static addMedicationToList(medication: NewMedication) {
    const list = document.querySelector("#medication-list") as HTMLTableElement;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${medication.id}</td>
      <td>${medication.name}</td>
      <td>${medication.dose}</td>
      <td >${medication.doseRepeat}</td>
      <td ><a href="#" class="btn-edit" id="btn-edit"  >&#9998;</a></td>
      <td><a href="#" class="btn-delete"  >X</a></td>
      `;

    list.appendChild(row);
  }

  static editMedication(btn) {
    if (btn.classList.contains("btn-edit")) {
      const b = btn.parentElement.parentElement.children[0];
      const c = btn.parentElement.parentElement.children[1];
      const d = btn.parentElement.parentElement.children[2];
      const e = btn.parentElement.parentElement.children[3];
      b.contentEditable = "true";
      c.contentEditable = "true";
      d.contentEditable = "true";
      e.contentEditable = "true";
      alert("Select the table to Edit");
    }
  }

  static deleteMedication(el) {
    if (el.classList.contains("btn-delete")) {
      el.parentElement.parentElement.remove();
      alert("Medication Removed from the List");
    }
  }

  static clearFields() {
    const i = document.querySelector("#identifier") as HTMLInputElement;
    const m = document.querySelector("#medication") as HTMLInputElement;
    const d = document.querySelector("#dose") as HTMLInputElement;
    const r = document.querySelector("#repeats") as HTMLInputElement;
    i.value = "";
    m.value = "";
    d.value = "";
    r.value = "";
  }
}

//Display Medication
document.addEventListener("DOMContentLoaded", UI.displayMedication);

//Add Medication
document.querySelector("#medication-form").addEventListener("submit", (e) => {
  e.preventDefault();
  //Get form values
  const identifier = document.querySelector("#identifier") as HTMLInputElement;
  const medicationName = document.querySelector(
    "#medication"
  ) as HTMLInputElement;
  const dose = document.querySelector("#dose") as HTMLInputElement;
  const repeats = document.querySelector("#repeats") as HTMLInputElement;

  //Validate
  if (
    identifier.value === "" ||
    medicationName.value === "" ||
    dose.value === "" ||
    repeats.value === ""
  ) {
    alert("Please fill in all fields");
  } else {
    //Instatiate Medication
    const medication = new Medication(
      identifier.valueAsNumber,
      medicationName.value,
      dose.valueAsNumber,
      repeats.valueAsNumber
    );

    //Add Medication to UI
    UI.addMedicationToList(medication);
    alert("Medication Add to the List!");
    //Clear fields
    UI.clearFields();
  }
});

//Remove Medication
document.querySelector("#medication-list").addEventListener("click", (e) => {
  UI.deleteMedication(e.target);
});

document.querySelector("#medication-list").addEventListener("click", (e) => {
  UI.editMedication(e.target);
});

//Search Input
const searchInput = document.querySelector("#search") as HTMLInputElement;
searchInput.addEventListener("keyup", (e) => {
  const t = e.target as HTMLTextAreaElement;
  const term = t.value.toLowerCase();
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const medication = row.children[1].textContent;
    if (medication.toLowerCase().indexOf(term) != -1) {
      (row as HTMLTextAreaElement).style.display = "";
    } else {
      (row as HTMLTextAreaElement).style.display = "none";
    }
  });
});
