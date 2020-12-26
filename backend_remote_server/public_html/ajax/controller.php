<?php
define("CONFIG_DATABASE_PATH",$_SERVER["DOCUMENT_ROOT"]."/../database/db.sqlite");
require("../../src/RequestHandler.php");

$application = new RequestHandler();
$application->RenderResponse();