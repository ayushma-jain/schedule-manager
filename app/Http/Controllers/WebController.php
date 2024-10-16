<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class WebController extends Controller
{
    public function home(Request $request) : Response {
        return Inertia::render('Web/Home', [
            // your props here
        ]);
    }
}
