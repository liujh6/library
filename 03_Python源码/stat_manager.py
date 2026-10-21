# -*- coding: utf-8 -*-
"""
stat_manager.py —— 统计模块（ST-5.4）
======================================
分类统计、借阅趋势、畅销榜，全部使用 aggregate 聚合管道实现。
"""
from mongodb_connect import get_db


def category_stat():
    """分类统计：按类别分组统计库存总量、平均价格、图书数量，按库存总量降序。"""
    return list(get_db().books.aggregate([
        {"$group": {
            "_id": "$category",
            "总库存": {"$sum": "$stock"},
            "平均价格": {"$avg": "$price"},
            "图书数量": {"$sum": 1},
        }},
        {"$sort": {"总库存": -1}},
    ]))


def borrow_trend():
    """借阅趋势：按年份分组统计借阅量，并格式化输出。"""
    return list(get_db().borrow_logs.aggregate([
        {"$group": {
            "_id": {"$year": "$borrow_date"},
            "借阅量": {"$sum": 1},
        }},
        {"$sort": {"_id": 1}},
    ]))


def bestsellers(n=10):
    """畅销榜：借阅次数最多的前 n 本图书。"""
    return list(get_db().books.find().sort("borrow_count", -1).limit(n))
