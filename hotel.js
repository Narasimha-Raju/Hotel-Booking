var customerNameInput = document.getElementById('customer-name');
var checkInDateInput = document.getElementById('check-in-date');
var totalDaysInput = document.getElementById('total-days');
var totalPersonsInput = document.getElementById('total-persons');
var roomTypeSelect = document.getElementById('room-type');
var amenitiesSelect = document.getElementById('amenities');
var advancePaymentInput = document.getElementById('advance-payment')
var totalRoomCostInput = document.getElementById('total-room-cost');
var totalAmenitiesCostInput = document.getElementById('total-amenities-cost');
var totalCostInput = document.getElementById('total-cost');
var balanceAmountInput = document.getElementById('balance-amount');

totalDaysInput.addEventListener('input', updateValues);
totalPersonsInput.addEventListener('input', updateValues);
roomTypeSelect.addEventListener('change', updateValues);
amenitiesSelect.addEventListener('change', updateValues);
advancePaymentInput.addEventListener('input', updateValues);

function updateValues() {
    var totalDays = parseInt(totalDaysInput.value);
    var totalPersons = parseInt(totalPersonsInput.value);
    var advancePayment = parseInt(advancePaymentInput.value);
    var roomCost = getRoomCost(roomTypeSelect.value);
    var amenitiesCost = getAmenitiesCost(amenitiesSelect.value);
    var extraPersonCost = getExtraPersonsCost(totalPersonsInput.value);

    var totalRoomCost = totalDays * roomCost;
    var totalCost = totalRoomCost + amenitiesCost + extraPersonCost;
    var balanceAmount = totalRoomCost - advancePayment;

    totalRoomCostInput.value = totalRoomCost;
    totalCostInput.value = totalCost;
    balanceAmountInput.value = balanceAmount;
    totalAmenitiesCostInput.value = amenitiesCost;
};

function getRoomCost(roomType) {
    if (roomType === 'delux room') {
        return 2500;
    }
    else if (roomType === 'suit room') {
        return 4000;
    }
    return 0;
}
function getAmenitiesCost(amenities) {
    if (amenities === 'AC') {
        return 1000;
    } else if (amenities === 'Locker') {
        return 300;
    }
    return 0;
}
function getExtraPersonsCost(persons) {
    if (persons > 2) {
        return 1000 * (persons - 2);
    }
    return 0;
}

//Intial calculation
updateValues();

var submitBtn = document.getElementById('submit-button');
var submittedList = document.getElementById('submitted-list');

submitBtn.addEventListener('click', handleSubmit);
function handleSubmit(e) {
    e.preventDefault();

    //Get form values
    var customerName = document.getElementById('customer-name').value;
    var checkInDate = document.getElementById('check-in-date').value;
    var totalDays = parseInt(document.getElementById('total-days').value);
    var totalPersons = parseInt(document.getElementById('total-persons').value);
    var roomType = document.getElementById('room-type').value;
    var amenities = document.getElementById('amenities').value;
    var advancePayment = parseInt(document.getElementById('advance-payment').value);
    var totalRoomCost = parseInt(document.getElementById('total-room-cost').value);
    var totalAmenitiesCost = parseInt(document.getElementById('total-amenities-cost').value);
    var totalAmount = parseInt(document.getElementById('total-cost').value);
    var balanceAmount = parseInt(document.getElementById('balance-amount').value);

    //Create a booking object
    var booking = {
        customerName,
        checkInDate,
        totalDays,
        totalPersons,
        roomType,
        amenities,
        advancePayment,
        totalRoomCost,
        totalAmenitiesCost,
        totalAmount,
        balanceAmount
    };

    //Store booking data in localStorage

    var submittedBookings = JSON.parse(localStorage.getItem('submittedBookings')) || [];
    submittedBookings.push(booking);
    localStorage.setItem('submittedBookings', JSON.stringify(submittedBookings));

    //update submitted list
    updateSubmittedList();

    //clear form
    document.getElementById('register').reset();
}

function updateSubmittedList() {
    submittedList.innerHTML = '';

    var submittedBookings = JSON.parse(localStorage.getItem('submittedBookings')) || [];
    submittedBookings.forEach((booking, index) => {
        var table = document.createElement('table');
        table.classList.add('submitted-booking-table')

        var rowData = [
            ['Booking:', 'Booking' + (index + 1)],
            ['customer Name:', booking.customerName],
            ['check-In Date:', booking.checkInDate],
            ['Total Days:', booking.totalDays],
            ['Total Persons:', booking.totalPersons],
            ['Room Type:', booking.roomType],
            ['Amenities:', booking.amenities],
            ['Advance Payment', booking.advancePayment],
            ['Total Room Cost:', booking.totalRoomCost],
            ['Total Amenities Cost:', booking.totalAmenitiesCost],
            ['Total Amount:', booking.totalAmount],
            ['Balance Amount:', booking.balanceAmount]
        ];
        rowData.forEach(rowDataArray => {
            var row = table.insertRow();
            rowDataArray.forEach(cellData => {
                var cell = row.insertCell();
                cell.textContent = cellData;
            });
        })

        submittedList.appendChild(table);
    });
}

//Initial update of submitted list
updateSubmittedList();

localStorage.clear();