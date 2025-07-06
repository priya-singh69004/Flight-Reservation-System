const username = document.getElementById('username');
const password = document.getElementById('password');
const form = document.getElementById('form');
const uerror = document.getElementById('uerror');
const perror = document.getElementById('perror');
const lbutton = document.getElementById('button');
const userlogo = document.getElementById('userlogo');


let flag = 0;
form.addEventListener('submit',(e)=>{
    if (username.value === '' || username.value == null) {
        e.preventDefault();
        uerror.innerHTML = "Email is required"
        flag++;
    }
    if (password.value === '' || password.value == null) {
        e.preventDefault();
        perror.innerHTML = "Password is required"
        flag++;
    }
    if (password.value.length < 8) {
        e.preventDefault();
        perror.innerHTML = "Password must be more than 8 characters"
    }
    if (flag==0) {
        e.preventDefault();
        const nameuser = document.getElementById('username').value;
        let newusername = nameuser;
        let modifiedusername = " ";
        let index = 0;
        while (newusername[index]!= "@" && index < newusername.length) {
            modifiedusername += newusername[index];
            index++;
        }
        localStorage.setItem("shareduname", modifiedusername);

        window.location.href ='main.html';
    }
})