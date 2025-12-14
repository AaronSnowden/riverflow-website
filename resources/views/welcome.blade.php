<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <link rel="icon" type="image/x-icon" href="{{ asset('logo-0.jpg') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('logo-0.jpg') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('logo-0.jpg') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('logo-0.jpg') }}">

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>STIA - Science Teaching & Innovations Africa</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
