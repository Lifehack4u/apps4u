import {LitElement, html} from 'lit';


class MyElement extends LitElement {
    static properties = {
        timer: 0
    }


    constructor() {
        super();
        
    }
    render()
    {
        return html`<p> Hi me </p>
        <p> Timer:${this.timer} </p>` ;
        
    }

    runTimer()
    {
        setInterval(()=>{
            this.timer =( typeof this.timer  === "string" ) ? parseInt( this.timer ) + 1 : this.timer + 1;
        }, 1000);
    }


}
customElements.define('my-element', MyElement);