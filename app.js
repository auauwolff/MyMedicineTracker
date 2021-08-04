var Appointment = /** @class */ (function () {
    function Appointment(id, gpName, date) {
        this.id = id;
        this.gpName = gpName;
        this.date = new Date();
    }
    return Appointment;
}());
var UIAppointment = /** @class */ (function () {
    function UIAppointment() {
    }
    UIAppointment.displayAppointment = function () {
        var StoredAppointment = [
            {
                id: 123,
                gpName: "FelipeGP",
                date: new Date(2021, 7, 4, 16)
            },
            {
                id: 125,
                gpName: "ProgrammingGP",
                date: new Date(2021, 8, 4, 14)
            },
            {
                id: 205,
                gpName: "SurfersGP",
                date: new Date(2021, 9, 4, 8)
            },
            {
                id: 304,
                gpName: "SouthportGP",
                date: new Date(2021, 8, 10, 7)
            },
            {
                id: 410,
                gpName: "CoolyGP",
                date: new Date(2021, 6, 2, 10)
            },
        ];
        var appointments = StoredAppointment;
        appointments.forEach(function (appointment) {
            return UIAppointment.addAppointmentToList(appointment);
        });
    };
    UIAppointment.addAppointmentToList = function (appointment) {
        var list = document.querySelector("#appointment-list");
        var row = document.createElement("tr");
        row.innerHTML = "\n          <td>" + appointment.id + "</td>\n          <td>" + appointment.gpName + "</td>\n          <td>" + appointment.date + "</td>\n          <td ><a href=\"#\" class=\"btn-book\" id=\"btn-book\"  >&#10004;</a></td>\n          ";
        list.appendChild(row);
    };
    UIAppointment.addAppointmentToUser = function (btn) {
        if (btn.classList.contains("btn-book")) {
            var clone = btn.parentElement.parentElement.cloneNode(true);
            var table = document.querySelector("#user-list");
            table.appendChild(clone);
        }
    };
    UIAppointment.deleteMaster = function (el) {
        if (el.classList.contains("btn-book")) {
            el.parentElement.parentElement.remove();
        }
    };
    UIAppointment.addAppointmentToMaster = function (btn) {
        if (btn.classList.contains("btn-book")) {
            var clone = btn.parentElement.parentElement.cloneNode(true);
            var table = document.querySelector("#appointment-list");
            table.appendChild(clone);
        }
    };
    UIAppointment.deleteUser = function (el) {
        if (el.classList.contains("btn-book")) {
            el.parentElement.parentElement.remove();
        }
    };
    return UIAppointment;
}());
//Search Appointments
var search = document.querySelector("#search");
search.addEventListener("keyup", function (e) {
    var t = e.target;
    var term = t.value.toLowerCase();
    var rows = document.querySelectorAll("tbody tr");
    rows.forEach(function (row) {
        var appointment = row.children[1].textContent;
        if (appointment.toLowerCase().indexOf(term) != -1) {
            row.style.display = "";
        }
        else {
            row.style.display = "none";
        }
    });
});
//Display Appointments
document.addEventListener("DOMContentLoaded", UIAppointment.displayAppointment);
//Add appointment to user list
document.querySelector("#appointment-list").addEventListener("click", function (e) {
    UIAppointment.addAppointmentToUser(e.target);
    UIAppointment.deleteMaster(e.target);
});
//Remove appointment from user list
document.querySelector("#user-list").addEventListener("click", function (e) {
    UIAppointment.addAppointmentToMaster(e.target);
    UIAppointment.deleteUser(e.target);
});
