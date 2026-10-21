# -*- coding: utf-8 -*-
"""
reader_manager.py —— 读者管理模块
==================================
读者信息管理、学院统计、等级分布。
涉及方法：find / count_documents / distinct
"""
from mongodb_connect import get_db


def find_readers(query=None, limit=0):
    """查询读者（find）。"""
    cur = get_db().readers.find(query or {})
    if limit:
        cur = cur.limit(limit)
    return list(cur)


def find_reader(query):
    """查询单个读者（find_one）。"""
    return get_db().readers.find_one(query)


def count_readers(query=None):
    """统计读者数量（count_documents）。"""
    return get_db().readers.count_documents(query or {})


def colleges():
    """所有学院清单（distinct）。"""
    return get_db().readers.distinct("college")


def college_stats():
    """学院读者人数统计（aggregate）。"""
    return list(get_db().readers.aggregate([
        {"$group": {"_id": "$college", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]))


def level_distribution():
    """借阅等级分布（aggregate）。"""
    return list(get_db().readers.aggregate([
        {"$group": {"_id": "$level", "count": {"$sum": 1}}},
    ]))
