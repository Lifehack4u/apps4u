import { allDatasources } from "../../_container";
import { error } from "../utils";

export default class DOM 
{
    $elements = null;
    ds = null;
    constructor( pArg )
    {
        if( pArg ){
            if( pArg instanceof HTMLElement ) this.$elements = [pArg];
            else this.$elements = document.querySelectorAll( pArg );
        }
        return this;
    }

    style( pKey, pValue ) {
        if( typeof pKey === 'string' ) {
            this.each( ( _el, _index )=>{
                _el.style[ pKey ] = pValue;
            });
        }else if( typeof pKey === 'object' && pKey instanceof Object ) {
            this.each( ( _el, _index )=>{
                for( const[ k, v ] of Object.entries( pKey ) ) {
                    _el.style[ k ] = v;
                }
            });
        }

        return this;
    }

    append( pArg )
    {
        if( pArg instanceof DOM || pArg instanceof HTMLElement ) {
            this.each( function(_el, _index){
                if( pArg instanceof HTMLElement ) _el.appendChild(  pArg  );
                else {
                    pArg.each( function(__el, __index){
                        _el.appendChild( __el );
                    });
                }
            });
        }else{
            return error(2000, 'The elment is not a DOM element');
        }
    }

    addClass( pArg )
    {
        if( typeof pArg !=='string' ) return error(2000, `The class name can not be a type of ${ typeof pArg }`);
        this.each( function( _el, _index ){
            _el.classList.add( pArg );
        });
    }

    removeClass( pArg )
    {
        if( typeof pArg !=='string' ) return error(2000, `The class name can not be a type of ${ typeof pArg }`);
        this.each( function( _el, _index ){
            _el.classList.remove( pArg );
        });
    }

    attr( pKey, pValue )
    {
        if( pKey && pValue ) {
            this.$elements[0].setAttribute( pKey, pValue);
            return this;
        }
        if( pKey && !pValue ) {
            return this.$elements[0].getAttribute( pKey );
        }
    }

    val( pArg )
    {
        this.each( ( _el, _index )=>{
            if( _el instanceof HTMLInputElement ) {
                if( _el.getAttribute('type') && _el.getAttribute('type') === "checkbox" ) _el.checked = pArg;
                else _el.value = pArg;
            }else {
                _el.innerText = pArg;
            }
        })
    }

    el()
    {
       if( this.$elements  ) return this.$elements[0];
       else return false; 
    }
    on( pEvent, pCallback )
    {
        this.each( ( _el, _index)=>{
            console.log('on el : ', _el );
            console.log('on el pEvent : ', pEvent );
            _el.addEventListener( pEvent, pCallback );
        })
    }

    find( pArg)
    {
        return new DOM( pArg );
    }

    each( pCallback ) {
        for( let i = 0; i < this.$elements.length; i++ ) {
            pCallback(this.$elements[ i ], i);
        }
    }


    attrs2Obj()
    {
        let obj = {};
        for( const[ k, v ] of  Object.entries( this.$elements[0].attributes ) ) {
            let _v = v.value;
            if( typeof _v === "string" ) {
                if( _v.length === 0 || _v === 'false' ) _v = false;
                else if( _v === 'true' ) _v = true;
            }
            if( typeof _v === 'number' ) {
                if( _v === 0 ) _v = false;
                else if( _v === 1) _v = true;
            }

            let arr = v.name.split('-');
            let k = arr[ 0 ];

            for( let i = 1; i > arr.length; i++ ) {
                k += arr[ i ].charAt(0).toUperCase() + arr[ i ].slice(1);
            }

            obj[ k.trim() ] = _v ;
        }

        return obj;
    }
}