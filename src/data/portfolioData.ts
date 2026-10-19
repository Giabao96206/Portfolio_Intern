// Centralized Portfolio Data Configuration
// Easily customize personal information, projects, social links, and placeholders here.

export interface PersonalInfo {
  name: string;
  displayName: string;
  role: string;
  yearOfStudy: string;
  university: string;
  universityShort: string;
  location: string;
  japaneseLevel: string;
  japaneseStatus: string;
  bioSummary: string;
  aboutParagraphs: string[];
  avatarPlaceholder: string;
  emailPlaceholder: string;
  githubPlaceholder: string;
  linkedinPlaceholder: string;
  heroHeadline: string;
  heroSubheadline: string;
  tagline: string;
}

export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend_mobile' | 'backend' | 'exploring';
  badge: string;
  description: string;
  iconName: string;
  color: string;
  details?: string[];
  codeSample?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  role: string;
  status: string;
  tags: string[];
  features: string[];
  architectureOverview: string;
  demoUrl?: string;
  githubUrl?: string;
  themeColor: string;
  // Specific project extras
  ecosystemComponents?: {
    name: string;
    role: string;
    description: string;
    tech: string[];
    features: string[];
  }[];
  hardwareSpecs?: {
    component: string;
    purpose: string;
    details: string;
  }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  year: string;
  category: string;
  status: string;
  description: string;
  highlights: string[];
  note: string;
  badgeColor: string;
}

export interface JapaneseCard {
  kanji: string;
  kana: string;
  romaji: string;
  meaningVi: string;
  meaningEn: string;
  exampleSentence: string;
  exampleTranslation: string;
  category: string;
}

