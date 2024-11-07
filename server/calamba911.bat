
if not "%minimized%"=="" goto :minimized
set minimized=true
@echo off

start chrome --start-fullscreen --app=http://45.76.157.112/ -fullscreen

goto :EOF
:minimized