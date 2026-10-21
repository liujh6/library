// =====================================================================
// 任务二 ST-2.3 · insertOne / insertMany 演示（在已导入基础数据后执行）
// ---------------------------------------------------------------------
// 本脚本对应 02_建库建集合.js 的 ST-2.3 段落，单独抽出便于在
// 已完成建库+导入的环境上复现，并补充 Q13（$type:string）验证。
// =====================================================================

db = db.getSiblingDB("library")

print("===== insertOne 演示（字符串 _id，观察返回结果）=====")
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
printjson(r)   // 观察 acknowledged / insertedId（字符串 _id）

print("\n===== insertMany 演示（批量录入 2 条）=====")
var r2 = db.books.insertMany([
  { isbn: "9787999999991", title: "【演示】NoSQL入门", author: "张三",
    publisher: "实训出版社", category: "计算机", price: 45.0, stock: 12,
    rating: 3.9, tags: ["NoSQL", "入门"], publish_date: new Date("2023-05-01"), borrow_count: 10 },
  { isbn: "9787999999992", title: "【演示】数据库实战", author: "李四",
    publisher: "实训出版社", category: "计算机", price: 55.0, stock: 6,
    rating: 4.2, tags: ["数据库", "实战"], publish_date: new Date("2023-09-01"), borrow_count: 8 }
])
printjson(r2)

print("\n===== 重新验证 Q13：_id 为 string 类型 =====")
print("  结果条数:", db.books.find({ _id: { $type: "string" } }).toArray().length)
db.books.find({ _id: { $type: "string" } }).forEach(b => print("  ", JSON.stringify(b)))

print("\n===== 各集合文档数量 =====")
print("books        :", db.books.countDocuments(), "（基础 37 + 演示 3 = 40）")
print("readers      :", db.readers.countDocuments())
print("borrow_logs  :", db.borrow_logs.countDocuments())

print("\ninsertOne/insertMany 演示完成。")
