# -*- coding: utf-8 -*-
"""
borrow_manager.py —— 借阅管理模块
==================================
借阅登记、归还处理、逾期查询。
涉及方法：insert_one / update_many / find
"""
from datetime import datetime

from mongodb_connect import get_db


def borrow(reader_card, book_isbn):
    """借阅登记（insert_one）：写入一条“借出”流水。"""
    return get_db().borrow_logs.insert_one({
        "borrow_date": datetime.now(),
        "return_date": None,
        "reader_card": reader_card,
        "book_isbn": book_isbn,
        "status": "借出",
    })


def return_book(reader_card, book_isbn):
    """归还处理（update_many）：把该读者借出的这本书置为已归还。"""
    return get_db().borrow_logs.update_many(
        {"reader_card": reader_card, "book_isbn": book_isbn, "status": "借出"},
        {"$set": {"status": "已归还", "return_date": datetime.now()}},
    )


def find_borrows(query=None, limit=0):
    """查询借阅记录（find）。"""
    cur = get_db().borrow_logs.find(query or {})
    if limit:
        cur = cur.limit(limit)
    return list(cur)


def overdue_borrows(extra=None):
    """逾期查询（find）：status 为“逾期”的记录。"""
    q = {"status": "逾期"}
    if extra:
        q.update(extra)
    return list(get_db().borrow_logs.find(q))
