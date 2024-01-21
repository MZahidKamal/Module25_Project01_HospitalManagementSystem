const baseAPI = 'https://testing-8az5.onrender.com/';

const doctorsList = 'doctor/list/';
// const doctorsTime = 'doctor/availabletime/';
const doctorsDesignations = 'doctor/designation/';
const doctorsSpecializations = 'doctor/specialization/';
// const doctorsAvailableTime = 'doctor/availabletime/';
const allServices = 'services/';
const allReviews = 'doctor/review/';
// const particularDoctorReviews = 'doctor/review/?doctor_id=2';
// const patientRegister = 'patient/register/';
// const patientLogin = 'patient/login/';
// const patientLogout = 'patient/logout/';
const searchQuery = '?search=';

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const loadServices = () => {
    fetch(baseAPI+allServices)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => displayEachService(data))
        .catch(error => console.log(error));
}

const displayEachService = (allServices) => {
    allServices.forEach(service => {
        // console.log(service)
        const serviceCarouselElement = document.getElementById('service-carousel')
        const serviceList = document.createElement('li')

        serviceList.innerHTML = `
        <div class="card shadow h-100">
            <div class="ratio ratio-16x9">
                <img src=${service.image} class="card-img-top" loading="lazy" alt="...">
            </div>
            <div class="card-body p-3 p-xl-5">
                <h3 class="card-title h5">${service.name}</h3>
                <p class="card-text">${service.description.slice(0, 150)}</p>
                <div>
                    <a href="#" class="btn btn-sm btn-primary">Show Details</a>
                </div>
            </div>
        </div>`

        serviceCarouselElement.appendChild(serviceList)
    });
}

loadServices()

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const loadDoctors = (searchKeyword) => {
    // console.log(searchKeyword)
    document.getElementById('doctors').innerHTML = ''

    const constructedAPI = baseAPI+doctorsList+searchQuery+ (searchKeyword? searchKeyword:'')
    // console.log(constructedAPI)

    fetch(constructedAPI)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0){
                document.getElementById('doctors').innerHTML = '';
                displayEachDoctor(data.results)
            }
            else {
                document.getElementById('doctors').innerHTML = '';
                document.getElementById('no-data').style.display = 'block';
            }
        })
        .catch(error => console.log(error));
}

const displayEachDoctor = (allDoctors) => {
    allDoctors?.forEach(doctor => {
        // console.log(doctor)
        const doctorCardElement = document.getElementById('doctors')
        const doctorList = document.createElement('div')
        doctorList.classList.add('doctor-card')

        doctorList.innerHTML = `
        <img class="doctor-image" src=${doctor.image} alt="">
        <h4>${doctor.full_name}</h4>
        <h6>${doctor.designation[0]}</h6>

        ${doctor.specialization.map((item) => {
            return `<small> ${item}</small>`
        })}

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, voluptatum?</p>
        <button><a target="_blank" href="doctor_details.html?doctorID=${doctor.id}">Details</a></button>`

        doctorCardElement.appendChild(doctorList)
    });
}

loadDoctors()

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const loadSpecializations = () => {
    fetch(baseAPI+doctorsSpecializations)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => displayEachSpecialization(data))
        .catch(error => console.log(error))
}

const displayEachSpecialization = (allSpecializations) => {
    allSpecializations.forEach(specialization => {
        // console.log(specialization)
        const specializationDropdownElement = document.getElementById('specialization-dropdown')
        const specializationList = document.createElement('li')

        specializationList.innerHTML = `<a onclick="loadDoctors('${specialization.name}')" class="dropdown-item" href="#">${specialization.name}</a>`

        specializationDropdownElement.appendChild(specializationList)
    })
}

loadSpecializations()

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const loadDesignations = () => {
    fetch(baseAPI+doctorsDesignations)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => displayEachDesignation(data))
        .catch(error => console.log(error))
}

const displayEachDesignation = (allDesignations) => {
    allDesignations.forEach(designation => {
        // console.log(designation)
        const designationDropdownElement = document.getElementById('designation-dropdown')
        const designationList = document.createElement('li')

        designationList.innerHTML = `<a onclick="loadDoctors('${designation.name}')" class="dropdown-item" href="#">${designation.name}</a>`

        designationDropdownElement.appendChild(designationList)
    })
}

loadDesignations()

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const searchDoctor = () => {
    const searchKeyword = document.getElementById('doctor-search').value
    // console.log(searchKeyword)
    loadDoctors(searchKeyword)
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const loadReviews = () => {
    fetch(baseAPI+allReviews)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => displayEachReview(data))
        .catch(error => console.log(error));
}

const displayEachReview = (allReviews) => {
    allReviews.forEach(review => {
        // console.log(review);

        const reviewCarouselElement = document.getElementById('review-carousel');
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

loadReviews()

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
