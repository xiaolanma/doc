#!/bin/bash

echo "start build BBU isp code ..."
arg_num=$#

#clean 
make clean

#get build flags
if (($arg_num ==  0));  then
    echo "building plane..."
    make plane
elif (($arg_num == 1));  then
    if [[ $1 = DPLATFORM_PAL ]];  then
        echo "building plane_pal ..."
        make plane_pal DPLATFORM_PAL=YES
    fi
fi