setlocal enabledelayedexpansion
@echo off

rem transform svg into different size pngs using inkscape and create an ico using imagemagick

set name=logo

set THISDIR=%~dp0
set THISDIR=%THISDIR:~,-1%

set inkscape="%tools%\Programs\inkscape\inkscape.exe"
set imagemagick="%tools%\Programs\ImageMagick\magick.exe"

set generated=%THISDIR%\generated

if exist "%generated%" (
    rmdir /S /Q "%generated%"
    mkdir "%generated%"
)

set images=
set sizes=16 32 48 64 128 256 512 1024

rem create pngs
for %%s in (%sizes%) do (
    set size=%%s
    set image="%generated%/%name%-!size!.png"
    set images=!images! !image!
    set command=%inkscape% -z "%THISDIR%/%name%.svg" -w !size! -h !size! -e !image!
    echo !command!
    call !command!
)

rem create ico
set command=%imagemagick% convert !images! "%generated%/%name%.ico"
echo !command!
call !command!
