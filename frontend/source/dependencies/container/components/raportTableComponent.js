import { initNode } from "../container";
import { attrsToOptions, htmlToElement } from "../lib/utils";
/**
 * @class RaportTableComponent
 */
export default class RaportTableComponent extends HTMLElement {

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
 * @attr r-el-id - 
 * @atrr b-classes - A whitespace separeted string. Those class names will be applied to the component node.
 * 
 * @param HTMLElement - An instance of the HTMLElement which is the component node.
 * @return {name: function} rObj - a sealed object returned by the function.
 */

function Instance( pNode )
{
    let node = pNode;
    let options = attrsToOptions( pNode.attributes );

    let template = node.getElementByTagName('template');
    if( template.length === 0 ) {
        // return error
        return;
    }
    template = template[0];
    
    // The main container for the form
    let formContainer = htmlToElement(`
                                        <div 
                                            id=${options.id} 
                                            class=" af-form ${ (options.bClasses) ? options.bClasses : '' }" 
                                        ></div>`);
    if( options.style ) {
        formContainer.setAttribute('style', options.style )
    }


    // Replace the component origin elemnet with the formContainer
    pNode.parentNode.replaceChild( formContainer, pNode );


    return Object.seal({

    })
}