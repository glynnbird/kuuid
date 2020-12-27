<?php


/*

Copyright (c) 2011 Anthony Ferrara
Copyright (c) 2016-2018 Mika Tuupola

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

/**
 * @see       https://github.com/ircmaxell/SecurityLib/tree/master/lib/SecurityLib
 * @see       https://github.com/tuupola/base62
 * @license   https://www.opensource.org/licenses/mit-license.php
 */
class Base62_PhpEncoder
{
    const GMP = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const INVERTED = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


    private $characters = self::GMP;


    /**
     * Encode given data to a base62 string
     */
    public function encode($data) // : string
    {
        if(is_integer($data)) return $this->encodeInteger($data);
        $data = str_split($data);
        $data = array_map("ord", $data);

        $leadingZeroes = 0;
        while (!empty($data) && 0 === $data[0]) {
            $leadingZeroes++;
            array_shift($data);
        }
        $converted = $this->baseConvert($data, 256, 62);
        if (0 < $leadingZeroes) {
            $converted = array_merge(
                array_fill(0, $leadingZeroes, 0),
                $converted
            );
        }
        return implode("", array_map(function ($index) {
            return $this->characters[$index];
        }, $converted));
    }

    /**
     * Decode given a base62 string back to data
     */
    public function decode($data) // : string
    {
        $this->validateInput($data);

        $data = str_split($data);
        $data = array_map(function ($character) {
            return strpos($this->characters, $character);
        }, $data);

        $leadingZeroes = 0;
        while (!empty($data) && 0 === $data[0]) {
            $leadingZeroes++;
            array_shift($data);
        }

        $converted = $this->baseConvert($data, 62, 256);

        if (0 < $leadingZeroes) {
            $converted = array_merge(
                array_fill(0, $leadingZeroes, 0),
                $converted
            );
        }

        return implode("", array_map("chr", $converted));
    }

    private function validateInput($data) // : void
    {
        /* If the data contains characters that aren't in the character set. */
        if (strlen($data) !== strspn($data, $this->characters)) {
            $valid = str_split($this->characters);
            $invalid = str_replace($valid, "", $data);
            $invalid = count_chars($invalid, 3);

            throw new InvalidArgumentException(
            /** @phpstan-ignore-next-line */
                "Data contains invalid characters \"{$invalid}\""
            );
        }
    }

    /**
     * Encode given integer to a base62 string
     */
    public function encodeInteger($data) // : string
    {
        $data = [$data];

        $converted = $this->baseConvert($data, 256, 62);

        return implode("", array_map(function ($index) {
            return $index>=0? $this->characters[$index]:"";
        }, $converted));
    }

    /**
     * Decode given base62 string back to an integer
     */
    public function decodeInteger($data) // : int
    {
        $this->validateInput($data);

        $data = str_split($data);
        $data = array_map(function ($character) {
            return strpos($this->characters, $character);
        }, $data);

        $converted = $this->baseConvert($data, 62, 10);
        return (integer) implode("", $converted);
    }

    /**
     * Convert an integer between artbitrary bases
     *
     * @see http://codegolf.stackexchange.com/a/21672
     */
    public function baseConvert($source, $sourceBase, $targetBase) // : array
    {
        $result = [];
        while ($count = count($source)) {
            $quotient = [];
            $remainder = 0;
            for ($i = 0; $i !== $count; $i++) {
                $accumulator = $source[$i] + $remainder * $sourceBase;
                /* Same as PHP 7 intdiv($accumulator, $targetBase) */
                $digit = ($accumulator - ($accumulator % $targetBase)) / $targetBase;
                $remainder = $accumulator % $targetBase;
                if (count($quotient) || $digit) {
                    $quotient[] = $digit;
                }
            }
            array_unshift($result, $remainder);
            $source = $quotient;
        }

        return $result;
    }
}
