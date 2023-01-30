import { error } from './utils';

function Datasource( p_options )
{
    if( !p_options.retrive || !p_options.update || !p_options.create || !p_options.destroy ) {
        return error(1001, "Some of CRUD urls is not provided!");
    }
    let vName = p_options.name;
    let vOptions = p_options;
    let perPage = ( p_options.per_page ) ? p_options.per_page : 50;
    let currentPage = 0;
    let store = [];
    let $currentIndex = 0;
    let fields = ( p_options.fields ) ? p_options.fields : [];
    let allowCreate = ( p_options.allow_create ) ? p_options.allow_create : false;
    let allowUpdate = ( p_options.allow_update ) ? p_options.allow_update : false;
    let allowDestroy = ( p_options.allow_destroy ) ? p_options.allow_destroy : false;
    let subscriptions = {
        "indexChanged":[],
        "dataRetrived": [],
        "recordAdded": [],
        "recordCreated": [],
        "recordDestroyed": [],
        "recordUpdated": []
    }

    /**
     * CRUD
     * METHOD : POST
     * BODY : { ds_name:'ds name', args:' arguments ' }
     * configUrl : base_url+'datasource/config'
     *              args: null
     * rowCountUrl : base_url+'datasource/row_count'
     *              args: null
     * retrieveUrl : base_url+'datasource/create'
     *               args:Record
     * retrieveUrl : base_url+'datasource/retrive'
     *              args:{'per_page':10, 'page': 2, 'filter': ''}
     * updateUrl : base_url+'datasource/update'
     *              args:{field: value, id: 123 }
     * destroyUrl : base_url+'datasource/destroy'
     *              args:{ id: 33232 }
     */
    let crudUrls = {
        
    }
    //Implement the CRUD operations
    function create( pRecord )
    {
        if( !allowCreate ) return error(`Create a new record is not allowed.`);

        checkRecordCompatibilty( pRecord );
        if( vOptions.base_url ) {
            fetch( vOptions.base_url+'datasource/create',{
                method:'POST',
                body: JSON.stringify( {ds_name: vName, args: pRecord} )
            })
            .then(res=>{
                res.json()
            })
            .then(data=>{
                add( data )
            })
            .catch(err=>{
                error( err );
            })
        }else{
            add( pRecord );
        }
    }

    function retrive()
    {
        currentPage++;
        fetch('api/ds/retrive',{
            method:'POST',
            body: JSON.stringify( {ds_name: vName, args: {per_page: perPage, page: currentPage }} )
        })
        .then(res=>{
            res.json()
        })
        .then(data=>{
            data.forEach(_r=>{
                add( _r )
            });
            
        })
        .catch(err=>{
            error( err );
            currentPage--;
        })
    }


    function checkRecordCompatibilty( pRecord )
    {
        if( fields.length === 0 ) return error(1000, "No fields were set.");
        // Check data type
        let msgs = [];
        for( const[k,v] of Object.entries( pRecord ) ) {
            let f  = getFieldByName( k );
            if( !f ) {
                msgs.push(`Field ${k} does not exist.`);
                break;
            }
            if( f.data_type !== typeof v ) msgs.push(`The field ${k} must be of type ${ f.data_type } `);
        }
        if( msgs.length > 0 ) return error(1000, msgs );
    }

    function setFields( pFields )
    {
        pFields.forEach(function(_f){
            setField( _f );
        })
    }

    function setField( pField )
    {
        let f = fields.find(function(_f){ return _f.name === pField.name });
        if( f ) return error(10003, "Field allready exists.") ;
        if( !pField['name'] ) return error(10003, "The filed must have a name.") ;
        if( !pField['data_type'] ) return error(10003, "The field must have a data_type.") ;

        fields.push( pField );
    }

    function add( pObject )
    {
        let r = new ObservableObject( pObject, this );
        r.subscribe('keyChanged', objKeyChanged );
        store.push( r );
        ///$currentIndex = store.length - 1;
        notify('recordAdded', [r] );
        ///notify('indexChanged', [ $currentIndex ]);
    }

    function getFieldByName( pName )
    {
        return fields.find(function(_f){ return _f.name === pName; })
    }

    /**
     * 
     * @param {string} pKey 
     * @param {any} pValue 
     */
    function isDatatypeCorrect( pKey, pValue )
    {
        if( !getFieldByName( pKey ) ) return false;
        return getFieldByName( pKey ).data_type === typeof pValue;
    }

    function subscribe( pSubscription, pSubscriber )
    {
        if( subscriptions[ pSubscription ] ) {
            subscriptions[ pSubscription ].push( pSubscriber );
        }
    }

    function notify( pSubscription, pArgs )
    {
        if( subscriptions[ pSubscription ] ) {
            subscriptions[ pSubscription ].forEach(function( _sub ){
                _sub.apply(null, pArgs );
            })
        }
    }

    function objKeyChanged( pKey, pOldval, pNewval)
    {
        notify( 'recordUpdated', [ $currentIndex, pKey, pOldval, pNewval ] );
    }

    function changeFromDom( pKey, pValue, pNode )
    {
        if( getCurrent( pKey ) ) {
            pNode.setAttribute('initiated-changing', pKey );
            getCurrent()[ pKey ] = pValue;
        }
    }

    function getCurrent( pKey )
    {
        if( pKey ) return store[ $currentIndex ].hasOwnProperty( pKey ); 
        else return store[ $currentIndex ];
    }

    function evalIF( pStmt)
    {
        let current = store[ $currentIndex ];
        return eval( pStmt );
    }

    function isCreateAllowed( pStatus )
    {
        if( pStatus && typeof pStatus === 'boolean' ) allowCreate = pStatus;
        return allowCreate;
    }

    function isUpdateAllowed( pStatus )
    {
        if( pStatus && typeof pStatus === 'boolean' ) allowUpdate = pStatus;
        return allowUpdate;
    }

    function isDestroyAllowed( pStatus )
    {
        if( pStatus && typeof pStatus === 'boolean' ) allowDestroy = pStatus;
        return allowDestroy;
    }

    function typeOf( pKey )
    {
        let f = getFieldByName( pKey );
        if( !f ) return error(1000, `No such field ${ pKey }`);
        return f.data_type;
    }

    let obj = {
        evalIF:evalIF,
        typeOf:typeOf,
        isCreateAllowed:isCreateAllowed,
        isUpdateAllowed:isUpdateAllowed,
        isDestroyAllowed:isDestroyAllowed,
        changeFromDom:changeFromDom,
        
        setFields:setFields,
        setField:setField,

        create:create,
        retrive:retrive,

        subscribe:subscribe,
        isDatatypeCorrect:isDatatypeCorrect,

        get store(){ return Array.of( store )[0]; },
        get currentIndex(){ return $currentIndex; },
        set currentIndex( pIndex ){
            if( typeof pIndex === 'number' && pIndex < store.length ) {
                $currentIndex = pIndex ;
                notify('indexChanged', [ pIndex ]);
            }
        },
        get current(){ return store[ $currentIndex ] }
    }

    return Object.seal( obj );
}


