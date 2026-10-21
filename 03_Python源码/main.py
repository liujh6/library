# -*- coding: utf-8 -*-
"""
main.py —— 图书情报检索与统计平台 主程序（ST-5.5）
====================================================
菜单式交互程序，串联 book_manager / reader_manager / borrow_manager / stat_manager。
- 启动时打印数据库连接状态与各集合文档总数
- 菜单 14 个功能项，覆盖检索、统计、更新、删除
- 每次数据变更后打印受影响的文档数
- 查询无结果时给出明确提示
- 退出前正确关闭数据库连接
"""
from datetime import datetime

import mongodb_connect as mc
import book_manager as bm
import reader_manager as rm
import borrow_manager as bw
import stat_manager as sm

DB = mc.get_db()


# ---------------- 工具函数 ----------------
def show_result(docs, title, fields=("title", "author", "category", "price")):
    """统一打印查询结果；无结果时给出明确提示。"""
    print(f"\n--- {title}：共 {len(docs)} 条 ---")
    if not docs:
        print("  （无结果）")
        return
    for d in docs:
        line = ", ".join(f"{f}={d.get(f)}" for f in fields if f in d)
        print("  ", line)


def show_write(prefix, result):
    """打印写操作影响的行数。"""
    n = None
    if hasattr(result, "modified_count"):
        n = f"匹配 {result.matched_count} / 修改 {result.modified_count}"
    elif hasattr(result, "deleted_count"):
        n = f"删除 {result.deleted_count}"
    elif hasattr(result, "inserted_id"):
        n = f"新增 _id={result.inserted_id}"
    print(f"  {prefix}：{n}")


def print_counts():
    """打印各集合文档总数。"""
    print("\n===== 各集合文档总数 =====")
    for c in ("books", "readers", "borrow_logs", "category_stats"):
        try:
            print(f"  {c:<14}: {DB[c].count_documents({})} 条")
        except Exception as e:  # noqa: BLE001
            print(f"  {c:<14}: 读取失败（{e}）")


def print_banner():
    print("=" * 56)
    print("  图书情报检索与统计平台")
    print("  基于 MongoDB + PyMongo")
    print("=" * 56)


# ---------------- 菜单处理函数 ----------------
def menu_book_search():
    """1. 图书检索（书名/作者/ISBN 模糊）。"""
    kw = input("输入关键词（书名/作者/ISBN，支持模糊）：").strip()
    docs = bm.find_books({
        "$or": [
            {"title": {"$regex": kw}},
            {"author": {"$regex": kw}},
            {"isbn": {"$regex": kw}},
        ]
    })
    show_result(docs, "图书检索结果")


def menu_price_search():
    """2. 价格范围检索。"""
    try:
        lo = float(input("最低价（回车跳过）：").strip() or 0)
        hi = input("最高价（回车跳过）：").strip()
    except ValueError:
        print("  输入非法，已取消。")
        return
    q = {"price": {}}
    if lo:
        q["price"]["$gte"] = lo
    if hi:
        q["price"]["$lte"] = float(hi)
    docs = bm.find_books(q)
    show_result(docs, "价格范围检索")


def menu_category_search():
    """3. 按类别检索。"""
    cats = DB.books.distinct("category")
    print("  现有类别：", "、".join(cats))
    cat = input("输入类别：").strip()
    show_result(bm.find_books({"category": cat}), f"类别[{cat}]图书")


def menu_top_rating():
    """4. 评分排行。"""
    n = int(input("取前几本（默认 5）：").strip() or 5)
    docs = bm.top_rating(n)
    print(f"\n--- 评分排行 Top{n} ---")
    for d in docs:
        print(f"  {d.get('rating')}  {d.get('title')}  ({d.get('author')})")


def menu_add_book():
    """5. 新增图书。"""
    book = {
        "isbn": input("ISBN：").strip(),
        "title": input("书名：").strip(),
        "author": input("作者：").strip(),
        "publisher": input("出版社：").strip(),
        "category": input("类别：").strip(),
        "price": float(input("价格：").strip() or 0),
        "stock": int(input("库存：").strip() or 0),
        "rating": float(input("评分(0-5)：").strip() or 0),
        "tags": [t.strip() for t in input("标签（逗号分隔）：").split(",") if t.strip()],
        "publish_date": datetime.strptime(input("出版日期(YYYY-MM-DD)：").strip(), "%Y-%m-%d"),
        "borrow_count": int(input("累计借阅次数：").strip() or 0),
    }
    show_write("新增图书", bm.add_book(book))


