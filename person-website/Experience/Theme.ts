import { EventEmitter } from "events";

//Edit theme for Three js
export default class Theme extends EventEmitter {
    theme:String
    toggleButton:any
    toggleCircle:any

    constructor() {
        super();

        this.theme = "light";

        this.toggleButton = document.querySelector("#theme-button");
  

        this.setEventListeners();
    }

    // Listen to theme button interation, and change to dark/light theme
    setEventListeners() {
        this.toggleButton.addEventListener("click", () => {
           
            this.theme = this.theme === "light" ? "dark" : "light";
            let btnOutline = document.body.querySelectorAll(".btn-outline-dark")
            let btnSolid = document.body.querySelectorAll(".btn-light")
            let btnCloseBox = document.body.querySelectorAll(".close-button-box")
            const icon = document.body.querySelector("#theme-button i")
            icon.classList.toggle("fa-sun")
            icon.classList.toggle("fa-moon")
            if(this.theme === "dark"){
                
                btnOutline.forEach(element => element.classList.toggle("btn-outline-dark"));
                btnOutline.forEach(element => element.classList.toggle("btn-outline-light"));
            }else{
                btnOutline = document.body.querySelectorAll(".btn-outline-light")
                btnOutline.forEach(element => element.classList.toggle("btn-outline-dark"));
                btnOutline.forEach(element => element.classList.toggle("btn-outline-light"));

            }
            btnSolid.forEach(element => element.classList.toggle("btn-dark"))
            btnCloseBox.forEach(element => {if (element.getAttribute('data-bs-theme') == 'dark') {
                element.setAttribute('data-bs-theme','light')
            }
            else {
                element.setAttribute('data-bs-theme','dark')
            }
        })

            document.body.classList.toggle("light-theme")
            document.body.classList.toggle("dark-theme")
           
            
            this.emit("switch", this.theme);
            
            // console.log(this.theme);
        });
    }
}