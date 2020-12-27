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

define("SLEEPTIME_IN_SEC", 3);

require_once "../kuuid.php";


$spec->describe('should return 32 character id', function () {
    $x = kuuid::id();
    echo "$x\n";
    assert::strictEqual(strlen($x), 32);
});


$spec->describe('should return ids that sort correctly', function () {
    sleep(SLEEPTIME_IN_SEC);
    $ids = [];
    for (; ;) {
        $ids[] = $x=kuuid::id();
        echo "$x\n";
        if (count($ids) === 20) {
            echo("\n");
            $ids_copy = $ids;
            sort($ids_copy);
            $j1 = json_encode($ids_copy, JSON_PRETTY_PRINT);
            $j2 = json_encode($ids, JSON_PRETTY_PRINT);
            // make sure sorting has had no effect i.e. they were sorted already
            assert::strictEqual($j1, $j2);
            break;
        } else {
            echo('.');
        }
        usleep(1100);
    }

});


$spec->describe('should return ids that sort correctly - reverse mode', function () {
    sleep(SLEEPTIME_IN_SEC);
    $ids = [];
    for (; ;) {
        $ids[] = kuuid::idr();
        if (count($ids) === 20) {
            echo("\n");
            $ids_copy = $ids;
            rsort($ids_copy);
            $j1 = json_encode($ids_copy, JSON_PRETTY_PRINT);
            $j2 = json_encode($ids, JSON_PRETTY_PRINT);
            // make sure sorting has had no effect i.e. they were sorted already
            assert::strictEqual($j1, $j2);
            break;
        } else {
            echo('.');
        }
        usleep(1100);
    }

});

$spec->describe('should return unique ids', function () {
    sleep(SLEEPTIME_IN_SEC);
    $ids = [];
    for ($i = 0; $i < 10000; $i++) {
        $k = kuuid::id();
        assert::strictEqual(false, in_array($k, $ids));
        $ids[] = $k;
    }
});

$spec->describe('should take a user-supplied timestamp', function () {
    $id = kuuid::id('2018-01-01T00:00:00.000Z');
    $prefix1 = substr($id, 0, 8);
    $prefix2 = kuuid::prefix('2018-01-01T00:00:00.000Z');
    assert::strictEqual($prefix1, '001eVnWK');
    assert::strictEqual($prefix2, $prefix1);
});

$spec->describe('should generate prefix for the epoch', function () {
    $prefix = kuuid::prefix('1970-01-01T00:00:00.000Z');
    assert::strictEqual($prefix, '00000000');
});

$spec->describe('should generate prefix for the epoch + 1 year', function () {
    $prefix = kuuid::prefix('1971-01-01T00:00:00.000Z');
    assert::strictEqual($prefix, '00028JxA');
});

$spec->describe('should generate prefix for the epoch + 10 year', function () {
    $prefix = kuuid::prefix('1980-01-01T00:00:00.000Z');
    assert::strictEqual($prefix, '000LLwUi');
});

$spec->describe('should generate prefix for the epoch + 50 year', function () {
    $prefix = kuuid::prefix('2020-01-01T00:00:00.000Z');
    assert::strictEqual($prefix, '001imRQe');
});

$spec->describe('should generate prefix for the epoch + 200 year', function () {
    $prefix = kuuid::prefix('2170-01-01T00:00:00.000Z');
    assert::strictEqual($prefix, '006t88C8');
});

$spec->describe('should generate prefix with a numerical offset', function () {
    $prefix = kuuid::prefix(1514764800000);
    assert::strictEqual($prefix, '001eVnWK');
});

$spec->describe('should generate reverse prefix for the epoch', function () {
    $prefix = kuuid::prefixReverse('1970-01-01T00:00:00Z');
    assert::strictEqual($prefix, 'zzzzzzzz');
});

$spec->describe('should generate reverse prefix for the epoch + 1', function () {
    $prefix = kuuid::prefixReverse('1970-01-01T00:00:01Z');
    assert::strictEqual($prefix, 'zzzzzzzy');
});

$spec->describe('should generate random data', function () {
    sleep(SLEEPTIME_IN_SEC);
    $ids = [];
    for ($i = 0; $i < 10000; $i++) {

        $k = kuuid::rand();

        assert::strictEqual(false, in_array($k, $ids));
        $ids[] = $k;
    }
});

$spec->describe('should return ids that sort correctly - short', function () {
    sleep(SLEEPTIME_IN_SEC);
    $ids = [];
    for (; ;) {
        $ids[] = kuuid::ids();
        if (count($ids) === 20) {
            echo("\n");
            $ids_copy = $ids;
            sort($ids_copy);
            $j1 = json_encode($ids_copy, JSON_PRETTY_PRINT);
            $j2 = json_encode($ids, JSON_PRETTY_PRINT);
            // make sure sorting has had no effect i.e. they were sorted already
            assert::strictEqual($j1, $j2);
            break;
        } else {
            echo('.');
        }
        usleep(1100);
    }

});

$spec->describe('should return ids that sort correctly - short reverse mode', function () {
    sleep(SLEEPTIME_IN_SEC);
    $ids = [];
    for (; ;) {
        $ids[] = kuuid::idsr();
        if (count($ids) === 20) {
            echo("\n");
            $ids_copy = $ids;
            rsort($ids_copy);
            $j1 = json_encode($ids_copy, JSON_PRETTY_PRINT);
            $j2 = json_encode($ids, JSON_PRETTY_PRINT);
            // make sure sorting has had no effect i.e. they were sorted already
            assert::strictEqual($j1, $j2);
            break;
        } else {
            echo('.');
        }
        usleep(1100);
    }

});

$spec->start();
