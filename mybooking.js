document.addEventListener("DOMContentLoaded", function () {
    // Retrieve user details and journey details from localStorage
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const journeyDetails = JSON.parse(localStorage.getItem("journeyDetails"));

    let gentime1 = Math.floor((Math.random()*11)+1)
    let gentime2 = Math.floor((Math.random()*59)+1)

    // Check if both user and journey details are available
    if (userDetails && journeyDetails) {
        // Display user and journey details
        document.getElementById("userDetails").innerHTML = `
            <div class="details1">
                <p><strong>Name<br></strong> ${userDetails.name}</p>
                <p><strong>Date<br></strong> ${userDetails.date}</p>
                <div class="innerdetails1">
                    <p><strong>Class<br></strong> ${userDetails.class}</p>
                    <p><strong>Passangers<br></strong> ${userDetails.passenger}</p>
                </div>
            </div>
            <div class="details2">
                <p><strong>Email<br></strong> ${userDetails.email}</p>
                <div class="cendetails">
                    <img src="/IMAGES/LOGO.png" alt="">
                    <span>CONFIRMED ✅</span>
                </div>
                <h3>Journey Details</h3>
                <div class="innerdetails2">
                    <p><strong>From<br></strong> ${journeyDetails.startLocation}</p>
                    <p><strong>To<br></strong> ${journeyDetails.endLocation}</p>
                    <p><strong>Boarding time<br></strong> ${gentime1} : ${gentime2} PM</p>
                </div>
            </div>
        `;
    } else {
        // Display a message if details are missing
        document.getElementById("userDetails").innerHTML = `<p class="nodetails">No booking details found.</p>`;
    }
});


const btn = document.getElementById('backtomain');

btn.addEventListener('click',function(){
    window.location.href="main.html";
})