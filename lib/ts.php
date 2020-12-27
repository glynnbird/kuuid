<?php
// generate a timestamp - number of seconds since the epoch


date_default_timezone_set('Europe/Paris');

function ts($t=null){
    // current Unix timestamp

if(is_string($t))
     $d= $t?strtotime($t)*1000:time();
else
    if(is_numeric($t))
        $d=$t;
else
    $d=time()*1000;

    return intval(floor( $d/ 1000 ));

//    const d = t ? new Date(t) : new Date()

}
