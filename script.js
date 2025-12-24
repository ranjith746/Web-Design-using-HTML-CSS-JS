let loggedIn=false;
let users = JSON.parse(localStorage.getItem('users')) || [];

function showPage(pageId){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
    let link=document.querySelector(`.nav-links a[onclick="showPage('${pageId}')"]`);
    if(link) link.classList.add('active');
    if(window.innerWidth<600){document.querySelector('.nav-links').classList.remove('show');}
}

function toggleHamburger(){document.querySelector('.nav-links').classList.toggle('show');}
function toggleDarkMode(){
    document.body.classList.toggle('dark');
    document.querySelector('.dark-toggle').textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
}

function toggleExclusiveExpand(clicked){
    document.querySelectorAll('.expand-box').forEach(box=>{if(box!==clicked) box.classList.remove('active');});
    clicked.classList.toggle('active');
}

function toggleExclusiveCard(clicked){
    document.querySelectorAll('.card').forEach(card=>{if(card!==clicked) card.classList.remove('active');});
    clicked.classList.toggle('active');
}

function submitForm(e){e.preventDefault();
showPopup(`Thank you ${document.getElementById('name').value}, message received!`);
document.querySelector('#contact form').reset();
}

function showPopup(msg){let p=document.getElementById('popupMsg');p.textContent=msg;p.style.opacity=1;setTimeout(()=>{p.style.opacity=0;},3000);}

function validatePassword(input,msgId){
    let val=input.value;
    let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    document.getElementById(msgId).textContent = regex.test(val) ? 'Strong password' : 'Use 1 uppercase, lowercase, number & special char';
    document.getElementById(msgId).style.color = regex.test(val)?'green':'red';
}

function registerSubmit(e){
    e.preventDefault();
    let u=document.getElementById('regUser').value;
    let eMail=document.getElementById('regEmail').value;
    let p=document.getElementById('regPass').value;
    if(users.find(x=>x.username===u)){showPopup('Username already exists');return;}
    users.push({username:u,email:eMail,password:p});
    localStorage.setItem('users',JSON.stringify(users));
    document.getElementById('regMsg').textContent='Registered successfully!';
    document.getElementById('regMsg').style.color='green';
    showPopup('Registered successfully! You can login now.');
    document.getElementById('registerPage').querySelector('form').reset();
    setTimeout(()=>showPage('loginPage'),1000);
}

function loginSubmit(e){
    e.preventDefault();
    let u=document.getElementById('loginUser').value;
    let p=document.getElementById('loginPass').value;
    let found=users.find(x=>x.username===u && x.password===p);
    if(found){
        loggedIn=true;
        showPopup('Successfully logged in!');
        document.getElementById('loginMsg').textContent='Logged in successfully!';
        document.getElementById('loginMsg').style.color='green';
        document.querySelector('header').style.opacity='1';
        document.querySelector('header').style.pointerEvents='all';
        showPage('home');
    } else {
        document.getElementById('loginMsg').textContent='Invalid credentials!';
        document.getElementById('loginMsg').style.color='red';
    }
}

function logout(){
    loggedIn=false;
    showPage('loginPage');
    document.querySelector('header').style.opacity='0';
    document.querySelector('header').style.pointerEvents='none';
    showPopup('Successfully logged out!');
}
