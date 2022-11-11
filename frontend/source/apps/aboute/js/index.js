import {LitElement, html} from 'lit';

class MyElement extends LitElement {
    static properties = {
        timer: 1
    }


    constructor() {
        super();
    }
    render()
    {
        console.log('html : ', typeof _html );
        return html`<p> Hi me </p>
        <p> Timer: ${this.timer} </p>` ;
    }

    runTimer( pInit )
    {
        setInterval(()=>{
            this.timer = new Date();
        }, 1000);
    }


}
customElements.define('my-element', MyElement);