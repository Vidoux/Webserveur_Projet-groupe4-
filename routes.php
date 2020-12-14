<?php
// Define the routes available in the application. The keys are the patterns,
// and are regular expressions to allow matching with the request URI. T'he
// values are of the form `Controller@action`, which allows for a controller to
// handle multiple actions.
return [
    '/login' => 'Controller\Users@login',
    '/' => 'Controller\Home@get',
    '/loginerror' => 'Controller\Users@error',
];
