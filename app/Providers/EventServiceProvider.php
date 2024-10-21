<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Events\ActionLog;
use App\Listeners\NotifyUserToNewAction;

class EventServiceProvider extends ServiceProvider
{
    protected $action = [
        ActionLog::class => [
            NotifyUserToNewAction::class,
        ]
    ];
}
