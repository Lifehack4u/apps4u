import DOM from "./dom";

function $( pArg )
{
    return new DOM( pArg );
}

function create( pHtml )
{
    let  template = document.createElement('template');
    template.innerHTML = pHtml;
    return $( template.content.childNodes[0] );
}

export {
    $,
    create
}