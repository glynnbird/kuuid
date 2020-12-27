<?php
include('simple-php-unit-test/simple-php-unit-test.php');
class assert
{

    static function strictEqual($input, $expect)
    {
        return expect($input)->to_equal($expect);
    }

    static function is_true($input)
    {
        return expect($input)->is_true();
    }

}
$spec = new SimplePHPUnitTest();


require_once "../lib/ts.php";
 
  $spec->describe('should return the current timestamp', function () {
    $t1 = ts();
    $t2 = floor(time()/ 1000 );
    $diff = abs($t2 - $t1);
    $lessThanASecond = ($diff < 1);
    assert::is_true($lessThanASecond);
  });

    $spec->describe('should return timestamp given string date', function () {
    $t1 = ts('2018-01-01');
    //s'il y a une diff c'est une question de TZ
    assert::strictEqual($t1, 1514764800);
  });

    $spec->describe('should return timestamp given number of milliseconds', function () {
    $t1 = ts(99000);
    assert::strictEqual($t1, 99);
  });



$spec->start();
