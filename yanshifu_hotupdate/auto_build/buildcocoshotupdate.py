# -*- coding: utf-8 -*-
from __future__ import print_function
import os
import sys
import oss2
import datetime
import ConfigParser
import pytoml as toml
import shutil
import zipfile
import paramiko
import requests
import json

from os.path import join, getsize
config = ConfigParser.RawConfigParser()
ROOT = os.path.dirname(os.path.realpath(__file__))
if os.path.exists(os.path.join(ROOT,"../prod.toml")):
    with open(os.path.join(ROOT,"../prod.toml"), 'rb') as fin:
        config = toml.load(fin)
else:
    with open(os.path.join(ROOT,"../prod.toml"), 'rb') as fin:
        config = toml.load(fin)

def buildVersionNative():
    a="-v "+version+" -u http://"+ip+"/remote-assets/ -s "+ppath+"/build/jsb-link -d ../remote-assets_"+version+"/remote-assets"
    s = """
        node ./version_generator.js %s
    """ % (a)
    os.system(s)

def buildVersionHbuilder(gamename):
    a = "-v "+version+" -u http://"+ip+"/remote-assets_"+gamename + \
        "/ -s "+ppath+"/build/jsb-link -d ../remote-assets_" + \
        gamename+"_"+version+"/remote-assets_"+gamename+" --index " + gamename
    s = """
        node ./version_generator_child.js %s
    """ % (a)
    os.system(s)


def buildCreator(btype,versioncreator):
    build = "--path "+ppath+" --build platform="+btype+";debug=false;autoCompile=true"
    compile = "--path "+ppath+" --compile platform="+btype+";debug=false"
    basepath = "/Applications/CocosCreator/Creator/"+versioncreator

    b = """
        %s/CocosCreator.app/Contents/MacOS/CocosCreator %s
        """ % (basepath,build)
    print(b)
    os.system(b)
    if btype=='ios':
        c = """
            %s/CocosCreator.app/Contents/MacOS/CocosCreator %s
        """ % (basepath,compile)
        os.system(c)
def buildNative(version,ppath,versioncreator):
    print('打包native')
    if not os.path.exists(os.path.join(ROOT, '../remote-assets_'+version)):
        os.mkdir(os.path.join(ROOT, '../remote-assets_'+version))
    pass
    buildCreator('ios',versioncreator)
    buildVersionNative()
    c = """
            sh ./buildcocos_native.sh %s %s
        """ % (ppath,version)
    os.system(c)
def buildWeb(versioncreator,ppath,classNum):
    if not os.path.exists(os.path.join(ROOT, '../remote-assets_'+version)):
        os.mkdir(os.path.join(ROOT, '../remote-assets_'+version))
    pass
    buildCreator('web-mobile',versioncreator)
    c = """
        sh ./buildcocos_web.sh %s %s %s
        """ % (ppath,version,classNum)
    os.system(c)
    print('打包Web')
def buildHbuilder(gamename,version,ppath,versioncreator):
    if not os.path.exists(os.path.join(ROOT, '../remote-assets_'+gamename+"_"+version)):
        os.mkdir(os.path.join(ROOT, '../remote-assets_'+gamename+"_"+version))
    pass
    buildCreator('ios')
    buildVersionHbuilder(gamename)
    c = """
        sh ./buildcocos_child.sh %s %s %s
    """ % (version,gamename,ppath)
    os.system(c)

    print('打包Hbuilder')

def zip_file(src_dir):
    zip_name = src_dir +'.zip'
    z = zipfile.ZipFile(zip_name,'w',zipfile.ZIP_DEFLATED)
    for dirpath, dirnames, filenames in os.walk(src_dir):
        fpath = dirpath.replace(src_dir,'')
        fpath = fpath and fpath + os.sep or ''
        for filename in filenames:
            z.write(os.path.join(dirpath, filename),fpath+filename)
            
    z.close()
    print ('==压缩成功==')

def percentage(consumed_bytes, total_bytes):
    if total_bytes:
        rate = int(100 * (float(consumed_bytes) / float(total_bytes)))
        print('\r{0}% '.format(rate), end='')
        sys.stdout.flush()

def shangchuan(version, classNum):
    AccessKeyId="LTAI4Fm8o7swGZCpbfMd7qdj"
    AccessKeySecret="giMR0Yx1e3udUjM0cJJzg5iNycqa0O"
    Endpoint="oss-cn-beijing.aliyuncs.com"
    _bucket="cocos-games-yu"
    iphot="cocos-games-yu.oss-cn-beijing.aliyuncs.com"

    print('连接阿里云oss服务器')
    print(AccessKeyId)
    print(AccessKeySecret)
    print(Endpoint)
    print(_bucket)
    auth = oss2.Auth(AccessKeyId, AccessKeySecret)
    service = oss2.Service(auth, Endpoint)
    bucket = oss2.Bucket(auth, Endpoint, _bucket)
    print('-----------连接阿里云oss服务器成功-----------')

    version_dir = os.path.join(ROOT, '../remote-assets_'+version)
    # 遍历所有的子目录进行上传
    for (root, dirs, files) in os.walk(version_dir):
        for filename in files:
            fpath = os.path.join(root, filename)
            fdir, fname = os.path.split(fpath)
            if not os.path.isdir(fpath) and not fname.startswith("."):
                subpath = fpath.replace(version_dir, "")
                if subpath.startswith("/"):
                    subpath = subpath.replace("/", '', 1)

                with open(fpath, 'rb') as fileobj:
                    bucket.put_object(subpath, fileobj.read(),
                    progress_callback=percentage)
                pass

if True:
    classNum = "11"
    version = raw_input("请输入版本号:")
    ppath = os.path.abspath(os.path.join(os.getcwd(), "../.."))
    print(ppath)
    versioncreator = '2.4.3'
    buildWeb(versioncreator,ppath.strip(), classNum)
    print("-----------打包完成-----------")
    shangchuan(version, classNum)
    print("-----------上传阿里云成功-----------")
    
