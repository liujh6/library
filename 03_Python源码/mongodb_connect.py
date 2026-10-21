# -*- coding: utf-8 -*-
"""
mongodb_connect.py —— 数据库连接模块（ST-5.2）
================================================
封装获取数据库连接的逻辑，连接参数在本模块内统一定义，
被 book_manager / reader_manager / borrow_manager / stat_manager / main 调用。
"""
from pymongo import MongoClient

# ---- 连接参数统一定义在此 ----
HOST = "localhost"
PORT = 27017
DB_NAME = "library"

# 若任务四开启了访问控制（--auth），请取消注释并填写账号密码：
# USERNAME = "libReader"
# PASSWORD = "在这里填写密码"

_client = None


def _uri():
    """拼接连接串；配置了账号密码时使用带认证的 URI。"""
    auth = ""
    try:
        if USERNAME:  # noqa: F821
            from urllib.parse import quote_plus
            auth = f"{quote_plus(USERNAME)}:{quote_plus(PASSWORD)}@"  # noqa: F821
    except NameError:
        pass
    return f"mongodb://{auth}{HOST}:{PORT}/"


def get_db():
    """返回 library 数据库对象（惰性创建并复用连接）。"""
    global _client
    if _client is None:
        _client = MongoClient(_uri(), serverSelectionTimeoutMS=3000)
    return _client[DB_NAME]


def ping():
    """检测数据库连接是否可用，返回 (是否连通, 说明)。"""
    try:
        get_db().command("ping")
        return True, "连接正常"
    except Exception as e:  # noqa: BLE001
        return False, str(e)


def close():
    """关闭数据库连接。"""
    global _client
    if _client is not None:
        _client.close()
        _client = None


if __name__ == "__main__":
    # 单独运行本模块可自检连接
    ok, msg = ping()
    print("数据库连接：", msg)
    if ok:
        db = get_db()
        print("集合：", db.list_collection_names())
    close()
