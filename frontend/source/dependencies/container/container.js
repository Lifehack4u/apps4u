import { Datasource } from './datasource';
import { error, uuidv4, elID } from './utils';
import { get } from './helpers/http';

let components = {};
let controllers = {};
let views = {};

let allDatasources = {};
let pendingBindings = {};
let allNodes = {};
const isDeveloper = true;




function subscribe( pSubscription, pFun )
{
  if( !subscriptions[ pSubscription ] ){
    error(` Subscription ${pSubscription} does not exist!`);
    return;
  }
  subscriptions[ pSubscription ].push( pFun );
}

function fire( pSubscription , ...pArgs )
{
  if( !subscriptions[ pSubscription ] ){
    error(` Subscription ${pSubscription} does not exist!`);
    return;
  }
  subscriptions[ pSubscription ].forEach((_fun)=>{
    _fun.call(null, ...pArgs );
  })
}

function registerController( p_controller )
{

}

function registerComponent( p_component )
{

}

function componentMutationCallback( p_mutationlist, p_observer )
{
  console.log(" observer : ", p_observer);
  console.log(" p_mutationlist : ", p_mutationlist);
  for( const mutation of p_mutationlist ) {
    switch( mutation.type ) {
      case "attribute":
        console.log(" attribute changed ");
        break;
    }
  }
}


function getDs( pDsName )
{
  return window[ pDsName ];
}

export {
  Container,
  addComponent,
  initNode,
  allDatasources,
  getDs
}
