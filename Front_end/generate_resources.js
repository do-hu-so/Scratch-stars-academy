
const fs = require('fs');
const path = require('path');

const DEF_THUMB_BOOK = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop";
const DEF_THUMB_CODE = "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop";
const DEF_THUMB_VID = "https://codekids.asia/wp-content/uploads/2023/11/hoc-lap-trinh-scratch.png";
const DEF_THUMB_PPT = "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop";

const DEF_LINK_DOWN = "https://drive.google.com/drive/folders/1aQpDQwkYAnnof2hSJTdvFKPecJBmIQS_?usp=sharing";
const DEF_LINK_PREVIEW_IMG = "https://drive.google.com/file/d/1-yvslSJXXxsFv6eBrNpASSZOo7BdOdkQ/preview";
const DEF_LINK_PREVIEW_PPT = "https://docs.google.com/presentation/d/1dCrcwt-q9lV-X0hBeDQ1vaWpB4LuycP7/edit?usp=sharing&ouid=110035452335957165964&rtpof=true&sd=true";
const DEF_LINK_PREVIEW_VID = "https://drive.google.com/file/d/15g-WMPQ9iP0MaYyQvXG-hurC0rPRJV4J/view?usp=sharing";

function generateList(prefix, type, thumb, preview, down) {
    let lines = [];
    for (let i = 1; i <= 15; i++) {
        lines.push(`            item('${prefix} - Bài ${i}', '${thumb}', '${preview}', '${down}'),`);
    }
    return lines.join('\n');
}

