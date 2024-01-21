const baseAPI = 'https://testing-8az5.onrender.com/';

const doctorsList = 'doctor/list/';
// const doctorsTime = 'doctor/availabletime/';
// const doctorsDesignations = 'doctor/designation/';
// const doctorsSpecializations = 'doctor/specialization/';
// const doctorsAvailableTime = 'doctor/availabletime/';

// const allServices = 'services/';
// const allReviews = 'doctor/review/';

const particularDoctorReviews = 'doctor/review/?doctor_id=';
const particularDoctorAvailableTime = 'doctor/availabletime/?doctor_id=';

const appointment = 'appointment/';
// const particularPatientAppointment = 'appointment/?patient_id=';

// const patientRegister = 'patient/register/';
// const patientLogin = 'patient/login/';
// const patientLogout = 'patient/logout/';
// const searchQuery = '?search=';

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getParameters = () => {
    const searchParameter = new URLSearchParams(window.location.search).get('doctorID');
    // console.log(parameter);

    const constructedAPI1 = baseAPI+doctorsList+searchParameter
    fetch(constructedAPI1)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => displayDoctorDetails(data))
        .catch(error => console.log(error))

    const constructedAPI2 = baseAPI+particularDoctorReviews+searchParameter
    fetch(constructedAPI2)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => displayDocSpecificReview(data))
        .catch(error => console.log(error));

    const constructedAPI3 = baseAPI+particularDoctorAvailableTime+searchParameter
    fetch(constructedAPI3)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => displayDocSpecificAvailableTime(data))
        .catch(error => console.log(error));
}

const displayDoctorDetails = (doctor) => {
    // console.log(doctor);
    const doctorDetailPageElement = document.getElementById('doctor-details');
    const content = document.createElement('div');
    content.classList.add('doctor-details-container');

    content.innerHTML = `
      <div class="doc-image">
            <img src="${doctor.image}" alt="">
        </div>
        <div class="doc-info">
            <h1>${doctor.full_name}</h1>
            
            ${doctor.specialization.map(item => {
        return `<button class="doc-splz-btn"> ${item}</button>`
    })}
            <br>
            
            <h6>${doctor.designation}</h6>
            
            ${doctor.available_time.map(item => {
        return `<button class="doc-avt-btn"> ${item}</button>`
    })}
            
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus distinctio doloribus eligendi laborum mollitia quisquam.</p>
            <h4>Fees: ${doctor.fee} €</h4>
            <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Take Appointment</button>
        </div>`;

    doctorDetailPageElement.appendChild(content);
}

const displayDocSpecificReview = (allReviews) => {
    allReviews.forEach(review => {
        // console.log(review);

        const reviewCarouselElement = document.getElementById('doc-review-carousel');
        const reviewList = document.createElement('div');
        reviewList.classList.add('review-card');

        reviewList.innerHTML = `
        <img src="./images/girl.png" alt="reviewer-image">
        <h4>${review.reviewer}</h4>
        <p>${review.body.slice(0, 150)}</p>
        <h6>${review.rating}</h6>`

        reviewCarouselElement.appendChild(reviewList)
    })
}

const displayDocSpecificAvailableTime = (allTimeSlot) => {
    allTimeSlot.forEach(timeSlot => {
        // console.log(timeSlot);

        const availableTimeModalElement = document.getElementById('doc-spec-av-time');
        const availableTimeList = document.createElement('option');
        availableTimeList.value = timeSlot.id;
        availableTimeModalElement.appendChild(availableTimeList);

        availableTimeList.innerHTML = `${timeSlot.name}`

        availableTimeModalElement.appendChild(availableTimeList);
    })
}

getParameters()

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const bookAppointment = () => {
    const fieldStatus = document.getElementsByName('status');
    const fieldStatusSelection = Array.from(fieldStatus).find(fieldStatus => fieldStatus.checked);
    // console.log(fieldStatusSelection.value);

    const fieldSymptom = document.getElementById('symptom-text').value;
    // console.log(fieldSymptom)

    const fieldAvailableTime = document.getElementById('doc-spec-av-time');
    const fieldAvailableTimeSelection = Array.from(fieldAvailableTime.options).find(fieldAvailableTime => fieldAvailableTime.selected);
    // console.log(fieldAvailableTimeSelection.value);

    const searchParameter = new URLSearchParams(window.location.search).get('doctorID');

    // console.log(fieldStatusSelection.value, fieldSymptom, fieldAvailableTimeSelection.innerHTML, searchParameter);

    const appointmentInfo = {
        appointment_type: fieldStatusSelection.value,
        appointment_status: 'Pending',
        time: fieldAvailableTimeSelection.value,
        symptom: fieldSymptom,
        cancel: false,
        patient: 1,
        doctor: searchParameter,
    };
    // console.log(appointmentInfo);

    const constructedAPI4 = baseAPI+appointment
    console.log(constructedAPI4);
    fetch(baseAPI+appointment, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(appointmentInfo),
    })
        .then(response => response.json())
        // .then(data => console.log(data));
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