def menu_update_stock():
    """6. 更新图书库存（$inc）。"""
    isbn = input("ISBN：").strip()
    delta = int(input("库存增减量（负数表示减少）：").strip() or 0)
    show_write("更新库存", bm.update_book({"isbn": isbn}, {"$inc": {"stock": delta}}))


def menu_delete_book():
    """7. 删除图书。"""
    isbn = input("要删除图书的 ISBN：").strip()
    show_write("删除图书", bm.delete_book({"isbn": isbn}))


def menu_college_stat():
    """8. 学院统计。"""
    for r in rm.college_stats():
        print(f"  {r['_id']}: {r['count']} 人")


def menu_level_stat():
    """9. 等级分布。"""
    for r in rm.level_distribution():
        print(f"  {r['_id']}: {r['count']} 人")


def menu_borrow():
    """10. 借阅登记。"""
    card = input("读者借阅证号：").strip()
    isbn = input("图书 ISBN：").strip()
    show_write("借阅登记", bw.borrow(card, isbn))


def menu_return():
    """11. 归还处理。"""
    card = input("读者借阅证号：").strip()
    isbn = input("图书 ISBN：").strip()
    show_write("归还处理", bw.return_book(card, isbn))


def menu_overdue():
    """12. 逾期查询。"""
    docs = bw.overdue_borrows()
    show_result(docs, "逾期记录", fields=("reader_card", "book_isbn", "status", "borrow_date"))


def menu_category_aggregate():
    """13. 分类统计（聚合）。"""
    print("\n--- 分类统计（库存总量降序）---")
    for r in sm.category_stat():
        print(f"  {r['_id']}: 库存 {r['总库存']}, 均价 {r['平均价格']:.2f}, "
              f"{r['图书数量']} 本")


def menu_trend():
    """14. 借阅趋势（按年）。"""
    print("\n--- 借阅趋势 ---")
    for r in sm.borrow_trend():
        print(f"  {r['_id']}年: {r['借阅量']} 次")


def menu_bestseller():
    """15. 畅销榜。"""
    n = int(input("取前几本（默认 10）：").strip() or 10)
    print(f"\n--- 畅销榜 Top{n} ---")
    for d in sm.bestsellers(n):
        print(f"  {d.get('borrow_count'):>4} 次  {d.get('title')}")


MENU = [
    ("图书检索（关键词）", menu_book_search),
    ("价格范围检索", menu_price_search),
    ("按类别检索", menu_category_search),
    ("评分排行", menu_top_rating),
    ("新增图书", menu_add_book),
    ("更新库存", menu_update_stock),
    ("删除图书", menu_delete_book),
    ("学院读者统计", menu_college_stat),
    ("借阅等级分布", menu_level_stat),
    ("借阅登记", menu_borrow),
    ("归还处理", menu_return),
    ("逾期查询", menu_overdue),
    ("分类统计（聚合）", menu_category_aggregate),
    ("借阅趋势（按年）", menu_trend),
    ("畅销榜", menu_bestseller),
]


def main():
    print_banner()
    # 启动：打印连接状态与各集合文档总数
    ok, msg = mc.ping()
    print("数据库连接状态：", msg)
    if not ok:
        print("无法连接数据库，请确认 mongod 已启动（端口 27017）。")
        return
    print_counts()

    while True:
        print("\n" + "-" * 56)
        print("请选择功能：")
        for i, (label, _) in enumerate(MENU, 1):
            print(f"  {i:>2}. {label}")
        print("   0. 退出")
        try:
            choice = input("输入编号：").strip()
        except (EOFError, KeyboardInterrupt):
            choice = "0"
        if choice == "0":
            break
        if not choice.isdigit() or not (1 <= int(choice) <= len(MENU)):
            print("  无效选项，请重新输入。")
            continue
        try:
            MENU[int(choice) - 1][1]()
        except Exception as e:  # noqa: BLE001
            print(f"  操作出错：{e}")

    # 退出前关闭连接
    mc.close()
    print("已退出，数据库连接已关闭。")


if __name__ == "__main__":
    main()
