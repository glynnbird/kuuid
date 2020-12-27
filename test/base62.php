<?php
include('simple-php-unit-test/simple-php-unit-test.php');
//require_once "../lib/base62.php";
require_once "../lib/Base62Proxy.php";

//function assert($input,$expect){
//    return expect($input)->to_equal($expect);
//}

class assert
{

    static function strictEqual($input, $expect)
    {
        return expect($input)->to_equal($expect);
    }
}

//$assert=new _assert();


$spec = new SimplePHPUnitTest();

$spec->describe('should encode 0 correctly', function () {
    $n = 0;
    $x = Base62Proxy::encode($n);
    assert::strictEqual($x, '0');
});

$spec->describe('should encode 1 correctly', function () {
    $n = 1;
    $x = Base62Proxy::encode($n);
    assert::strictEqual($x, '1');
});

$spec->describe('should run out of numbers at 10', function () {
    $n = 10;
    $x = Base62Proxy::encode($n);
    assert::strictEqual($x, 'A');
});

$spec->describe('should run out of lowercase letters at 36', function () {
    $n = 36;
    $x = Base62Proxy::encode($n);
    assert::strictEqual($x, 'a');
});

$spec->describe('should wrap at 62', function () {
    $n = 62;
    $x = Base62Proxy::encode($n);
    assert::strictEqual($x, '10');
});

$spec->describe('should encode big number correctly', function () {
    $n = 199919991999;
    $x = Base62Proxy::encode($n);
    assert::strictEqual($x, '3WDjuZz');
});

$spec->describe('should encode biggest integer correctly', function () {
    $n = 9007199254740991; // 2^53 -1 or Number.MAX_SAFE_INTEGER
    $x = Base62Proxy::encode($n);
    assert::strictEqual($x, 'fFgnDxSe7');
});

$spec->describe('should ignore negative numbers', function () {
    $n = -1;
    $x = Base62Proxy::encode($n);
    assert::strictEqual($x, '');
});


$spec->start();
