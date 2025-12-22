import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ageCategories = [
  {
    age: "6-8 tuổi",
    level: "Mầm non & Lớp 1-2",
    description: "Làm quen với tư duy logic thông qua trò chơi và hoạt động đơn giản",
    color: "bg-pink",
    emoji: "🧒",
    courses: 12,
  },
  {
    age: "9-11 tuổi",
    level: "Lớp 3-5",
    description: "Bắt đầu học Scratch cơ bản, tạo game và hoạt hình đơn giản",
    color: "bg-primary",
    emoji: "👦",
    courses: 18,
  },
  {
    age: "12-14 tuổi",
    level: "Lớp 6-8",
    description: "Scratch nâng cao, dự án phức tạp và chuẩn bị chuyển sang Python",
    color: "bg-secondary",
    emoji: "🧑",
    courses: 15,
  },
  {
    age: "Giáo viên",
    level: "Tất cả cấp độ",
    description: "Tài liệu giảng dạy, giáo án mẫu và hướng dẫn chi tiết",
    color: "bg-purple",
    emoji: "👩‍🏫",
    courses: 25,
  },
];

const AgeCategorySection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Phân loại theo <span className="text-primary">độ tuổi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chọn chương trình phù hợp với độ tuổi và trình độ của con bạn
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageCategories.map((category, index) => (
            <motion.div
              key={category.age}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border h-full flex flex-col transition-all duration-300 hover:shadow-lg">
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {category.emoji}
                </div>
                
                <h3 className="text-xl font-bold mb-1">{category.age}</h3>
                <p className="text-sm text-muted-foreground mb-3">{category.level}</p>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-primary">
                    {category.courses} khóa học
                  </span>
                  <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                    Xem thêm
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgeCategorySection;
