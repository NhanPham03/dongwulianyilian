#!/bin/bash
#打热更新服务器
echo 项目路径:$1
echo 项目版本:$2
echo 课程序号:$3
cp -r ../../build/templateShowAll/* ../../build/web-mobile/

targetpath=remote-assets_$2/dongwulianyilian
mkdir -p ../$targetpath
echo 目标路径:$targetpath
cp -rf $1/build/web-mobile/* ../$targetpath
# zip -q -r -m -o ../$targetpath'.zip' ../$targetpath
