# -*- coding: utf-8 -*-
"""
book_manager.py —— 图书管理模块
================================
图书增删改查、条件检索、评分排行。
涉及方法：insert_one / insert_many / find / find_one /
         update_one / delete_one / delete_many
"""
from mongodb_connect import get_db


def add_book(book: dict):
    """新增一本图书（insert_one）。"""
    return get_db().books.insert_one(book)


def add_books(books: list):
    """批量新增图书（insert_many）。"""
    return get_db().books.insert_many(books)


def find_books(query=None, projection=None, limit=0):
    """查询图书（find）。"""
    cur = get_db().books.find(query or {}, projection)
    if limit:
        cur = cur.limit(limit)
    return list(cur)


def find_book(query):
    """查询单本图书（find_one）。"""
    return get_db().books.find_one(query)


def update_book(query, update):
    """更新单本图书（update_one）。"""
    return get_db().books.update_one(query, update)


def delete_book(query):
    """删除单本图书（delete_one）。"""
    return get_db().books.delete_one(query)


def delete_books(query):
    """批量删除图书（delete_many）。"""
    return get_db().books.delete_many(query)


def search_by_price(gt=None, lt=None):
    """按价格范围条件检索。"""
    q = {}
    if gt is not None or lt is not None:
        q["price"] = {}
        if gt is not None:
            q["price"]["$gt"] = gt
        if lt is not None:
            q["price"]["$lt"] = lt
    return list(get_db().books.find(q))


def search_by_keyword(field, keyword):
    """按字段模糊检索（$regex）。"""
    return list(get_db().books.find({field: {"$regex": keyword}}))


def top_rating(n=5):
    """评分排行：按评分降序取前 n 本。"""
    return list(get_db().books.find().sort("rating", -1).limit(n))
