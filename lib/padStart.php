
<?php

function padStart ($string,$targetLength, $padString='0') {
  $encoded = str_pad($string, $targetLength, $padString, STR_PAD_LEFT);
return $encoded;
}