const content = `
export type ResourceType = 'books' | 'code' | 'videos' | 'ppt';
export type AgeCategory = '6-8' | '9-11' | '12-14' | 'teacher';
export type GradeLevel = '3' | '4' | '5';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  previewUrl: string; // Link to drive preview
  downloadUrl: string; // Link to drive folder
  type: ResourceType;
  category: AgeCategory;
  grade?: GradeLevel;
}

// Interface cho cấu hình từng bài học
interface LessonConfig {
    title: string;
    thumbnail: string;
    previewUrl: string;
    downloadUrl: string;
}

// Default Constants (Dùng để điền nhanh dữ liệu mẫu)
const DEF_THUMB_BOOK = "${DEF_THUMB_BOOK}";
const DEF_THUMB_CODE = "${DEF_THUMB_CODE}";
const DEF_THUMB_VID = "${DEF_THUMB_VID}";
const DEF_THUMB_PPT = "${DEF_THUMB_PPT}";

const DEF_LINK_DOWN = "${DEF_LINK_DOWN}";
const DEF_LINK_PREVIEW_IMG = "${DEF_LINK_PREVIEW_IMG}";
const DEF_LINK_PREVIEW_PPT = "${DEF_LINK_PREVIEW_PPT}";
const DEF_LINK_PREVIEW_VID = "${DEF_LINK_PREVIEW_VID}";

// Helper để tạo nhanh item
const item = (title: string, thumb: string, preview: string, dl: string): LessonConfig => ({
    title, thumbnail: thumb, previewUrl: preview, downloadUrl: dl
});

// =============================================================================
// DỮ LIỆU CHI TIẾT TỪNG BÀI HỌC (BẠN CHỈ CẦN SỬA Ở ĐÂY)
// =============================================================================

const DATA_SOURCES = {
    // -------------------------------------------------------------------------
    '6-8': { // (Lớp 3)
        books: [
${generateList('Làm quen với Scratch', 'books', DEF_THUMB_BOOK, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)}
        ],
        code: [
${generateList('Code mẫu', 'code', DEF_THUMB_CODE, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)}
        ],
        videos: [
${generateList('Video Demo', 'videos', DEF_THUMB_VID, DEF_LINK_PREVIEW_VID, DEF_LINK_DOWN)}
        ],
        ppt: [
${generateList('Slide Bài giảng', 'ppt', DEF_THUMB_PPT, DEF_LINK_PREVIEW_PPT, DEF_LINK_DOWN)}
        ],
    },

    // -------------------------------------------------------------------------
    '9-11': { // (Lớp 4)
        books: [
${generateList('Lập trình Game', 'books', DEF_THUMB_BOOK, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)}
        ],
        code: [
${generateList('Code Game', 'code', DEF_THUMB_CODE, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)}
        ],
        videos: [
${generateList('Video Game', 'videos', DEF_THUMB_VID, DEF_LINK_PREVIEW_VID, DEF_LINK_DOWN)}
        ],
        ppt: [
${generateList('Slide Lớp 4', 'ppt', DEF_THUMB_PPT, DEF_LINK_PREVIEW_PPT, DEF_LINK_DOWN)}
        ],
    },

    // -------------------------------------------------------------------------
    '12-14': { // (Lớp 5)
        books: [
${generateList('Thuật toán', 'books', DEF_THUMB_BOOK, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)}
        ],
        code: [
${generateList('Code nâng cao', 'code', DEF_THUMB_CODE, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)}
        ],
        videos: [
${generateList('Video HD', 'videos', DEF_THUMB_VID, DEF_LINK_PREVIEW_VID, DEF_LINK_DOWN)}
        ],
        ppt: [
${generateList('Slide Lớp 5', 'ppt', DEF_THUMB_PPT, DEF_LINK_PREVIEW_PPT, DEF_LINK_DOWN)}
        ],
    },

    // -------------------------------------------------------------------------
    'teacher': {
        books: {
            '3': [
${generateList('Giáo trình Lớp 3', 'books', DEF_THUMB_BOOK, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)}
            ],
            '4': [
${generateList('Giáo trình Lớp 4', 'books', DEF_THUMB_BOOK, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)}
            ],
            '5': [
${generateList('Giáo trình Lớp 5', 'books', DEF_THUMB_BOOK, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)}
            ]
        },
        code: {
            '3': [ 
${generateList('Code Lớp 3', 'code', DEF_THUMB_CODE, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)} 
            ],
            '4': [ 
${generateList('Code Lớp 4', 'code', DEF_THUMB_CODE, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)} 
            ],
            '5': [ 
${generateList('Code Lớp 5', 'code', DEF_THUMB_CODE, DEF_LINK_PREVIEW_IMG, DEF_LINK_DOWN)} 
            ],
        },
        videos: {
            '3': [ 
${generateList('Video Dạy Lớp 3', 'videos', DEF_THUMB_VID, DEF_LINK_PREVIEW_VID, DEF_LINK_DOWN)} 
            ],
            '4': [ 
${generateList('Video Dạy Lớp 4', 'videos', DEF_THUMB_VID, DEF_LINK_PREVIEW_VID, DEF_LINK_DOWN)} 
            ],
            '5': [ 
${generateList('Video Dạy Lớp 5', 'videos', DEF_THUMB_VID, DEF_LINK_PREVIEW_VID, DEF_LINK_DOWN)} 
            ],
        },
        ppt: {
            '3': [ 
${generateList('Slide GV Lớp 3', 'ppt', DEF_THUMB_PPT, DEF_LINK_PREVIEW_PPT, DEF_LINK_DOWN)} 
            ],
            '4': [ 
${generateList('Slide GV Lớp 4', 'ppt', DEF_THUMB_PPT, DEF_LINK_PREVIEW_PPT, DEF_LINK_DOWN)} 
            ],
            '5': [ 
${generateList('Slide GV Lớp 5', 'ppt', DEF_THUMB_PPT, DEF_LINK_PREVIEW_PPT, DEF_LINK_DOWN)} 
            ],
        }
    }
};

// =============================================================================
// LOGIC BUILD DATA (KHÔNG CẦN SỬA PHẦN NÀY)
// =============================================================================

export const resources: ResourceItem[] = [];

// Helper to push items
const addItem = (cat: AgeCategory, type: ResourceType, config: LessonConfig, i: number, grade?: GradeLevel) => {
    resources.push({
        id: \`\${cat}-\${type}-\${grade || 'gen'}-\${i}\`,
        title: config.title,
        description: \`Tài liệu "\${config.title}" dành cho \${cat === 'teacher' ? 'Giáo viên' : \`độ tuổi \${cat}\`} - \${typeLabels[type]}\`,
        thumbnail: config.thumbnail,
        previewUrl: config.previewUrl,
        downloadUrl: config.downloadUrl,
        type,
        category: cat,
        grade
    });
};

// 1. Build for standard categories
['6-8', '9-11', '12-14'].forEach(cat => {
    const categoryData = DATA_SOURCES[cat as keyof typeof DATA_SOURCES];
    if(categoryData) {
        ['books', 'code', 'videos', 'ppt'].forEach(type => {
            // @ts-ignore
            const list = categoryData[type] as LessonConfig[];
            list.forEach((config, idx) => addItem(cat as AgeCategory, type as ResourceType, config, idx + 1));
        });
    }
});

// 2. Build for teacher
['books', 'code', 'videos', 'ppt'].forEach(type => {
    // @ts-ignore
    const teacherData = DATA_SOURCES['teacher'][type];
    ['3', '4', '5'].forEach(grade => {
        // @ts-ignore
        const list = teacherData[grade] as LessonConfig[];
        if(list) {
            list.forEach((config: LessonConfig, idx: number) => addItem('teacher', type as ResourceType, config, idx + 1, grade as GradeLevel));
        }
    });
});


export const categoryLabels: Record<string, string> = {
    '6-8': 'Lớp 3',
    '9-11': 'Lớp 4',
    '12-14': 'Lớp 5',
    'teacher': 'Giáo viên',
};

export const typeLabels: Record<string, string> = {
  'books': 'Sách tài liệu',
  'code': 'Code mẫu',
  'videos': 'Video kết quả',
  'ppt': 'PowerPoint bài giảng',
};
`;

const targetPath = 'e:/START_UP/Scratch-stars-academy/Front_end/src/data/resources.ts';
fs.writeFileSync(targetPath, content);
console.log('Successfully wrote to ' + targetPath);
