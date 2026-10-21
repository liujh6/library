// =====================================================================
// 任务三 · 检索功能实现（Q1—Q16 / U1—U4 / D1—D3）
// ---------------------------------------------------------------------
// 运行：mongosh --quiet <本文件绝对路径>
// 每条命令打印“命令 + 结果条数”，供抄录进实验报告。
//
// 提示：以下结果基于基础数据集（books 37 / readers 24 / borrow_logs 84）。
//       若你在任务二末尾执行了 insertOne/insertMany 演示，部分计数会 +N，
//       属正常现象，以你实际运行结果为准（可对照 参考结果.md）。
// =====================================================================

db = db.getSiblingDB("library")

function show(title, cursor) {
  print("\n----- " + title + " -----")
  print("  结果条数:", cursor.toArray().length)
}

// ===================== 一、基础检索 Q1—Q6 =====================
// Q1 定价 80 元以上（$gt）
show("Q1 价格 > 80", db.books.find({ price: { $gt: 80 } }))

// Q2 库存不足 10 本（$lt）
show("Q2 库存 < 10", db.books.find({ stock: { $lt: 10 } }))

// Q3 按 ISBN 精确查找（$eq；此处示例，可换成任意 ISBN）
show("Q3 ISBN = 9787111554821", db.books.find({ isbn: { $eq: "9787111554821" } }))

// Q4 查找 email 为空的读者（$eq: null）
show("Q4 email 为 null", db.readers.find({ email: { $eq: null } }))

// Q5 排除某个出版社（$ne）
show("Q5 出版社 != 人民邮电出版社", db.books.find({ publisher: { $ne: "人民邮电出版社" } }))

// Q6 属于“计算机”或“经济管理”类别（$in）
show("Q6 类别 in [计算机, 经济管理]", db.books.find({ category: { $in: ["计算机", "经济管理"] } }))

// ===================== 二、组合与高级检索 Q7—Q12 =====================
// Q7 评分 4.0 以上且计算机类（$and）
show("Q7 rating>4.0 且 计算机", db.books.find({ $and: [ { rating: { $gt: 4.0 } }, { category: "计算机" } ] }))

// Q8 评分低于 3.5 或库存为 0（$or）
show("Q8 rating<3.5 或 stock=0", db.books.find({ $or: [ { rating: { $lt: 3.5 } }, { stock: 0 } ] }))

// Q9 书名包含 "Python"（$regex）
show("Q9 书名含 Python", db.books.find({ title: { $regex: "Python" } }))

// Q10 同时带 "编程" 和 "入门" 两个标签（$all）
show("Q10 tags 同时含 [编程, 入门]", db.books.find({ tags: { $all: ["编程", "入门"] } }))

// Q11 恰好 3 个标签（$size）
show("Q11 tags 数量 = 3", db.books.find({ tags: { $size: 3 } }))

// Q12 已录入 tags 字段（$exists）
show("Q12 tags 字段存在", db.books.find({ tags: { $exists: true } }))

// ===================== 三、结果处理 Q13—Q16 =====================
// Q13 _id 为字符串类型（$type: "string"）
//     基础数据 _id 均为 ObjectId，故为 0；若已执行任务二的 insertOne 字符串 _id 演示，则为 1。
show("Q13 _id 为 string 类型", db.books.find({ _id: { $type: "string" } }))

// Q14 按评分降序取前 5（sort + limit 链式调用）
print("\n----- Q14 评分降序前 5 -----")
db.books.find().sort({ rating: -1 }).limit(5)
  .forEach(b => print("  ", b.rating, b.title))

// Q15 只返回书名/价格/评分，不含 _id（投影）
print("\n----- Q15 投影（title/price/rating）-----")
print("  结果条数:", db.books.find({}, { _id: 0, title: 1, price: 1, rating: 1 }).count())
db.books.find({}, { _id: 0, title: 1, price: 1, rating: 1 }).limit(3)
  .forEach(b => print("  ", JSON.stringify(b)))

// Q16 获取所有图书类别清单（distinct）
print("\n----- Q16 distinct category -----")
var cats = db.books.distinct("category")
printjson(cats)
print("  类别数量:", cats.length)

// ===================== 四、更新 U1—U4 =====================
// U1 某本书库存减少 5（updateOne + $inc）
print("\n----- U1 库存 -5 -----")
printjson(db.books.updateOne({ isbn: "9787111554821" }, { $inc: { stock: -5 } }))

// U2 某类别所有图书价格打 9 折（updateMany + $mul）
print("\n----- U2 历史类价格 *0.9 -----")
printjson(db.books.updateMany({ category: "历史" }, { $mul: { price: 0.9 } }))

// U3 新增字段并记录当前时间（$currentDate）
print("\n----- U3 $currentDate 新增 last_updated -----")
printjson(db.books.updateOne({ isbn: "9787302527916" },
  { $currentDate: { last_updated: { $type: "date" } } }))

// U4 删除某本书的 tags 字段（$unset）
print("\n----- U4 $unset 删除 tags -----")
printjson(db.books.updateOne({ isbn: "9787111555999" }, { $unset: { tags: "" } }))

// ===================== 五、删除 D1—D3 =====================
// D1 删除一条已归还的借阅记录（deleteOne + $eq）
print("\n----- D1 删除一条已归还记录 -----")
printjson(db.borrow_logs.deleteOne({ status: { $eq: "已归还" } }))

// D2 清理逾期未还记录（deleteMany）——先预览，再删除
print("\n----- D2 预览：逾期记录数 -----")
print("  逾期记录数:", db.borrow_logs.countDocuments({ status: "逾期" }))
print("----- D2 执行 deleteMany 逾期 -----")
printjson(db.borrow_logs.deleteMany({ status: "逾期" }))
print("  删除后逾期记录数:", db.borrow_logs.countDocuments({ status: "逾期" }))

// D3 整体替换某位读者信息（replaceOne，自动保留 _id）
print("\n----- D3 replaceOne 替换读者 R2023013 -----")
printjson(db.readers.replaceOne(
  { card_no: "R2023013" },
  { card_no: "R2023013", name: "沈芳(已更新)", college: "外国语学院",
    email: "shenfang.new@stu.edu.cn", phone: "13800000013", level: "高级",
    register_date: new Date("2024-03-03"), fav_categories: ["外语", "翻译"] }
))

print("\n任务三完成。")
