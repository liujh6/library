// =====================================================================
// 任务二 · 数据建模与填充（建库、建集合、录入数据）
// ---------------------------------------------------------------------
// 运行方式（任选其一）：
//   1) mongosh --quiet <本文件绝对路径>
//   2) 先进入 mongosh，再执行  load("本文件绝对路径")
//
// 说明：本脚本按任务书 ST-2.1 / ST-2.2 / ST-2.3 顺序执行。
//       其中 borrow_logs 以“时间序列集合”方式创建（见 ST-2.2），
//       因此 ST-2.1 中不再重复创建普通集合 borrow_logs。
// =====================================================================

// ---------- ST-2.1 创建业务数据库与普通集合 ----------
db = db.getSiblingDB("library")
db.dropDatabase()          // 若库已存在先清空；首次运行可忽略
db = db.getSiblingDB("library")

db.createCollection("books")
db.createCollection("readers")
db.createCollection("category_stats")   // 任务四 A9 的统计结果落库目标

// ---------- ST-2.2 创建三种特殊集合 ----------
// ① 固定集合 book_logs：容量上限 1MB(1048576 字节)，最多 1000 条
db.createCollection("book_logs", { capped: true, size: 1048576, max: 1000 })

// ② 时间序列集合 borrow_logs：时间字段 borrow_date，粒度 hours，过期 2 年(63072000 秒)
db.createCollection("borrow_logs", {
  timeseries: { timeField: "borrow_date", granularity: "hours" },
  expireAfterSeconds: 63072000
})

// ③ 视图 book_in_stock：基于 books，过滤出 stock > 0 的图书
db.createCollection("book_in_stock", {
  viewOn: "books",
  pipeline: [ { $match: { stock: { $gt: 0 } } } ]
})

// ---------- 校验：查看集合类型与选项 ----------
print("\n===== 集合列表（名称 / 类型 / 选项）=====")
db.getCollectionInfos().forEach(function (c) {
  print(c.name, "  => ", c.type, c.options ? " " + JSON.stringify(c.options) : "")
})

// ---------- ST-2.3 录入配套数据集 ----------
// 方式 A：在【系统终端】用 mongoimport 导入 data/*.txt（推荐，速度快）：
//   mongoimport --db library --collection books       --file data/books.txt
//   mongoimport --db library --collection readers     --file data/readers.txt
//   mongoimport --db library --collection borrow_logs --file data/borrow_logs.txt
//
// 方式 B：在 mongosh 中执行 seed_data.js（内含 db.xxx.insertMany(...) 批量录入，
//        等价于“用 insertMany() 批量录入其余数据”）：
//   load("<项目目录>/mongodb/seed_data.js")
// 两种方式选其一即可，数据完全一致（books 37 条 / readers 24 条 / borrow_logs 84 条）。

// ---------- ST-2.3 单独演示 insertOne（观察返回结果）----------
// 有意使用字符串 _id，便于任务三 Q13（$type 查询 string 类型 _id）验证。
print("\n===== insertOne 演示 =====")
var r = db.books.insertOne({
  _id: "book-demo-0001",
  isbn: "9787999999999",
  title: "MongoDB实训演示图书",
  author: "实训小组",
  publisher: "实训出版社",
  category: "计算机",
  price: 50.0,
  stock: 20,
  rating: 4.0,
  tags: ["演示"],
  publish_date: new Date("2024-01-01"),
  borrow_count: 1
})
printjson(r)   // 观察 acknowledged / insertedId 字段

// ---------- ST-2.3 单独演示 insertMany（批量录入其余数据）----------
print("\n===== insertMany 演示（追加 2 条演示数据）=====")
var r2 = db.books.insertMany([
  { isbn: "9787999999991", title: "【演示】NoSQL入门", author: "张三",
    publisher: "实训出版社", category: "计算机", price: 45.0, stock: 12,
    rating: 3.9, tags: ["NoSQL", "入门"], publish_date: new Date("2023-05-01"), borrow_count: 10 },
  { isbn: "9787999999992", title: "【演示】数据库实战", author: "李四",
    publisher: "实训出版社", category: "计算机", price: 55.0, stock: 6,
    rating: 4.2, tags: ["数据库", "实战"], publish_date: new Date("2023-09-01"), borrow_count: 8 }
])
printjson(r2)

// ---------- 核对各集合文档数量 ----------
print("\n===== 各集合文档数量 =====")
print("books        :", db.books.countDocuments(), "（基础 37 + 演示 3 = 40）")
print("readers      :", db.readers.countDocuments())
print("borrow_logs  :", db.borrow_logs.countDocuments())
print("book_in_stock(视图):", db.book_in_stock.countDocuments(), "（stock>0 的图书，随 books 实时计算）")

print("\n任务二完成。")
