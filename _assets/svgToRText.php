<?php
header("Content Type: text/plain");
$xml = simplexml_load_file("stations.svg");


foreach($xml->children() as $child) {
	if ($child->getName() == "text") {
		$matrix = $child->attributes();
		$matrix = str_replace(array("matrix(1 0 0 1 ", ")"), "", $matrix);
		
		$matrix = explode(" ", $matrix);
		
		
		printf('bb.tl.stations["%s"] = { x: %s, y: %s };<br>', trim(str_replace(array("%%", '’'), array('\n', "'"), $child), " "), $matrix[0], $matrix[1]);
	}
	
  // echo $child->getName() . ": " . $child . "<br />";
}

// $file = file_get_contents("stations.svg");
// 
// echo $file;

?>