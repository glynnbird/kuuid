<?php
// generate a timestamp - number of seconds since the epoch



function tsms($t=null){

    if(is_string($t))
        $d= strtotime($t)*1000;
    else
        if(is_numeric($t))
            $d=$t;
        else
            $d=microtime(true);

    return intval(floor( $d/ 1000 ));

    // current Unix timestamp
  //  return floor(microtime(true)/ 1000 );  // microtime returns timestamp with microseconds (param: true=float, false=string)


}
