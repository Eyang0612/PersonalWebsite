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
            let items = document.body.querySelectorAll(".btn-outline-dark")
            const icon = document.body.querySelector("#theme-button i")
            icon.classList.toggle("fa-sun")
            icon.classList.toggle("fa-moon")
            if(this.theme === "dark"){
                
                items.forEach(element => element.classList.toggle("btn-outline-dark"));
                items.forEach(element => element.classList.toggle("btn-outline-light"));
            }else{
                items = document.body.querySelectorAll(".btn-outline-light")
                items.forEach(element => element.classList.toggle("btn-outline-dark"));
                items.forEach(element => element.classList.toggle("btn-outline-light"));
            }
            document.body.classList.toggle("light-theme")
            document.body.classList.toggle("dark-theme")
            this.toggleButton.classList.toggle('btn-dark')
            this.toggleButton.classList.toggle('btn-light')
            
            this.emit("switch", this.theme);
            
            // console.log(this.theme);
        });
    }
}