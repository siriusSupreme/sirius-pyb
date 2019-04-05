<?php

namespace app\command;

use think\console\Command;
use think\console\Input;
use think\console\Output;

class Demo extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('demo');
        // 设置参数
        
    }

    protected function execute(Input $input, Output $output)
    {
    	// 指令输出
    	$output->writeln('demo');
    }
}