export const portfolioData = {
  personal: {
    // Easily replace with real name and photo
    name: "IT Creative Developer",
    displayName: "[YOUR NAME]",
    role: "Creative Developer & Software Engineer",
    yearOfStudy: "Sinh viên năm 3",
    university: "Trường Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn (VKU)",
    universityShort: "VKU",
    location: "Da Nang, Vietnam",
    japaneseLevel: "JLPT N4",
    japaneseStatus: "Đang học trình độ JLPT N4 (Currently Learning)",
    heroHeadline: "BUILDING IDEAS INTO REALITY.",
    heroSubheadline: "Software Developer in Progress. Exploring Code, Creativity & Interactive Experiences.",
    tagline: "VKU STUDENT · 3RD YEAR · CREATIVE DEVELOPER",
    bioSummary: "Tôi là sinh viên năm 3 tại VKU, yêu thích phát triển phần mềm và xây dựng những sản phẩm có khả năng giải quyết các vấn đề thực tế. Tôi quan tâm đến hệ sinh thái JavaScript/TypeScript, phát triển ứng dụng đa nền tảng và những trải nghiệm kết hợp giữa phần mềm với phần cứng.",
    aboutParagraphs: [
      "Với niềm đam mê khám phá công nghệ mới, tôi tập trung vào việc làm chủ nền tảng lập trình từ tư duy thuật toán với Java đến xây dựng ứng dụng hiện đại với hệ sinh thái TypeScript/JavaScript.",
      "Đối với tôi, lập trình không chỉ là viết các dòng mã logic, mà là nghệ thuật biến các ý tưởng kỹ thuật thành những giải pháp phục vụ con người — từ ứng dụng di động, hệ thống web quy mô đến những tương tác phần cứng thực tế.",
      "Bên cạnh việc phát triển chuyên môn kỹ thuật tại VKU, tôi đang trau dồi tiếng Nhật với mục tiêu chinh phục chứng chỉ JLPT N4 để mở rộng cơ hội học hỏi và kết nối quốc tế."
    ],
    // Placeholders for easy replacement
    avatarPlaceholder: "https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=800&q=80",
    emailPlaceholder: "contact.developer@vku.edu.vn",
    githubPlaceholder: "https://github.com/[your-username]",
    linkedinPlaceholder: "https://linkedin.com/in/[your-username]",
    socialLinks: [
      { name: "GitHub", url: "https://github.com/", placeholder: "github.com/[your-handle]" },
      { name: "LinkedIn", url: "https://linkedin.com/", placeholder: "linkedin.com/in/[your-profile]" },
      { name: "Email", url: "mailto:contact@vku.edu.vn", placeholder: "contact@vku.edu.vn" }
    ]
  } as PersonalInfo,

  skills: [
    // Programming Languages
    {
      name: "Java",
      category: "languages",
      badge: "Core Language",
      description: "Lập trình hướng đối tượng vững chắc, tư duy cấu trúc dữ liệu và giải thuật, phát triển ứng dụng nền tảng.",
      iconName: "Coffee",
      color: "#f59e0b",
      details: ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "Design Patterns", "Multi-threading Foundations"],
      codeSample: `public class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello VKU!");\n    }\n}`
    },
    {
      name: "TypeScript",
      category: "languages",
      badge: "Type-Safe Modern Web",
      description: "Xây dựng ứng dụng web và backend quy mô lớn với type-safety, generics, và khả năng mở rộng vượt trội.",
      iconName: "FileCode2",
      color: "#38bdf8",
      details: ["Strict Static Typing", "Generics & Utility Types", "Interface & Type Architecture", "Modern ECMAScript Standards"],
      codeSample: `type Developer = {\n  role: "Creative Developer";\n  year: 3;\n  stack: readonly string[];\n};`
    },
    {
      name: "JavaScript",
      category: "languages",
      badge: "Dynamic Ecosystem",
      description: "Thành thạo ES6+, asynchronous programming (Promises, async/await), DOM manipulation và Web APIs.",
      iconName: "Code2",
      color: "#fbbf24",
      details: ["Asynchronous Event Loop", "ESNext Features & Modules", "Functional Programming Patterns", "DOM & Browser APIs"],
      codeSample: `const exploreNewTech = async (tech) => {\n  const skill = await masterConcept(tech);\n  return skill.build();\n};`
    },

    // Frontend & Mobile
    {
      name: "React.js",
      category: "frontend_mobile",
      badge: "Modern UI Architecture",
      description: "Xây dựng giao diện tương tác tốc độ cao, component-driven design, hooks tùy chỉnh và quản lý state hiệu quả.",
      iconName: "Atom",
      color: "#00f0ff",
      details: ["React 19 & Custom Hooks", "Component Lifecycle & Optimization", "State Architecture", "Modern CSS & Tailwind Integration"],
      codeSample: `export const useInteractiveState = () => {\n  const [active, setActive] = useState(true);\n  return { active, toggle: () => setActive(v => !v) };\n};`
    },
    {
      name: "Expo",
      category: "frontend_mobile",
      badge: "Cross-Platform Mobile",
      description: "Phát triển ứng dụng di động đa nền tảng iOS & Android với React Native, router hiện đại và native device modules.",
      iconName: "Smartphone",
      color: "#a855f7",
      details: ["Expo Router & Navigation", "Native Device APIs & Sensors", "Cross-Platform UI Consistency", "Over-The-Air Fast Iteration"],
      codeSample: `import { View, Text } from 'react-native';\nexport default function App() {\n  return <Text>Mobile Experience Powered by Expo</Text>;\n}`
    },

    // Backend
    {
      name: "Node.js",
      category: "backend",
      badge: "Runtime & Microservices",
      description: "Xây dựng RESTful APIs, xử lý I/O non-blocking tốc độ cao, WebSocket real-time communication.",
      iconName: "Server",
      color: "#22c55e",
      details: ["Non-blocking Event-driven I/O", "REST API & Microservice Patterns", "WebSocket Real-time Streams", "File & Stream Processing"],
      codeSample: `import http from 'node:http';\nconst server = http.createServer((req, res) => {\n  res.end('Node.js Server Ready');\n});`
    },
    {
      name: "NestJS",
      category: "backend",
      badge: "Enterprise Architecture",
      description: "Phát triển hệ thống backend theo mô hình module hóa chặt chẽ, Dependency Injection, decorators và kiến trúc controller-service.",
      iconName: "Layers",
      color: "#ef4444",
      details: ["Modular Architecture & DI", "DTOs & Class Validation", "Guards, Interceptors & Pipes", "Scalable Enterprise Structure"],
      codeSample: `@Injectable()\nexport class DeliveryService {\n  async processOrder(orderDto: CreateOrderDto) {\n    return this.dispatchQueue.add(orderDto);\n  }\n}`
    },

    // Exploring & Interests
    {
      name: "Three.js / WebGL",
      category: "exploring",
      badge: "Interest & Exploration",
      description: "Đang tìm hiểu và ứng dụng kết xuất đồ họa 3D tương tác trên trình duyệt, shader ánh sáng và camera math.",
      iconName: "Box",
      color: "#06b6d4",
      details: ["3D Geometric Modeling", "PBR Materials & Lighting", "React Three Fiber & Drei", "Camera Rigging & Parallax"],
      codeSample: `<Canvas camera={{ position: [5, 4, 6], fov: 45 }}>\n  <ambientLight intensity={0.5} />\n  <DioramaModel />\n</Canvas>`
    },
    {
      name: "Raspberry Pi",
      category: "exploring",
      badge: "Hardware & IoT Exploration",
      description: "Khám phá giao tiếp phần cứng qua GPIO, tích hợp cảm biến, xử lý âm thanh/giọng nói và điều khiển robot bàn.",
      iconName: "Cpu",
      color: "#ec4899",
      details: ["Raspberry Pi OS & Linux CLI", "GPIO Sensor & Actuator Control", "Audio Input/Output Pipelines", "Hardware-Software Bridging"],
      codeSample: `# Python/Bash GPIO control\nimport RPi.GPIO as GPIO\nGPIO.setmode(GPIO.BCM)\nGPIO.setup(18, GPIO.OUT)`
    },
    {
      name: "Interactive 3D Web",
      category: "exploring",
      badge: "Creative Tech Passion",
      description: "Khám phá thế giới creative coding, kết hợp GSAP ScrollTrigger và WebGL để mang lại trải nghiệm số điện ảnh.",
      iconName: "Sparkles",
      color: "#8b5cf6",
      details: ["Kinetic Motion Design", "GSAP ScrollTrigger Staggering", "Smooth Physics Scroll (Lenis)", "Micro-interactions & Immersive UI"],
      codeSample: `gsap.timeline()\n  .from('.hero-title', { y: 60, opacity: 0, stagger: 0.15 })\n  .to('.camera-rig', { z: 4, ease: 'power2.out' });`
    }
  ] as SkillItem[],

  projects: [
    {
      id: "movie-discovery",
      title: "Movie Discovery Platform",
      subtitle: "Website Xem Phim & Khám Phá Điện Ảnh",
      category: "Web Application / Frontend",
      description: "Website xem phim tập trung vào trải nghiệm khám phá nội dung điện ảnh và giao diện người dùng mượt mà, trực quan với bố cục dark-mode chuẩn rạp chiếu.",
      role: "Frontend Developer (UI/UX, Data Flow & Media Discovery)",
      status: "Completed / Showcase Ready",
      themeColor: "#00f0ff",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "REST API", "Responsive Design"],
      features: [
        "Giao diện hiện đại với phong cách cinema dark theme, tối ưu trải nghiệm duyệt phim ban đêm.",
        "Bộ lọc tìm kiếm phim theo thể loại, độ phổ biến, năm phát hành và rating người xem.",
        "Trang chi tiết phim với visual trailer, tóm tắt nội dung, thông tin diễn viên và danh sách đề xuất liên quan.",
        "Trải nghiệm xem trực quan với media player responsive trên cả máy tính lẫn điện thoại."
      ],
      architectureOverview: "Kiến trúc ứng dụng phân tầng component rõ ràng: UI Presentation layer sử dụng React + Tailwind, Data Access layer tích hợp REST API, tối ưu hóa caching dữ liệu tìm kiếm và lazy loading poster phim.",
      demoUrl: "https://placeholder-movie-demo.com",
      githubUrl: "https://github.com/[your-username]/movie-discovery-platform"
    },
    {
      id: "food-delivery",
      title: "Food Delivery & Restaurant Management System",
      subtitle: "Hệ Thống Giao Đồ Ăn 3 Phân Hệ (ShopeeFood Ecosystem)",
      category: "Fullstack & Multi-Platform Ecosystem",
      description: "Hệ thống giao đồ ăn toàn diện bao gồm ba ứng dụng độc lập nhưng liên kết chặt chẽ theo thời gian thực: Phía khách hàng, Phía nhà hàng và Phía tài xế giao hàng.",
      role: "Fullstack Architecture & Multi-App Engineering",
      status: "Core Ecosystem Built",
      themeColor: "#f59e0b",
      tags: ["React.js", "Expo", "Node.js", "NestJS", "TypeScript", "WebSocket"],
      features: [
        "Hệ sinh thái liên kết 3 vai trò: Khách hàng đặt món, Nhà hàng nhận đơn & chế biến, Tài xế nhận đơn & định vị giao hàng.",
        "Đồng bộ trạng thái đơn hàng thời gian thực qua cơ chế event-driven communication.",
        "Quản lý danh mục món ăn, tồn kho, giá bán và doanh thu cho chủ quán ăn.",
        "Thuật toán gán đơn và tính toán quãng đường tối ưu cho ứng dụng tài xế."
      ],
      architectureOverview: "Hệ thống backend tập trung sử dụng NestJS/Node.js đóng vai trò điều phối luồng dữ liệu trung tâm, kết nối ứng dụng Mobile (Expo) dành cho Khách hàng & Tài xế và giao diện Web Dashboard (React) dành cho Nhà hàng.",
      ecosystemComponents: [
        {
          name: "Customer App (Khách Hàng)",
          role: "Mobile App (Expo / React Native)",
          description: "Giao diện tìm kiếm nhà hàng, duyệt thực đơn, chọn món tùy biến, giỏ hàng thông minh và theo dõi đơn hàng từng bước.",
          tech: ["Expo", "React Native", "TypeScript", "State Management"],
          features: ["Tìm kiếm & lọc quán theo khoảng cách", "Tùy chọn topping & ghi chú cho quán", "Theo dõi trạng thái đơn hàng trực tiếp"]
        },
        {
          name: "Restaurant System (Nhà Hàng)",
          role: "Web Dashboard (React.js / TypeScript)",
          description: "Bảng điều khiển dành cho đối tác nhà hàng quản lý menu, nhận thông báo đơn mới tức thì, xác nhận và chuẩn bị món.",
          tech: ["React.js", "Tailwind CSS", "WebSocket Client", "Data Visualization"],
          features: ["Âm thanh & popup thông báo đơn hàng mới", "Bật/tắt trạng thái món ăn hết hàng", "Thống kê doanh số theo ngày/tuần"]
        },
        {
          name: "Driver App (Tài Xế)",
          role: "Mobile App (Expo / Mobile)",
          description: "Ứng dụng dành cho tài xế giao hàng nhận thông báo đơn trong khu vực, bản đồ chỉ đường và xác nhận giao thành công.",
          tech: ["Expo", "Geolocation API", "Push Notifications", "TypeScript"],
          features: ["Nhận cuốc nhanh với thông tin cước phí rõ ràng", "Bản đồ điều hướng đến nhà hàng & khách", "Ví thu nhập và lịch sử chuyến giao"]
        }
      ],
      demoUrl: "https://placeholder-food-demo.com",
      githubUrl: "https://github.com/[your-username]/food-delivery-ecosystem"
    },
    {
      id: "desktop-robot",
      title: "Raspberry Pi Conversational Robot",
      subtitle: "Robot Để Bàn Tương Tác & Giao Tiếp Bằng Giọng Nói",
      category: "Hardware & IoT / Intelligent Systems",
      description: "Robot để bàn thông minh sử dụng máy tính nhúng Raspberry Pi, hướng tới khả năng giao tiếp ngôn ngữ tự nhiên và tương tác biểu cảm với người dùng tại bàn làm việc.",
      role: "Hardware Prototyping & Software Integration",
      status: "Hardware Prototyping / R&D",
      themeColor: "#a855f7",
      tags: ["Raspberry Pi", "Linux", "Speech Processing", "GPIO Control", "IoT Hardware"],
      features: [
        "Phần cứng cốt lõi trên nền tảng Raspberry Pi nhỏ gọn, dễ dàng đặt trên bàn làm việc cá nhân.",
        "Module thu âm microphone và loa ngoài cho phép giao tiếp hai chiều giữa người và robot.",
        "Xử lý tín hiệu âm thanh và chuyển đổi giọng nói thành văn bản để tương tác hội thoại cơ bản.",
        "Điều khiển tín hiệu GPIO để thể hiện phản hồi xúc giác hoặc đèn trạng thái tương tác."
      ],
      architectureOverview: "Kiến trúc cầu nối phần cứng - phần mềm: Tín hiệu âm thanh từ Mic USB đi vào hệ thống xử lý trên Raspberry Pi OS, chạy logic phân tích hội thoại và phản hồi qua loa cùng các đèn LED trạng thái thông qua chân GPIO.",
      hardwareSpecs: [
        {
          component: "Bộ xử lý trung tâm",
          purpose: "Điều phối toàn bộ logic xử lý và lưu trữ",
          details: "Raspberry Pi Single-Board Computer chạy Linux OS"
        },
        {
          component: "Microphone Array & Sound Card",
          purpose: "Thu âm giọng nói người dùng",
          details: "USB Audio Input với bộ lọc tạp âm môi trường"
        },
        {
          component: "Hệ thống Loa ngoài (Speaker)",
          purpose: "Phát giọng nói phản hồi và âm thanh báo hiệu",
          details: "Mini Amplified Speaker Module"
        },
        {
          component: "GPIO Control & Status Indicator",
          purpose: "Hiển thị biểu cảm và trạng thái lắng nghe",
          details: "LED Ring & Motor/Servo điều hướng góc nhìn"
        }
      ],
      demoUrl: "https://placeholder-robot-demo.com",
      githubUrl: "https://github.com/[your-username]/raspberry-pi-conversational-robot"
    }
  ] as ProjectItem[],

  achievements: [
    {
      id: "web-design-2025",
      title: "Cuộc Thi Thiết Kế Web 2025",
      year: "2025",
      category: "Web Engineering & Creative UI/UX",
      status: "Tham gia thi đấu (Participated)",
      description: "Tham gia cuộc thi Thiết kế Web năm 2025 với mục tiêu thử thách kỹ năng lập trình frontend, tư duy thẩm mỹ giao diện và tối ưu trải nghiệm tương tác số hiện đại.",
      highlights: [
        "Thử thách xây dựng sản phẩm web hoàn chỉnh dưới áp lực thời gian.",
        "Áp dụng các chuẩn thiết kế hiện đại, typography phân cấp và tối ưu hiệu năng trang web.",
        "Giao lưu và học hỏi từ các đội thi sinh viên công nghệ thông tin xuất sắc."
      ],
      note: "Vị trí bổ sung hình ảnh đội thi, giấy chứng nhận hoặc kỷ niệm chương tham gia cuộc thi.",
      badgeColor: "#00f0ff"
    },
    {
      id: "robocar-2026",
      title: "Cuộc Thi Robocar 2026",
      year: "2026",
      category: "Robotics & Autonomous Vehicle",
      status: "Tham gia thi đấu (Upcoming / In Preparation)",
      description: "Tham gia cuộc thi Robocar năm 2026, khám phá thế giới điều khiển xe tự hành, lập trình thuật toán dò đường, xử lý cảm biến và tối ưu hóa tốc độ trên sa hình.",
      highlights: [
        "Tìm hiểu thuật toán xử lý tín hiệu cảm biến quang và cảm biến khoảng cách.",
        "Điều khiển động cơ DC/Servo và tối ưu hóa thuật toán PID cân bằng xe.",
        "Làm việc nhóm và giải quyết sự cố phần cứng - phần mềm trực tiếp tại đường đua."
      ],
      note: "Vị trí cập nhật tiến độ chế tạo xe, kết quả các vòng đua và hình ảnh robot thực tế.",
      badgeColor: "#a855f7"
    }
  ] as AchievementItem[],

  japaneseLearning: {
    target: "JLPT N4",
    statusText: "Đang học trình độ JLPT N4",
    statusSubtext: "Currently Learning & Building Foundations",
    description: "Học tiếng Nhật là hành trình rèn luyện tính kiên trì và mở rộng góc nhìn văn hóa, công nghệ. Hiện tại tôi đang tập trung ôn luyện ngữ pháp, Kanji và hội thoại trình độ JLPT N4.",
    vocabularyCards: [
      {
        kanji: "挑戦",
        kana: "ちょうせん",
        romaji: "Chousen",
        meaningVi: "Thử thách, thách thức bản thân",
        meaningEn: "Challenge / Attempt",
        exampleSentence: "新しい技術に挑戦することが好きです。",
        exampleTranslation: "Tôi thích thử thách bản thân với các công nghệ mới.",
        category: "Mindset"
      },
      {
        kanji: "探究",
        kana: "たんきゅう",
        romaji: "Tankyuu",
        meaningVi: "Khám phá, tìm tòi sâu sắc",
        meaningEn: "Exploration / Inquiry",
        exampleSentence: "コードの仕組みを深く探究します。",
        exampleTranslation: "Tôi luôn tìm tòi sâu sắc cơ chế hoạt động của code.",
        category: "Learning"
      },
      {
        kanji: "創造",
        kana: "そうぞう",
        romaji: "Souzou",
        meaningVi: "Sáng tạo ra điều mới",
        meaningEn: "Creation / Innovation",
        exampleSentence: "便利なアプリケーションを創造したいです。",
        exampleTranslation: "Tôi muốn sáng tạo ra những ứng dụng hữu ích.",
        category: "Engineering"
      },
      {
        kanji: "継続",
        kana: "けいぞく",
        romaji: "Keizoku",
        meaningVi: "Sự kiên trì, liên tục",
        meaningEn: "Continuity / Persistence",
        exampleSentence: "継続は力なり、毎日コードを書きます。",
        exampleTranslation: "Kiên trì tạo nên sức mạnh, tôi viết code mỗi ngày.",
        category: "Habit"
      }
    ] as JapaneseCard[],
    milestones: [
      { level: "JLPT N5", status: "Hoàn thành nền tảng", details: "Nắm vững bảng chữ cái Hiragana, Katakana, ~100 chữ Kanji cơ bản và các mẫu câu giao tiếp căn bản." },
      { level: "JLPT N4", status: "Đang tích cực ôn luyện", details: "Mở rộng ~300 chữ Kanji, các cấu trúc ngữ pháp điều kiện, mệnh đề quan hệ và giao tiếp thường nhật." },
      { level: "JLPT N3", status: "Mục tiêu tương lai", details: "Kế hoạch tiếp theo nhằm đọc hiểu tài liệu kỹ thuật và giao tiếp công việc chuyên nghiệp." }
    ]
  }
};
