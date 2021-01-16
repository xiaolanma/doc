#!/bin/bash

#python3 -m venv venv

#echo 'Create virtualenv.'

#source $PWD/venv/bin/activate

python3 -m pip install -r requirements.txt

echo 'Project initialization is complete!'

#检查程序是否在运行
is_exist(){
     proc_id=`ps -ef | grep runserver | grep -v grep | awk '{print $2}'`
     if [ -n "$proc_id" ];then
            echo 'kill weblmt,process id '$proc_id
            for i in $proc_id
                   do
                      echo 'kill '$i
                      kill -9 $i
                   done
     fi
}

echo '#################Start the WEBLMT############################'
is_exist
nohup python3 manage.py runserver 172.21.6.176:8000 --noreload &
