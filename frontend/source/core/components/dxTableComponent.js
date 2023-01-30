import { allDatasources, initNode } from "../container";
import { attrsToOptions, elID } from "../utils";
/**
 * @class FormComponent
 */
export default class dxTableComponent extends HTMLElement {

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
        if( name === "id" ) return false;
    }

    static get observedAttributes()
    {
        return ['ds-name', 'id'];
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
    console.log('dxTableComponent node initiated pNode : ', pNode.attributes );
    console.log('dxTableComponent node initiated DevExpress : ', DevExpress );
    let node = $( pNode );
    let options = attrsToOptions( pNode.attributes );
    console.log("options : ", options );
    let ds = null;

    /**  element */
    let tableNodeId = elID();
    let tableNode = $('<div></div>');
    node.append( tableNode );

    /** Columns */
    let colsNode = node.find('columns')[0];
    let columns = ( colsNode ) ? getColumnsFromHtml( colsNode ) : [];
    if( colsNode ) $(colsNode).remove();

    /** Initiate the grid */
    console.log(`dxTableComponent node initiated columns : `, columns );

    options = Object.assign( options, {
        dataSource:[],
        columns: columns
    })
    console.log("options : ", options );
    let table = $(tableNode).dxDataGrid( options ).dxDataGrid('instance');

    console.log(`dxTableComponent node initiated table : `, table );

    function getColumnsFromHtml( pNode )
    {
        let col = Array.from( pNode.getElementsByTagName('column') );
        let cols = [];
        col.forEach((_col)=>{
            cols.push( attrsToOptions( _col.attributes ) );
        });

        return cols;
    }


    function serialize()
    {

    }

    /** Default methods */
    function bindDatasource()
    {

    }

    return Object.seal({
        serialize:serialize,
        bindDatasource:bindDatasource,
        get ds(){ return ds; },
        get dsName(){ return options.dsName; }
    });
}