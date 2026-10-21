// mongosh 脚本：向 library 库录入配套数据集（演示 insertMany）
// 说明：数据与 data/*.txt 完全一致，任选其一导入即可。
// 运行：mongosh <本文件路径>    或  进入 mongosh 后执行 load('<本文件路径>')

use library

// ---------- books：共 37 条 ----------
db.books.insertMany([
{
    isbn: "9787111554821",
    title: "Python编程：从入门到实践",
    author: "埃里克·马瑟斯",
    publisher: "人民邮电出版社",
    category: "计算机",
    price: 89.0,
    stock: 15,
    rating: 4.6,
    tags: ["Python", "编程", "入门"],
    publish_date: ISODate("2023-06-01"),
    borrow_count: 128
  },
{
    isbn: "9787115428984",
    title: "深入理解计算机系统",
    author: "兰德尔·布莱恩特",
    publisher: "机械工业出版社",
    category: "计算机",
    price: 139.0,
    stock: 8,
    rating: 4.8,
    tags: ["计算机体系结构", "经典"],
    publish_date: ISODate("2021-01-01"),
    borrow_count: 95
  },
{
    isbn: "9787115470931",
    title: "Java核心技术·卷I",
    author: "凯·S·霍斯特曼",
    publisher: "机械工业出版社",
    category: "计算机",
    price: 149.0,
    stock: 5,
    rating: 4.5,
    tags: ["Java", "编程"],
    publish_date: ISODate("2022-08-01"),
    borrow_count: 87
  },
{
    isbn: "9787302527916",
    title: "算法导论",
    author: "托马斯·科尔曼",
    publisher: "清华大学出版社",
    category: "计算机",
    price: 128.0,
    stock: 3,
    rating: 4.8,
    tags: ["算法", "数据结构", "经典"],
    publish_date: ISODate("2020-09-01"),
    borrow_count: 156
  },
{
    isbn: "9787115469921",
    title: "数据库系统概念",
    author: "亚伯拉罕·西尔伯沙茨",
    publisher: "机械工业出版社",
    category: "计算机",
    price: 99.0,
    stock: 12,
    rating: 4.4,
    tags: ["数据库", "SQL"],
    publish_date: ISODate("2021-05-01"),
    borrow_count: 74
  },
{
    isbn: "9787302567884",
    title: "机器学习",
    author: "周志华",
    publisher: "清华大学出版社",
    category: "计算机",
    price: 88.0,
    stock: 20,
    rating: 4.7,
    tags: ["机器学习", "人工智能"],
    publish_date: ISODate("2022-03-01"),
    borrow_count: 132
  },
{
    isbn: "9787115555821",
    title: "深入浅出数据分析",
    author: "迈克·米尔顿",
    publisher: "人民邮电出版社",
    category: "计算机",
    price: 79.0,
    stock: 9,
    rating: 4.1,
    tags: ["数据分析", "入门", "统计"],
    publish_date: ISODate("2021-11-01"),
    borrow_count: 58
  },
{
    isbn: "9787302599999",
    title: "计算机网络：自顶向下方法",
    author: "詹姆斯·库罗斯",
    publisher: "机械工业出版社",
    category: "计算机",
    price: 109.0,
    stock: 6,
    rating: 4.3,
    tags: ["计算机网络", "网络"],
    publish_date: ISODate("2023-02-01"),
    borrow_count: 66
  },
{
    isbn: "9787115590001",
    title: "Go语言编程",
    author: "谢孟军",
    publisher: "人民邮电出版社",
    category: "计算机",
    price: 69.0,
    stock: 14,
    rating: 4.0,
    tags: ["Go", "编程", "后端"],
    publish_date: ISODate("2022-07-01"),
    borrow_count: 43
  },
{
    isbn: "9787302529990",
    title: "计算机程序的构造和解释",
    author: "哈罗德·阿贝尔森",
    publisher: "清华大学出版社",
    category: "计算机",
    price: 79.0,
    stock: 0,
    rating: 4.5,
    tags: ["编程", "经典", "Lisp"],
    publish_date: ISODate("2019-12-01"),
    borrow_count: 38
  },
{
    isbn: "9787111555999",
    title: "图解HTTP",
    author: "上野宣",
    publisher: "人民邮电出版社",
    category: "计算机",
    price: 49.0,
    stock: 22,
    rating: 3.8,
    tags: ["网络", "HTTP", "入门"],
    publish_date: ISODate("2020-06-01"),
    borrow_count: 91
  },
{
    isbn: "9787302600001",
    title: "深度学习",
    author: "伊恩·古德费洛",
    publisher: "清华大学出版社",
    category: "计算机",
    price: 168.0,
    stock: 4,
    rating: 4.8,
    tags: ["深度学习", "人工智能", "机器学习"],
    publish_date: ISODate("2023-09-01"),
    borrow_count: 104
  },
{
    isbn: "9787111588881",
    title: "经济学原理",
    author: "N·格里高利·曼昆",
    publisher: "北京大学出版社",
    category: "经济管理",
    price: 108.0,
    stock: 10,
    rating: 4.5,
    tags: ["经济学", "入门"],
    publish_date: ISODate("2021-09-01"),
    borrow_count: 88
  },
{
    isbn: "9787300288888",
    title: "管理学",
    author: "斯蒂芬·罗宾斯",
    publisher: "中国人民大学出版社",
    category: "经济管理",
    price: 79.0,
    stock: 7,
    rating: 4.2,
    tags: ["管理学", "经典"],
    publish_date: ISODate("2020-03-01"),
    borrow_count: 62
  },
{
    isbn: "9787302555555",
    title: "宏观经济学",
    author: "格里高利·曼昆",
    publisher: "北京大学出版社",
    category: "经济管理",
    price: 95.0,
    stock: 11,
    rating: 4.3,
    tags: ["经济学", "宏观"],
    publish_date: ISODate("2022-01-01"),
    borrow_count: 71
  },
{
    isbn: "9787302666666",
    title: "会计学原理",
    author: "陈信元",
    publisher: "复旦大学出版社",
    category: "经济管理",
    price: 45.0,
    stock: 18,
    rating: 3.3,
    tags: ["会计", "财务"],
    publish_date: ISODate("2021-06-01"),
    borrow_count: 55
  },
{
    isbn: "9787302777777",
    title: "市场营销原理",
    author: "菲利普·科特勒",
    publisher: "机械工业出版社",
    category: "经济管理",
    price: 88.0,
    stock: 13,
    rating: 4.4,
    tags: ["市场营销"],
    publish_date: ISODate("2020-08-01"),
    borrow_count: 69
  },
{
    isbn: "9787302888880",
    title: "金融学",
    author: "黄达",
    publisher: "中国人民大学出版社",
    category: "经济管理",
    price: 72.0,
    stock: 5,
    rating: 4.0,
    tags: ["金融", "入门"],
    publish_date: ISODate("2021-12-01"),
    borrow_count: 47
  },
{
    isbn: "9787302999991",
    title: "投资学",
    author: "滋维·博迪",
    publisher: "中国人民大学出版社",
    category: "经济管理",
    price: 118.0,
    stock: 2,
    rating: 4.6,
    tags: ["投资", "金融", "进阶"],
    publish_date: ISODate("2023-04-01"),
    borrow_count: 52
  },
{
    isbn: "9787302111112",
    title: "电子商务概论",
    author: "张润彤",
    publisher: "电子工业出版社",
    category: "经济管理",
    price: 42.0,
    stock: 16,
    rating: 3.4,
    tags: ["电子商务", "入门"],
    publish_date: ISODate("2019-10-01"),
    borrow_count: 39
  },
{
    isbn: "9787020000001",
    title: "百年孤独",
    author: "加西亚·马尔克斯",
    publisher: "人民文学出版社",
    category: "文学",
    price: 55.0,
    stock: 25,
    rating: 4.9,
    tags: ["小说", "经典", "魔幻现实主义"],
    publish_date: ISODate("2017-05-01"),
    borrow_count: 210
  },
{
    isbn: "9787020000002",
    title: "活着",
    author: "余华",
    publisher: "作家出版社",
    category: "文学",
    price: 28.0,
    stock: 30,
    rating: 4.9,
    tags: ["小说", "经典"],
    publish_date: ISODate("2017-08-01"),
    borrow_count: 245
  },
{
    isbn: "9787020000003",
    title: "围城",
    author: "钱钟书",
    publisher: "人民文学出版社",
    category: "文学",
    price: 36.0,
    stock: 20,
    rating: 4.5,
    tags: ["小说", "经典"],
    publish_date: ISODate("2018-03-01"),
    borrow_count: 132
  },
{
    isbn: "9787020000004",
    title: "平凡的世界",
    author: "路遥",
    publisher: "北京十月文艺出版社",
    category: "文学",
    price: 98.0,
    stock: 12,
    rating: 4.7,
    tags: ["小说", "经典", "现实"],
    publish_date: ISODate("2018-11-01"),
    borrow_count: 156
  },
{
    isbn: "9787020000005",
    title: "三体",
    author: "刘慈欣",
    publisher: "重庆出版社",
    category: "文学",
    price: 68.0,
    stock: 18,
    rating: 4.8,
    tags: ["科幻", "小说"],
    publish_date: ISODate("2020-01-01"),
    borrow_count: 189
  },
{
    isbn: "9787020000006",
    title: "红楼梦",
    author: "曹雪芹",
    publisher: "人民文学出版社",
    category: "文学",
    price: 59.7,
    stock: 15,
    rating: 4.9,
    tags: ["古典", "小说", "经典"],
    publish_date: ISODate("2016-07-01"),
    borrow_count: 167
  },
{
    isbn: "9787101000001",
    title: "明朝那些事儿",
    author: "当年明月",
    publisher: "浙江人民出版社",
    category: "历史",
    price: 49.9,
    stock: 21,
    rating: 4.6,
    tags: ["历史", "通俗", "入门"],
    publish_date: ISODate("2019-09-01"),
    borrow_count: 143
  },
{
    isbn: "9787101000002",
    title: "万历十五年",
    author: "黄仁宇",
    publisher: "生活·读书·新知三联书店",
    category: "历史",
    price: 39.0,
    stock: 14,
    rating: 4.7,
    tags: ["历史", "经典"],
    publish_date: ISODate("2018-05-01"),
    borrow_count: 118
  },
{
    isbn: "9787101000003",
    title: "全球通史",
    author: "斯塔夫里阿诺斯",
    publisher: "北京大学出版社",
    category: "历史",
    price: 78.0,
    stock: 8,
    rating: 4.3,
    tags: ["历史", "世界史"],
    publish_date: ISODate("2017-01-01"),
    borrow_count: 76
  },
{
    isbn: "9787101000004",
    title: "史记",
    author: "司马迁",
    publisher: "中华书局",
    category: "历史",
    price: 128.0,
    stock: 6,
    rating: 4.8,
    tags: ["历史", "古典", "经典"],
    publish_date: ISODate("2016-10-01"),
    borrow_count: 89
  },
{
    isbn: "9787100000001",
    title: "如何阅读一本书",
    author: "莫提默·艾德勒",
    publisher: "商务印书馆",
    category: "教育",
    price: 46.0,
    stock: 24,
    rating: 4.2,
    tags: ["阅读", "方法论", "入门"],
    publish_date: ISODate("2019-05-01"),
    borrow_count: 97
  },
{
    isbn: "9787100000002",
    title: "刻意练习",
    author: "安德斯·艾利克森",
    publisher: "机械工业出版社",
    category: "教育",
    price: 49.0,
    stock: 19,
    rating: 4.0,
    tags: ["学习方法", "心理学"],
    publish_date: ISODate("2020-04-01"),
    borrow_count: 83
  },
{
    isbn: "9787100000003",
    title: "教育学",
    author: "王道俊",
    publisher: "人民教育出版社",
    category: "教育",
    price: 38.0,
    stock: 10,
    rating: 3.7,
    tags: ["教育学", "教材"],
    publish_date: ISODate("2018-08-01"),
    borrow_count: 44
  },
{
    isbn: "9787100000004",
    title: "艺术的故事",
    author: "贡布里希",
    publisher: "广西美术出版社",
    category: "艺术",
    price: 98.0,
    stock: 9,
    rating: 4.6,
    tags: ["艺术史", "入门"],
    publish_date: ISODate("2019-02-01"),
    borrow_count: 61
  },
{
    isbn: "9787100000005",
    title: "音乐理论基础",
    author: "李重光",
    publisher: "人民音乐出版社",
    category: "艺术",
    price: 32.0,
    stock: 13,
    rating: 3.2,
    tags: ["音乐", "教材"],
    publish_date: ISODate("2017-06-01"),
    borrow_count: 35
  },
{
    isbn: "9787100000006",
    title: "医学统计学",
    author: "孙振球",
    publisher: "人民卫生出版社",
    category: "医学",
    price: 55.0,
    stock: 7,
    rating: 3.6,
    tags: ["医学", "统计"],
    publish_date: ISODate("2018-09-01"),
    borrow_count: 29
  },
{
    isbn: "9787100000007",
    title: "民法典概论",
    author: "王利明",
    publisher: "中国人民大学出版社",
    category: "法律",
    price: 68.0,
    stock: 11,
    rating: 4.1,
    tags: ["法律", "民法"],
    publish_date: ISODate("2021-07-01"),
    borrow_count: 41
  }
]);

