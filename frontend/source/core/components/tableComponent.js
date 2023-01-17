import { initNode } from "../container";
import { attrsToOptions, htmlToElement } from "../lib/utils";
/**
 * @class FormComponent
 */
export default class FormComponent extends HTMLElement {

    constructor()
    {
        super();
    }

    connectedCallback()
    {
        console.log("form connected : ", this);
        
        initNode( this, Instance );
    }

    disconnectedCallback()
    {

    }

    adoptedCallback()
    {

    }

    attributeChangedCallback( name, oldValue, newValue )
    {
        console.log('attribute.'+ name + ' changed. From '+ oldValue +' To '+newValue);
    }

    static get observedAttributes()
    {
        return ['ds-name'];
    }

}

/**
 * @constructor Instance - This is the instance of the component.
 * 
 * @param HTMLElement - An instance of the HTMLElement which is the component node.
 * @return {name: function} rObj - a sealed object returned by the function.
 */

function Instance( pNode )
{
    let node = pNode;
    let options = attrsToOptions( pNode.attributes );


    function serialize()
    {

    }


    return Object.seal({
        serialize:serialize
    })
}