智慧图书馆数字资源平台 · 源代码说明
====================================

一、依赖
    Python 3.10
    pymongo 4.x（含 gridfs、bson 组件）

二、环境变量
    MONGO_URI           连接地址（见下方三种环境示例）
    MONGO_DB            库名，默认 smartlib
    MONGO_USERNAME      登录账号（如 app_rw）
    MONGO_PASSWORD      账号密码
    MONGO_AUTH_SOURCE   认证库（app_rw/app_ro 为 smartlib，root 为 admin）

三、运行顺序
    1. python setup_smartlib.py          建库、建索引、导入数据、上传 GridFS 文件
       （重建环境可加 --reset）
    2. python main.py                    菜单式主程序（16 项功能，交互使用）
       python main.py --demo            非交互演示，一次打印主要结果

四、三种环境的 MONGO_URI 示例
    单机：
        mongodb://192.168.78.128:27017
    副本集 rs0（三节点 27018）：
        mongodb://192.168.78.128:27018,192.168.78.129:27018,192.168.78.130:27018/?replicaSet=rs0
    分片集群（经 mongos 27022）：
        mongodb://192.168.78.128:27022

    换环境只需改 MONGO_URI 等环境变量，代码不用动。