// ---------- readers：共 24 条 ----------
db.readers.insertMany([
{
    card_no: "R2023001",
    name: "张伟",
    college: "计算机学院",
    email: "zhangwei@stu.edu.cn",
    phone: "13800000001",
    level: "普通",
    register_date: ISODate("2023-03-12"),
    fav_categories: ["计算机", "人工智能"]
  },
{
    card_no: "R2023002",
    name: "李娜",
    college: "经济管理学院",
    email: "lina@stu.edu.cn",
    phone: "13800000002",
    level: "高级",
    register_date: ISODate("2023-03-15"),
    fav_categories: ["经济管理", "金融"]
  },
{
    card_no: "R2023003",
    name: "王强",
    college: "文学院",
    email: "wangqiang@stu.edu.cn",
    phone: "13800000003",
    level: "普通",
    register_date: ISODate("2023-04-01"),
    fav_categories: ["文学"]
  },
{
    card_no: "R2023004",
    name: "刘洋",
    college: "计算机学院",
    email: "liuyang@stu.edu.cn",
    phone: "13800000004",
    level: "教师",
    register_date: ISODate("2022-09-01"),
    fav_categories: ["计算机", "数据科学"]
  },
{
    card_no: "R2023005",
    name: "陈静",
    college: "历史学院",
    email: null,
    phone: "13800000005",
    level: "普通",
    register_date: ISODate("2023-05-20"),
    fav_categories: ["历史"]
  },
{
    card_no: "R2023006",
    name: "赵磊",
    college: "经济管理学院",
    email: "zhaolei@stu.edu.cn",
    phone: "13800000006",
    level: "普通",
    register_date: ISODate("2023-06-10"),
    fav_categories: ["经济管理"]
  },
{
    card_no: "R2023007",
    name: "孙丽",
    college: "教育学院",
    email: null,
    phone: "13800000007",
    level: "高级",
    register_date: ISODate("2023-07-02"),
    fav_categories: ["教育", "心理学"]
  },
{
    card_no: "R2023008",
    name: "周杰",
    college: "计算机学院",
    email: "zhoujie@stu.edu.cn",
    phone: "13800000008",
    level: "普通",
    register_date: ISODate("2023-09-05"),
    fav_categories: ["计算机", "网络安全"]
  },
{
    card_no: "R2023009",
    name: "吴敏",
    college: "艺术学院",
    email: "wumin@stu.edu.cn",
    phone: "13800000009",
    level: "普通",
    register_date: ISODate("2023-10-11"),
    fav_categories: ["艺术"]
  },
{
    card_no: "R2023010",
    name: "郑浩",
    college: "法学院",
    email: "zhenghao@stu.edu.cn",
    phone: "13800000010",
    level: "普通",
    register_date: ISODate("2023-11-08"),
    fav_categories: ["法律"]
  },
{
    card_no: "R2023011",
    name: "冯雪",
    college: "文学院",
    email: "fengxue@stu.edu.cn",
    phone: "13800000011",
    level: "高级",
    register_date: ISODate("2024-01-15"),
    fav_categories: ["文学", "古典"]
  },
{
    card_no: "R2023012",
    name: "蒋涛",
    college: "数学学院",
    email: "jiangtao@stu.edu.cn",
    phone: "13800000012",
    level: "普通",
    register_date: ISODate("2024-02-20"),
    fav_categories: ["数学"]
  },
{
    card_no: "R2023013",
    name: "沈芳",
    college: "外国语学院",
    email: null,
    phone: "13800000013",
    level: "普通",
    register_date: ISODate("2024-03-03"),
    fav_categories: ["外语"]
  },
{
    card_no: "R2023014",
    name: "韩磊",
    college: "计算机学院",
    email: "hanlei@stu.edu.cn",
    phone: "13800000014",
    level: "教师",
    register_date: ISODate("2023-09-15"),
    fav_categories: ["计算机", "软件工程"]
  },
{
    card_no: "R2023015",
    name: "杨静",
    college: "经济管理学院",
    email: "yangjing@stu.edu.cn",
    phone: "13800000015",
    level: "高级",
    register_date: ISODate("2024-04-18"),
    fav_categories: ["经济管理", "市场营销"]
  },
{
    card_no: "R2023016",
    name: "朱涛",
    college: "历史学院",
    email: "zhutao@stu.edu.cn",
    phone: "13800000016",
    level: "普通",
    register_date: ISODate("2024-05-06"),
    fav_categories: ["历史", "考古"]
  },
{
    card_no: "R2023017",
    name: "秦悦",
    college: "医学院",
    email: "qinyue@stu.edu.cn",
    phone: "13800000017",
    level: "普通",
    register_date: ISODate("2024-06-22"),
    fav_categories: ["医学"]
  },
{
    card_no: "R2023018",
    name: "许晴",
    college: "教育学院",
    email: "xuqing@stu.edu.cn",
    phone: "13800000018",
    level: "普通",
    register_date: ISODate("2024-07-30"),
    fav_categories: ["教育"]
  },
{
    card_no: "R2023019",
    name: "何平",
    college: "计算机学院",
    email: "heping@stu.edu.cn",
    phone: "13800000019",
    level: "高级",
    register_date: ISODate("2024-08-14"),
    fav_categories: ["计算机", "大数据"]
  },
{
    card_no: "R2023020",
    name: "吕晶",
    college: "文学院",
    email: null,
    phone: "13800000020",
    level: "普通",
    register_date: ISODate("2024-09-09"),
    fav_categories: ["文学", "外国文学"]
  },
{
    card_no: "R2023021",
    name: "施楠",
    college: "经济管理学院",
    email: "shinan@stu.edu.cn",
    phone: "13800000021",
    level: "普通",
    register_date: ISODate("2024-10-01"),
    fav_categories: ["经济管理", "会计"]
  },
{
    card_no: "R2023022",
    name: "张宁",
    college: "艺术学院",
    email: null,
    phone: "13800000022",
    level: "普通",
    register_date: ISODate("2024-11-12"),
    fav_categories: ["艺术", "设计"]
  },
{
    card_no: "R2023023",
    name: "孔祥",
    college: "数学学院",
    email: "kongxiang@stu.edu.cn",
    phone: "13800000023",
    level: "教师",
    register_date: ISODate("2024-12-05"),
    fav_categories: ["数学", "统计"]
  },
{
    card_no: "R2023024",
    name: "曹颖",
    college: "外国语学院",
    email: "caoying@stu.edu.cn",
    phone: "13800000024",
    level: "普通",
    register_date: ISODate("2025-01-08"),
    fav_categories: ["外语", "文学"]
  }
]);

