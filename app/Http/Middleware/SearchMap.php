<?php

namespace App\Http\Middleware;

use Closure;


class Searchmap
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ( \Auth::check() && \Auth::user()->user_type == "3" )
        {

            return $next($request);
        }
        if (\Auth::user()->user_type=="3"){
            return redirect("/CALLCENTER");
        }

        return redirect('/CALLCENTER');
    }
}
