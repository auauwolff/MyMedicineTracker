interface NewAppointment {
  id: number;
  gpName: string;
  date: Date;
}

class Appointment implements NewAppointment {
  id: number;
  gpName: string;
  date: Date;

  constructor(id: number, gpName: string, date: Date) {
    this.id = id;
    this.gpName = gpName;
    this.date = new Date();
  }
}

class UIAppointment {
  static displayAppointment() {
    let StoredAppointment: NewAppointment[] = [
      {
        id: 123,
        gpName: "FelipeGP",
        date: new Date(2021, 7, 4, 16),
      },
      {
        id: 125,
        gpName: "ProgrammingGP",
        date: new Date(2021, 8, 4, 14),
      },
      {
        id: 205,
        gpName: "SurfersGP",
        date: new Date(2021, 9, 4, 8),
      },
      {
        id: 304,
        gpName: "SouthportGP",
        date: new Date(2021, 8, 10, 7),
      },
      {
        id: 410,
        gpName: "CoolyGP",
        date: new Date(2021, 6, 2, 10),
      },
    ];

    let appointments = StoredAppointment;

    appointments.forEach((appointment) =>
      UIAppointment.addAppointmentToList(appointment)
    );
  }

  static addAppointmentToList(appointment: NewAppointment) {
    const list = document.querySelector(
      "#appointment-list"
    ) as HTMLTableElement;

    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${appointment.id}</td>
          <td>${appointment.gpName}</td>
          <td>${appointment.date}</td>
          <td ><a href="#" class="btn-book" id="btn-book"  >&#10004;</a></td>
          `;

    list.appendChild(row);
  }

  static addAppointmentToUser(btn) {
    if (btn.classList.contains("btn-book")) {
      const clone = btn.parentElement.parentElement.cloneNode(true);
      const table = document.querySelector("#user-list");
      table.appendChild(clone);
    }
  }

  static deleteMaster(el) {
    if (el.classList.contains("btn-book")) {
      el.parentElement.parentElement.remove();
    }
  }

  static addAppointmentToMaster(btn) {
    if (btn.classList.contains("btn-book")) {
      const clone = btn.parentElement.parentElement.cloneNode(true);
      const table = document.querySelector("#appointment-list");
      table.appendChild(clone);
    }
  }

  static deleteUser(el) {
    if (el.classList.contains("btn-book")) {
      el.parentElement.parentElement.remove();
    }
  }
}

//Search Appointments
const search = document.querySelector("#search") as HTMLInputElement;
search.addEventListener("keyup", (e) => {
  const t = e.target as HTMLTextAreaElement;
  const term = t.value.toLowerCase();
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const appointment = row.children[1].textContent;
    if (appointment.toLowerCase().indexOf(term) != -1) {
      (row as HTMLTextAreaElement).style.display = "";
    } else {
      (row as HTMLTextAreaElement).style.display = "none";
    }
  });
});

//Display Appointments
document.addEventListener("DOMContentLoaded", UIAppointment.displayAppointment);

//Add appointment to user list
document.querySelector("#appointment-list").addEventListener("click", (e) => {
  UIAppointment.addAppointmentToUser(e.target);
  UIAppointment.deleteMaster(e.target);
});

//Remove appointment from user list
document.querySelector("#user-list").addEventListener("click", (e) => {
  UIAppointment.addAppointmentToMaster(e.target);
  UIAppointment.deleteUser(e.target);
});
