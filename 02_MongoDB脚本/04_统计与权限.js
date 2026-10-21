// =====================================================================
// 任务四 · 统计分析与权限管理（A1—A9 / I1—I5 / S1—S3）
// ---------------------------------------------------------------------
// 运行：mongosh --quiet <本文件绝对路径>
//
// 说明：A1—A9 为聚合管道；I1—I5 为索引；S1—S3 为用户权限。
//       S1—S3 需要以“开启访问控制的实例”登录后执行（见文件内说明）。
// =====================================================================

db = db.getSiblingDB("library")

// ===================== 一、聚合管道统计 A1—A9 =====================

// A1 按类别统计图书数量与平均评分（$group + $sum + $avg）
print("===== A1 分类统计（数量/平均分）=====")
db.books.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 }, avg_rating: { $avg: "$rating" } } },
  { $sort: { count: -1 } }
]).forEach(r => print("  ", r._id, " 数量:", r.count, " 平均分:", r.avg_rating.toFixed(2)))

// A2 统计各出版社图书数量，取最多的 5 家（$group + $sort + $limit）
print("\n===== A2 出版社图书数量 Top5 =====")
db.books.aggregate([
  { $group: { _id: "$publisher", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 }
]).forEach(r => print("  ", r._id, " :", r.count))

// A3 文档数最多的图书类别（$sortByCount）
print("\n===== A3 文档数最多的类别 =====")
db.books.aggregate([
  { $sortByCount: "$category" },
  { $limit: 1 }
]).forEach(r => print("  ", r._id, " :", r.count))

// A4 评分最高的 3 本图书，显示书名与借阅次数（$sort + $limit + $project）
print("\n===== A4 评分最高 3 本 =====")
db.books.aggregate([
  { $sort: { rating: -1 } },
  { $limit: 3 },
  { $project: { _id: 0, title: 1, rating: 1, borrow_count: 1 } }
]).forEach(r => print("  ", JSON.stringify(r)))

// A5 每本书销售额 = 单价 × 借阅次数，四舍五入两位小数（$multiply + $round）
print("\n===== A5 销售额（降序前 5）=====")
db.books.aggregate([
  { $project: { _id: 0, title: 1, sales: { $round: [ { $multiply: ["$price", "$borrow_count"] }, 2 ] } } },
  { $sort: { sales: -1 } },
  { $limit: 5 }
]).forEach(r => print("  ", r.title, " ->", r.sales, "元"))

// A6 按借阅年份统计借阅量，格式化为 "2024年"（$dateToString）
print("\n===== A6 按年借阅量 =====")
db.borrow_logs.aggregate([
  { $group: { _id: { $dateToString: { format: "%Y年", date: "$borrow_date" } }, count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]).forEach(r => print("  ", r._id, " :", r.count))
// 备选写法（用 $year）：
// db.borrow_logs.aggregate([
//   { $group: { _id: { $year: "$borrow_date" }, count: { $sum: 1 } } },
//   { $project: { _id: 0, year: { $concat: [ { $toString: "$_id" }, "年" ] }, count: 1 } },
//   { $sort: { year: 1 } }
// ])

// A7 每位读者借阅次数，取前 5 名（$group + $sort + $limit）
print("\n===== A7 读者借阅 Top5 =====")
db.borrow_logs.aggregate([
  { $group: { _id: "$reader_card", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 },
  { $lookup: { from: "readers", localField: "_id", foreignField: "card_no", as: "r" } },
  { $unwind: "$r" },
  { $project: { _id: 0, name: "$r.name", card: "$_id", count: 1 } }
]).forEach(r => print("  ", r.name, "(", r.card, ") :", r.count))

// A8 关联读者与借阅流水，产出学院借阅量排行榜（$lookup）
// 注：borrow_logs 为时间序列集合，此处 $lookup 的 from 是普通集合 readers，可正常执行。
print("\n===== A8 学院借阅量排行榜 =====")
db.borrow_logs.aggregate([
  { $group: { _id: "$reader_card", count: { $sum: 1 } } },
  { $lookup: { from: "readers", localField: "_id", foreignField: "card_no", as: "reader" } },
  { $unwind: "$reader" },
  { $group: { _id: "$reader.college", total: { $sum: "$count" } } },
  { $sort: { total: -1 } }
]).forEach(r => print("  ", r._id, " :", r.total))

// A9 把 A1 分类统计结果写入 category_stats（$merge）
print("\n===== A9 $merge 写入 category_stats =====")
db.books.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 }, avg_rating: { $avg: "$rating" } } },
  { $sort: { _id: 1 } },
  { $merge: { into: "category_stats", on: "_id", whenMatched: "replace", whenNotMatched: "insert" } }
])
print("  category_stats 现有文档数:", db.category_stats.countDocuments())
db.category_stats.find().sort({ _id: 1 }).forEach(r => print("  ", JSON.stringify(r)))

