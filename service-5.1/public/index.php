<?php


  use think\Container;

  require __DIR__ . '/../thinkphp/base.php';

  Container::get( 'app')->run()->send();
