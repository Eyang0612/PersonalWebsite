import { EventEmitter } from "events";

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

    setEventListeners() {
        this.toggleButton.addEventListener("click", () => {
           
            this.theme = this.theme === "light" ? "dark" : "light";
            let btnOutline = document.body.querySelectorAll(".btn-outline-dark")
            let btnSolid = document.body.querySelectorAll(".btn-light")
            const icon = document.body.querySelector("#theme-button i")
            icon.classList.toggle("fa-sun")
            icon.classList.toggle("fa-moon")
            // if(this.theme === "dark"){
                
            //     btnOutline.forEach(element => element.classList.toggle("btn-outline-dark"));
            //     btnOutline.forEach(element => element.classList.toggle("btn-outline-light"));
            // }else{
            //     btnOutline = document.body.querySelectorAll(".btn-outline-light")
            //     btnOutline.forEach(element => element.classList.toggle("btn-outline-dark"));
            //     btnOutline.forEach(element => element.classList.toggle("btn-outline-light"));
            // }
            btnOutline.forEach(element => element.classList.toggle("btn-outline-light"));
            btnSolid.forEach(element => element.classList.toggle("btn-dark"))

            document.body.classList.toggle("light-theme")
            document.body.classList.toggle("dark-theme")
            this.toggleButton.classList.toggle('btn-dark')
            this.toggleButton.classList.toggle('btn-light')
            
            this.emit("switch", this.theme);
            
            // console.log(this.theme);
        });
    }
}