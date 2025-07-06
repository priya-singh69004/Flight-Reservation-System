const signubtn = document.getElementById('signupbtn');
const pass = document.getElementById('pass');
const cnfpass = document.getElementById('cnfpass');
const nametxt = document.getElementById('nametxt');
const emailtxt = document.getElementById('emailtxt');

signubtn.addEventListener('click',function(){
    if (nametxt.value === '' || nametxt.value == null) {
        alert("name must be filled");
    }
    if (emailtxt.value === '' || emailtxt.value == null) {
        alert("email must be filled");
    }
    if (pass.value === '' || pass.value == null) {
        alert("password must be filled");
    }
    if (cnfpass.value === '' || cnfpass.value == null) {
        alert("confirm password must be filled");
    }
    if(pass.value != cnfpass.value){
        alert("Password and confirm password must be same");
    }
    else{
        window.location.href = "login.html";
    }
})