// ===================== 二、索引 I1—I5 =====================
print("\n===== 索引建立 =====")
// I1 唯一索引：books.isbn（验证重复 ISBN 无法插入）
db.books.createIndex({ isbn: 1 }, { unique: true })
// I2 单键索引：books.title
db.books.createIndex({ title: 1 })
// I3 单键索引：books.category
db.books.createIndex({ category: 1 })
// I4 多键索引：books.tags
db.books.createIndex({ tags: 1 })
// I5 复合索引：category + price
db.books.createIndex({ category: 1, price: 1 })

print("\n----- I1 验证重复 ISBN 插入失败 -----")
try {
  db.books.insertOne({ isbn: "9787111554821", title: "重复ISBN测试" })
  print("  插入成功（异常：唯一索引未生效）")
} catch (e) {
  print("  插入被拒，唯一索引生效。错误码:", e.codeName || e.code)
}

print("\n----- 索引清单 getIndexes() -----")
db.books.getIndexes().forEach(ix => print("  ", ix.name, " =>", JSON.stringify(ix.key)))

print("\n----- explain 对比（category 查询有无索引耗时）-----")
// 建立索引后：
var e1 = db.books.find({ category: "计算机" }).explain("executionStats")
print("  使用索引执行阶段:", e1.executionStats.executionStages.stage,
      " 检查文档数:", e1.executionStats.totalDocsExamined)
// 提示：可临时用 hint({ $natural: 1 }) 强制全表扫描做对比：
var e2 = db.books.find({ category: "计算机" }).hint({ $natural: 1 }).explain("executionStats")
print("  全表扫描阶段:", e2.executionStats.executionStages.stage,
      " 检查文档数:", e2.executionStats.totalDocsExamined)

// ===================== 三、用户与权限 S1—S3 =====================
print("\n===== 用户与权限（说明）=====")
print("S1/S2 创建账号（在开启访问控制的管理员会话中执行一次即可）：")
print('  db = db.getSiblingDB("library")')
print('  db.createUser({ user: "libReader", pwd: passwordPrompt(),')
print('    roles: [ { role: "read", db: "library" } ] })')
print('  db.createUser({ user: "libWriter", pwd: passwordPrompt(),')
print('    roles: [ { role: "readWrite", db: "library" },')
print('             { role: "dbAdmin",  db: "library" } ] })')
print("")
print("S3 验证权限：重启 mongod 并加上 --auth，然后用只读账号连接：")
print('  mongosh "mongodb://libReader:<密码>@localhost:27017/library?authSource=library"')
print('  db.books.findOne()        // 读操作 -> 应成功')
print('  db.books.insertOne({...}) // 写操作 -> 应报 Unauthorized（未授权被拒）')
print("")
print("（创建账号与 --auth 验证涉及重启服务，故本脚本只打印命令，请手动按上述步骤执行并截图。）")

print("\n任务四完成。")
