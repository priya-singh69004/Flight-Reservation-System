const logou = document.getElementById('userlogo');
const navhome = document.getElementById("homepage");
const logout = document.getElementById("logout");

const retrievedValue = localStorage.getItem("shareduname");
const takename = retrievedValue;
if(takename){
    logou.innerHTML = takename;
}


logout.addEventListener('click',function(e){
    
    e.preventDefault
    window.location.href = 'login.html';
    localStorage.clear();
    
})



const checkbtn = document.getElementById('checkbtn');
const onboarding = document.getElementById('onboarding');
const destination = document.getElementById('destination');
const error = document.getElementById('error');

checkbtn.addEventListener('click',function(e){
    e.preventDefault();
    if ((onboarding.value === '' || onboarding.value == null) && (destination.value === '' || destination.value == null)) {
        alert("Onboarding & Destination must be filled");
        onboarding.focus();
    }
    else if(onboarding.value === '' || onboarding.value == null) {
        alert("Onboarding cannot be empty");
    
        onboarding.focus();
    }
    else if (destination.value === '' || destination.value == null) {
        alert("Destination cannot be empty");
        destination.focus();
    }
    else{
        const startLocation = document.getElementById("onboarding").value;
        const endLocation = document.getElementById("destination").value;

        const journeyDetails = {
            startLocation: startLocation,
            endLocation: endLocation,
        };

        localStorage.setItem("journeyDetails", JSON.stringify(journeyDetails));

        const resultsSection = document.getElementById('results-section');
        resultsSection.innerHTML = '';
        
        const timings = [ 
            { company: 'Air Asia' }, 
            { company: 'Fly Emirates' }, 
            { company: 'IndiGo' }, 
            { company: 'Jet Airways' },
            { company: 'Vistara' },
            { company: 'SpiceJet' },
            { company: 'GoFirst' },
            { company: 'Scoot' }, 
        ];

        const generateRandomTime = () => { 
            const hour = Math.floor(Math.random() * 12) + 1; 
            const minute = Math.floor(Math.random() * 60); 
            const ampm = Math.random() > 0.5 ? 'AM' : 'PM'; 
            return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`; 
        };

        const getTimeDifference = (start, duration) => { 
            const [startHour, startMinute] = start.split(/[:\s]/); 
            const [durationHours, durationMinutes] = duration.split(/h\s|m/).map(Number); 
            const startTotalMinutes = (parseInt(startHour) % 12) * 60 + parseInt(startMinute) + (start.includes('PM') ? 720 : 0); 
            const endTotalMinutes = startTotalMinutes + durationHours * 60 + durationMinutes; const endHour = Math.floor((endTotalMinutes % 1440) / 60); 
            const endMinute = endTotalMinutes % 60; const endAmpm = endTotalMinutes >= 720 ? 'PM' : 'AM'; 
            return `${(endHour % 12).toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')} ${endAmpm}`; 
        };



        timings.forEach((flight, index) => {
            const start = generateRandomTime(); 
            const durationHours = Math.floor(Math.random() * 4) + 1; 
            const durationMinutes = Math.floor(Math.random() * 60); 
            const duration = `${durationHours}h ${durationMinutes}m`; 
            const end = getTimeDifference(start, duration); 
            let price = Math.floor((Math.random() * 10000) + 2000);
            let seat = Math.floor((Math.random() * 300) + 100);

            flight.start = start; 
            flight.duration = duration; 
            flight.Arrival = end;
            flight.price = price;
            localStorage.setItem("shareprice", "78999");
            flight.seat = seat;

            const flightCard = document.createElement('div');
            flightCard.classList.add('result-card');
            flightCard.innerHTML = `
                <div class="leftcard">
                    <h3>${flight.company}</h3>
                    <div class = "carddetails">
                        <p><strong>Departure:</strong> ${flight.start}</p>
                        <p><strong>Landing:</strong> ${flight.Arrival}</p>
                        <p><strong>Duration:</strong> ${flight.duration}</p>
                    </div>
                </div>
                <div class="centercard">
                    <p><strong>Price<br></strong><span>₹ ${flight.price}.00</span></p>
                    <div>
                        <h4>Available</h4>
                        <p>${flight.seat}/500</p>
                    </div>
                </div>
                <div class = "rightcard">
                    <button class="bookbtn" id="bookbtn">Book</button>
                </div>
            `;
            resultsSection.appendChild(flightCard);
        });
        const bookbtn = document.getElementById('bookbtn');
        bookbtn.addEventListener('click', (event) => {
            if (event.target.classList.contains('bookbtn')) {
                // Redirect to booking.html
                window.location.href = 'booking.html';
            }
        });
    }
})

const clearinputon = document.getElementById('clearinputon');

clearinputon.addEventListener('click',function(e){
    e.preventDefault();
    onboarding.value = ''; // Clear the input field
    onboarding.focus(); 
})

const clearinputde = document.getElementById('clearinputde');

clearinputde.addEventListener('click',function(e){
    e.preventDefault();
    destination.value = '';
    destination.focus(); 
})



const msgsbt = document.getElementById('msgsbt');
const emailright = document.getElementById('emailright');
const sendsucc = document.getElementById('sendsucc');
const comment = document.getElementById('comment');


sendsucc.style.display="none";
msgsbt.addEventListener('click',function(){

    if (comment.value === '' || comment.value == null) {
        alert("Message cant be empty");
    }

    else{
        emailright.style.display="none";
        sendsucc.style.display = "";
        sendsucc.innerHTML = "Message sent successfully ✔";
    }
})

