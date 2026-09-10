document.addEventListener("DOMContentLoaded", function(){

    loadTheme();
    setActiveNavigation();

});


function toggleMenu(){

    const nav =
        document.getElementById("navLinks");

    if(nav){
        nav.classList.toggle("open");
    }

}


document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        const nav =
            document.getElementById("navLinks");

        if(nav){
            nav.classList.remove("open");
        }

    }

});


function toggleTheme(){

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "quickfixDarkMode",
        isDark
    );

    const button =
        document.getElementById("themeBtn");

    if(button){
        button.innerText =
            isDark ? "☀️" : "🌙";
    }

}


function loadTheme(){

    const dark =
        localStorage.getItem(
            "quickfixDarkMode"
        );

    if(dark === "true"){

        document.body.classList.add("dark");

        const button =
            document.getElementById("themeBtn");

        if(button){
            button.innerText = "☀️";
        }

    }

}


function setActiveNavigation(){

    let current =
        window.location.pathname
        .split("/")
        .pop();

    if(current === ""){
        current = "index.html";
    }

    document
    .querySelectorAll(".nav-links a")
    .forEach(function(link){

        if(
            link.getAttribute("href")
            === current
        ){
            link.classList.add("active");
        }

    });

}


/* SERVICE FILTER */

function filterServices(){

    const search =
        document.getElementById(
            "serviceSearch"
        );

    if(!search){
        return;
    }

    const value =
        search.value.toLowerCase();

    document
    .querySelectorAll(".service-card")
    .forEach(function(card){

        const name =
            card.dataset.name.toLowerCase();

        card.style.display =
            name.includes(value)
            ? ""
            : "none";

    });

}


function showAllServices(){

    const search =
        document.getElementById(
            "serviceSearch"
        );

    if(search){
        search.value = "";
    }

    document
    .querySelectorAll(".service-card")
    .forEach(function(card){

        card.style.display = "";

    });

    showToast(
        "All QuickFix services are showing."
    );

}


/* WHATSAPP BOOKING */

function bookService(service){

    const message =

`Hello QuickFix!

I need the following service:

Service: ${service}

Please send me booking details.`;

    const url =

    "https://wa.me/923482934535?text="

    +

    encodeURIComponent(message);

    window.open(url,"_blank");

}


/* CONTACT FORM */

function sendContact(event){

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const service =
        document.getElementById("service").value;

    const message =
        document.getElementById("message").value.trim();


    if(name.length < 2){

        showToast(
            "Please enter your name."
        );

        return;
    }


    if(phone.length < 10){

        showToast(
            "Please enter a valid phone number."
        );

        return;
    }


    if(service === ""){

        showToast(
            "Please select a service."
        );

        return;
    }


    if(message.length < 5){

        showToast(
            "Please describe your problem."
        );

        return;
    }


    const text =

`Hello QuickFix!

Name: ${name}
Phone: ${phone}
Service: ${service}

Problem:
${message}

Please contact me regarding this service.`;

    const url =

    "https://wa.me/923482934535?text="

    +

    encodeURIComponent(text);


    showToast(
        "Opening WhatsApp..."
    );


    setTimeout(function(){

        window.open(url,"_blank");

    },400);

}


/* OFFERS */

function applyCoupon(code){

    localStorage.setItem(
        "quickfixCoupon",
        code
    );

    showToast(
        "Coupon " +
        code +
        " selected successfully."
    );

}


/* TOAST */

function showToast(message){

    const toast =
        document.getElementById("toast");

    if(!toast){
        return;
    }

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },3000);

}


/* MOUSE EVENT */

const heroCard =
    document.getElementById("heroCard");

if(heroCard){

    heroCard.addEventListener(
        "mousemove",
        function(event){

            const rect =
                heroCard.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const rotateY =
                (
                    x /
                    rect.width -
                    .5
                ) * 5;

            const rotateX =
                -(
                    y /
                    rect.height -
                    .5
                ) * 5;

            heroCard.style.transform =

                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    heroCard.addEventListener(
        "mouseleave",
        function(){

            heroCard.style.transform =
                "rotateX(0) rotateY(0)";

        }
    );

}