setlocal enabledelayedexpansion
@echo off

rem transform svg into differnet size pngs using inkscape

set name=logo

set THISDIR=%~dp0
set THISDIR=%THISDIR:~,-1%

set inkscape="%tools%\Programs\inkscape\inkscape.exe"

set generated=%THISDIR%\generated

if exist "%generated%" (
    rmdir /S /Q "%generated%"
    mkdir "%generated%"
)

for %%s in (32 300) do (
    set size=%%s
    set command=%inkscape% -z "%THISDIR%/%name%.svg" -w !size! -h !size! -e "%generated%/%name%-!size!.png"
    echo !command!
    call !command!
)