// ---------- borrow_logs：共 84 条 ----------
db.borrow_logs.insertMany([
{
    borrow_date: ISODate("2025-01-01T13:49:00"),
    return_date: null,
    reader_card: "R2023015",
    book_isbn: "9787302527916",
    status: "逾期"
  },
{
    borrow_date: ISODate("2025-01-13T12:59:00"),
    return_date: ISODate("2025-03-19T12:59:00"),
    reader_card: "R2023004",
    book_isbn: "9787020000004",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-01-24T13:03:00"),
    return_date: null,
    reader_card: "R2023004",
    book_isbn: "9787302567884",
    status: "逾期"
  },
{
    borrow_date: ISODate("2025-02-03T16:13:00"),
    return_date: ISODate("2025-02-26T16:13:00"),
    reader_card: "R2023008",
    book_isbn: "9787111554821",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-02-14T14:21:00"),
    return_date: ISODate("2025-04-15T14:21:00"),
    reader_card: "R2023016",
    book_isbn: "9787020000006",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-03-12T13:13:00"),
    return_date: ISODate("2025-06-09T13:13:00"),
    reader_card: "R2023001",
    book_isbn: "9787101000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-03-14T15:30:00"),
    return_date: null,
    reader_card: "R2023004",
    book_isbn: "9787302666666",
    status: "借出"
  },
{
    borrow_date: ISODate("2025-03-19T12:02:00"),
    return_date: null,
    reader_card: "R2023019",
    book_isbn: "9787302527916",
    status: "逾期"
  },
{
    borrow_date: ISODate("2025-05-08T08:15:00"),
    return_date: ISODate("2025-05-25T08:15:00"),
    reader_card: "R2023006",
    book_isbn: "9787101000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-05-24T17:27:00"),
    return_date: ISODate("2025-07-21T17:27:00"),
    reader_card: "R2023011",
    book_isbn: "9787302567884",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-05-25T14:54:00"),
    return_date: ISODate("2025-07-24T14:54:00"),
    reader_card: "R2023016",
    book_isbn: "9787101000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-06-07T18:15:00"),
    return_date: ISODate("2025-07-29T18:15:00"),
    reader_card: "R2023015",
    book_isbn: "9787020000002",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-06-11T16:05:00"),
    return_date: null,
    reader_card: "R2023009",
    book_isbn: "9787302527916",
    status: "逾期"
  },
{
    borrow_date: ISODate("2025-06-20T12:51:00"),
    return_date: null,
    reader_card: "R2023001",
    book_isbn: "9787101000001",
    status: "逾期"
  },
{
    borrow_date: ISODate("2025-06-20T13:42:00"),
    return_date: ISODate("2025-08-04T13:42:00"),
    reader_card: "R2023002",
    book_isbn: "9787101000002",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-06-21T16:25:00"),
    return_date: ISODate("2025-09-04T16:25:00"),
    reader_card: "R2023019",
    book_isbn: "9787302888880",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-07-07T16:48:00"),
    return_date: ISODate("2025-08-08T16:48:00"),
    reader_card: "R2023006",
    book_isbn: "9787111554821",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-07-09T09:13:00"),
    return_date: ISODate("2025-09-26T09:13:00"),
    reader_card: "R2023011",
    book_isbn: "9787101000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-07-14T15:55:00"),
    return_date: ISODate("2025-10-12T15:55:00"),
    reader_card: "R2023006",
    book_isbn: "9787101000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-07-20T09:24:00"),
    return_date: null,
    reader_card: "R2023011",
    book_isbn: "9787101000002",
    status: "借出"
  },
{
    borrow_date: ISODate("2025-07-20T16:07:00"),
    return_date: null,
    reader_card: "R2023019",
    book_isbn: "9787101000001",
    status: "借出"
  },
{
    borrow_date: ISODate("2025-07-23T11:04:00"),
    return_date: ISODate("2025-10-18T11:04:00"),
    reader_card: "R2023014",
    book_isbn: "9787020000004",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-07-26T18:55:00"),
    return_date: ISODate("2025-09-02T18:55:00"),
    reader_card: "R2023015",
    book_isbn: "9787101000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-07-28T08:54:00"),
    return_date: ISODate("2025-08-29T08:54:00"),
    reader_card: "R2023019",
    book_isbn: "9787115555821",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-09-02T13:37:00"),
    return_date: ISODate("2025-11-03T13:37:00"),
    reader_card: "R2023015",
    book_isbn: "9787302529990",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-09-08T17:14:00"),
    return_date: null,
    reader_card: "R2023006",
    book_isbn: "9787111554821",
    status: "逾期"
  },
{
    borrow_date: ISODate("2025-09-16T09:48:00"),
    return_date: null,
    reader_card: "R2023011",
    book_isbn: "9787115590001",
    status: "逾期"
  },
{
    borrow_date: ISODate("2025-09-25T10:08:00"),
    return_date: ISODate("2025-12-11T10:08:00"),
    reader_card: "R2023006",
    book_isbn: "9787020000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-10-19T12:25:00"),
    return_date: ISODate("2025-10-26T12:25:00"),
    reader_card: "R2023002",
    book_isbn: "9787302600001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-10-21T13:29:00"),
    return_date: ISODate("2025-11-24T13:29:00"),
    reader_card: "R2023002",
    book_isbn: "9787111554821",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-10-23T08:54:00"),
    return_date: ISODate("2026-01-11T08:54:00"),
    reader_card: "R2023016",
    book_isbn: "9787020000005",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-10-28T20:04:00"),
    return_date: ISODate("2026-01-23T20:04:00"),
    reader_card: "R2023003",
    book_isbn: "9787020000003",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-11-10T11:51:00"),
    return_date: null,
    reader_card: "R2023003",
    book_isbn: "9787302666666",
    status: "借出"
  },
{
    borrow_date: ISODate("2025-11-10T15:20:00"),
    return_date: ISODate("2025-11-26T15:20:00"),
    reader_card: "R2023008",
    book_isbn: "9787101000002",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-11-20T20:07:00"),
    return_date: ISODate("2026-02-07T20:07:00"),
    reader_card: "R2023020",
    book_isbn: "9787302527916",
    status: "已归还"
  },
{
    borrow_date: ISODate("2025-11-23T15:09:00"),
    return_date: null,
    reader_card: "R2023004",
    book_isbn: "9787302567884",
    status: "借出"
  },
{
    borrow_date: ISODate("2025-12-06T15:58:00"),
    return_date: null,
    reader_card: "R2023017",
    book_isbn: "9787020000004",
    status: "逾期"
  },
{
    borrow_date: ISODate("2025-12-08T10:29:00"),
    return_date: null,
    reader_card: "R2023001",
    book_isbn: "9787302567884",
    status: "借出"
  },
{
    borrow_date: ISODate("2026-01-03T18:27:00"),
    return_date: null,
    reader_card: "R2023018",
    book_isbn: "9787020000004",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-01-17T20:34:00"),
    return_date: ISODate("2026-02-18T20:34:00"),
    reader_card: "R2023019",
    book_isbn: "9787020000004",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-01-20T10:15:00"),
    return_date: null,
    reader_card: "R2023021",
    book_isbn: "9787111588881",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-01-21T16:53:00"),
    return_date: null,
    reader_card: "R2023004",
    book_isbn: "9787115555821",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-01-22T16:19:00"),
    return_date: ISODate("2026-02-11T16:19:00"),
    reader_card: "R2023008",
    book_isbn: "9787100000004",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-01-22T19:07:00"),
    return_date: ISODate("2026-04-07T19:07:00"),
    reader_card: "R2023011",
    book_isbn: "9787302567884",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-01-28T13:04:00"),
    return_date: ISODate("2026-03-11T13:04:00"),
    reader_card: "R2023006",
    book_isbn: "9787020000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-02-10T14:10:00"),
    return_date: ISODate("2026-03-22T14:10:00"),
    reader_card: "R2023011",
    book_isbn: "9787020000002",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-02-10T16:42:00"),
    return_date: ISODate("2026-03-31T16:42:00"),
    reader_card: "R2023002",
    book_isbn: "9787111555999",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-02-18T12:53:00"),
    return_date: ISODate("2026-04-12T12:53:00"),
    reader_card: "R2023001",
    book_isbn: "9787020000004",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-02-24T16:09:00"),
    return_date: null,
    reader_card: "R2023008",
    book_isbn: "9787020000001",
    status: "借出"
  },
{
    borrow_date: ISODate("2026-02-28T18:19:00"),
    return_date: ISODate("2026-05-10T18:19:00"),
    reader_card: "R2023011",
    book_isbn: "9787100000003",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-03-02T16:05:00"),
    return_date: ISODate("2026-03-17T16:05:00"),
    reader_card: "R2023004",
    book_isbn: "9787100000004",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-03-08T10:51:00"),
    return_date: ISODate("2026-05-06T10:51:00"),
    reader_card: "R2023015",
    book_isbn: "9787101000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-03-10T09:37:00"),
    return_date: null,
    reader_card: "R2023012",
    book_isbn: "9787302599999",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-04-08T08:42:00"),
    return_date: null,
    reader_card: "R2023019",
    book_isbn: "9787302527916",
    status: "借出"
  },
{
    borrow_date: ISODate("2026-04-08T10:47:00"),
    return_date: null,
    reader_card: "R2023001",
    book_isbn: "9787302527916",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-04-16T11:17:00"),
    return_date: ISODate("2026-04-26T11:17:00"),
    reader_card: "R2023017",
    book_isbn: "9787111554821",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-04-21T09:49:00"),
    return_date: ISODate("2026-05-03T09:49:00"),
    reader_card: "R2023010",
    book_isbn: "9787020000003",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-04-22T13:53:00"),
    return_date: ISODate("2026-05-06T13:53:00"),
    reader_card: "R2023001",
    book_isbn: "9787302567884",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-04-25T12:05:00"),
    return_date: ISODate("2026-05-14T12:05:00"),
    reader_card: "R2023001",
    book_isbn: "9787020000002",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-05-15T11:55:00"),
    return_date: ISODate("2026-07-17T11:55:00"),
    reader_card: "R2023004",
    book_isbn: "9787020000005",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-05-17T15:16:00"),
    return_date: ISODate("2026-05-30T15:16:00"),
    reader_card: "R2023008",
    book_isbn: "9787020000006",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-05-27T09:30:00"),
    return_date: null,
    reader_card: "R2023010",
    book_isbn: "9787020000004",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-06-03T16:41:00"),
    return_date: null,
    reader_card: "R2023023",
    book_isbn: "9787020000004",
    status: "借出"
  },
{
    borrow_date: ISODate("2026-06-07T15:20:00"),
    return_date: null,
    reader_card: "R2023018",
    book_isbn: "9787020000004",
    status: "借出"
  },
{
    borrow_date: ISODate("2026-06-09T10:13:00"),
    return_date: ISODate("2026-07-29T10:13:00"),
    reader_card: "R2023001",
    book_isbn: "9787020000004",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-06-10T10:28:00"),
    return_date: ISODate("2026-07-25T10:28:00"),
    reader_card: "R2023008",
    book_isbn: "9787302666666",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-06-15T16:28:00"),
    return_date: null,
    reader_card: "R2023006",
    book_isbn: "9787101000002",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-06-26T09:15:00"),
    return_date: null,
    reader_card: "R2023006",
    book_isbn: "9787020000004",
    status: "借出"
  },
{
    borrow_date: ISODate("2026-07-02T08:05:00"),
    return_date: null,
    reader_card: "R2023001",
    book_isbn: "9787111554821",
    status: "借出"
  },
{
    borrow_date: ISODate("2026-07-04T17:15:00"),
    return_date: ISODate("2026-07-16T17:15:00"),
    reader_card: "R2023004",
    book_isbn: "9787020000006",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-07-08T10:51:00"),
    return_date: ISODate("2026-09-19T10:51:00"),
    reader_card: "R2023003",
    book_isbn: "9787115555821",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-07-12T18:57:00"),
    return_date: ISODate("2026-08-07T18:57:00"),
    reader_card: "R2023024",
    book_isbn: "9787115555821",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-07-23T12:35:00"),
    return_date: null,
    reader_card: "R2023002",
    book_isbn: "9787101000001",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-08-05T20:29:00"),
    return_date: ISODate("2026-10-22T20:29:00"),
    reader_card: "R2023009",
    book_isbn: "9787020000001",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-08-08T20:30:00"),
    return_date: ISODate("2026-09-08T20:30:00"),
    reader_card: "R2023006",
    book_isbn: "9787020000005",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-08-13T11:09:00"),
    return_date: ISODate("2026-08-20T11:09:00"),
    reader_card: "R2023003",
    book_isbn: "9787020000004",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-08-13T18:29:00"),
    return_date: null,
    reader_card: "R2023011",
    book_isbn: "9787101000002",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-08-23T12:49:00"),
    return_date: null,
    reader_card: "R2023021",
    book_isbn: "9787020000006",
    status: "借出"
  },
{
    borrow_date: ISODate("2026-09-11T12:13:00"),
    return_date: ISODate("2026-10-28T12:13:00"),
    reader_card: "R2023008",
    book_isbn: "9787111554821",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-09-14T11:28:00"),
    return_date: ISODate("2026-09-21T11:28:00"),
    reader_card: "R2023001",
    book_isbn: "9787020000006",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-09-14T16:28:00"),
    return_date: ISODate("2026-11-20T16:28:00"),
    reader_card: "R2023009",
    book_isbn: "9787101000003",
    status: "已归还"
  },
{
    borrow_date: ISODate("2026-09-16T18:15:00"),
    return_date: null,
    reader_card: "R2023009",
    book_isbn: "9787302888880",
    status: "借出"
  },
{
    borrow_date: ISODate("2026-09-23T14:35:00"),
    return_date: null,
    reader_card: "R2023015",
    book_isbn: "9787020000003",
    status: "逾期"
  },
{
    borrow_date: ISODate("2026-09-25T16:58:00"),
    return_date: null,
    reader_card: "R2023011",
    book_isbn: "9787020000005",
    status: "逾期"
  }
]);

// 核对数量
print("books:", db.books.countDocuments());
print("readers:", db.readers.countDocuments());
print("borrow_logs:", db.borrow_logs.countDocuments());