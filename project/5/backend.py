# coding=utf-8
from flask import Flask, request
from flask_cors import CORS
import json
import sys

def mk_json( code, data ):
    return {
            "code":code,
            "data":data
        }

def success( data ):
    return mk_json(100, data)

data = [
        {"no":1, "name":"张三", "s1":99, "s2":83, "s3":99 },
        {"no":2, "name":"李四", "s1":79, "s2":75, "s3":80 },
        {"no":3, "name":"王五", "s1":83, "s2":85, "s3":90 },
        {"no":4, "name":"赵六", "s1":69, "s2":40, "s3":63 },
        {"no":99, "name":"庄体育", "s1":60, "s2":50, "s3":40 },
        ]

def student_exists(data, s):
    for stu in data:
        if s['no'] == stu['no']:
            return True
    return False

def remove_student(data, no):
    for index, stu in enumerate(data):
        if stu['no'] == no:
            data.pop(index)
            return True
    return False;

def show_data(data):
    for stu in data:
        print("{no}\t{name}\t{s1}\t{s2}\t{s3}".format_map(stu))

app = Flask(__name__)
CORS(app,resources={r'/*':{'origins':"*"}})

@app.route("/")
def index():
	return "<h1>服务器正在运行，API接口请RTFM</h1>"

@app.route("/get")
def get_data():
    return success(data)

@app.route("/add", methods=['POST'])
def add_one_item():
    try:
        s = json.loads(request.get_data())
        s['no'] = int(s['no'])
        s['s1'] = int(s['s1'])
        s['s2'] = int(s['s2'])
        s['s3'] = int(s['s3'])
    except:
        print("参数错误：{}".format(request.get_data()))
        import traceback
        t, v, tb = sys.exc_info()
        msg = ""
        for line in traceback.format_exception( t, v, tb ):
            msg += line
        print(msg)
        return mk_json(101, "添加失败，参数错误！")
    if student_exists(data, s):
        print("添加失败，学号已存在")
        return mk_json(101, "添加失败，学号已存在")
    data.append(s)
    data.sort(key=lambda x:x['no'])
    show_data(data)
    return success("添加成功")

@app.route("/remove",methods=['POST'])
def remove_one_item():
    try:
        s = json.loads(request.get_data())
        if remove_student( data, int(s['no'])):
            show_data(data)
            return success("删除成功")
        else:
            print("删除失败，不存在该学号")
            return mk_json(201, "删除失败，不存在该学号")
    except:
        print("执行失败，有可能是参数错误：{}".format(request.get_data()))
        import traceback
        t, v, tb = sys.exc_info()
        msg = ""
        for line in traceback.format_exception( t, v, tb ):
            msg += line
        print(msg)
        return mk_json(202, "删除失败，参数错误！")

if __name__ == "__main__":
	app.run()
