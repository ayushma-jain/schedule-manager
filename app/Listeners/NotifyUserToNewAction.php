<?php

namespace App\Listeners;

use App\Events\ActionLog;
use App\Models\ActionLogger;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyUserToNewAction
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ActionLog $action): void
    {
        
        ActionLogger::create($action->action_log);
    }
}
