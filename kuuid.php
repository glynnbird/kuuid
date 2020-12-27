<?php

// kuuid.php

//require_once "lib/base62.php";
require_once __DIR__."/lib/Base62Proxy.php";
require_once "lib/ts.php";
require_once "lib/tsms.php";
require_once "lib/padStart.php";


class kuuid
{
    // generate a kuuid
    static function id($t=null)
    {
        return self::prefix($t) . self::rand();
    }

    // generate a kuuid (reverse mode)
    static function idr($t=null)
    {
        return self::prefixReverse($t) . self::rand();
    }

    // generate short id
    static function ids($t=null)
    {
        return self::prefixms($t) . self::rand(2);
    }

    static function idsr($t=null)
    {
        return self::prefixReverse($t) . self::rand(2);
    }


    // generate a kuuid with ms
    static function idms($t=null)
    {
        return self::prefixms($t) . self::rand();
    }

    static function rand($n = 4)
    {
        // we want 128-bits of random data. To do this we
        // add 4 batches of 4 random bytes encoded as 6-digit, base-62 encoded strings

        $randomStr = '';
        for ($i = 0; $i < $n; $i++) {
            //  $rand = crypto.randomBytes(4).toString('hex')
            $max = mt_getrandmax();
            $rand = dechex(mt_rand(0, 0xffff));

            $randomStr .= padStart(Base62Proxy::encode($rand), 6, '0');
        }
        return $randomStr;
    }

    // calculate an 8-digit prefix for the timestamp 't'
    // that is base62 encoded and sorts in time order
    static function prefix($t)
    {
        // get time stamp for now
        $timestamp = ts($t);

        // turn timestamp into 8-digit, base-62 encoded string
        return padStart(Base62Proxy::encode($timestamp), 8, '0');

    }

    // calculate an 8-digit prefix for the timestamp 't'
    // that is base62 encoded and sorts in time order
    // but with milliseconds
    static function prefixms($t)
    {
        // get time stamp for now
        $timestamp = tsms($t);


        // turn timestamp into 8-digit, base-62 encoded string
        return padStart(Base62Proxy:: encode($timestamp), 8, '0');
    }

    // calculate an 8-digit prefix for the timestamp 't'
    // that is base62 encoded and sorts in reverse time order
    static function prefixReverse($t)
    {
        // the maximum timestamp achievable (8 digits of base 62)
        $maxTS = pow(62, 8) - 1;

        // get time stamp for now
        $timestamp = $maxTS - ts($t);

        // turn timestamp into 8-digit, base-62 encoded string
        return padStart(Base62Proxy ::encode($timestamp), 8, '0');
    }

}
