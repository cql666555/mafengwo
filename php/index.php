<?php

$num = $_GET['num'];

$res = file_get_contents('https://m.mafengwo.cn/?category=get_info_flow_list&page=0' . $num);

echo $res;