function ObservableObject( pObject, pDatasource )
{
    let _row = Object.create({});
    let row = Object.assign({}, pObject );
    let ds = pDatasource;

    let subscriptions =[
        "keyChanged"
    ];

    let subscribers = {};

    function notify( pSubscription, pArgs )
    {
        if( subscribers[ pSubscription ] ) {
            subscribers[ pSubscription ].forEach(function( _sub ){
                _sub.apply( null, pArgs );
            })
        }
    }

    Object.entries( pObject ).forEach(function( _kv ){
        Object.defineProperty( _row, _kv[0],{
            get(){ return row[ _kv[ 0 ] ] },
            set( pValue ){
                if( !ds.isDatatypeCorrect( _kv[0], pValue ) ) return error(`Data type of ${_kv[0]} is not correct!`);
                let oldValue = row[ _kv[0] ];  
                row[ _kv[0] ] = pValue;
                notify( 'keyChanged',  [_kv[0], oldValue, pValue] );
            }
        })
    });
    _row.subscribe = function( pSubscription, pSubscriber ) {
        if( subscriptions.includes( pSubscription ) ) {
            if( !subscribers[ pSubscription ] ) subscribers[ pSubscription ] = [];

            subscribers[ pSubscription ].push( pSubscriber );
        }
    }
    return _row;
}

export{
    Datasource,
    ObservableObject
}